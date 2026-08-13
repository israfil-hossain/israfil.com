interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  listItem?: 'bullet' | 'number'
  level?: number
}

interface PortableTextCode {
  _type: 'code'
  _key: string
  language: string
  code: string
}

type PortableTextItem = PortableTextBlock | PortableTextCode

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

function parseInlineMarks(text: string): Array<{ text: string; marks?: string[] }> {
  const parts: Array<{ text: string; marks?: string[] }> = []
  let remaining = text

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^(.*?)\*\*(.*?)\*\*/)
    // Italic: *text*
    const italicMatch = remaining.match(/^(.*?)\*(.*?)\*/)
    // Inline code: `text`
    const codeMatch = remaining.match(/^(.*?)`(.*?)`/)

    const matches = [
      { type: 'bold', match: boldMatch, marker: 2 },
      { type: 'italic', match: italicMatch, marker: 1 },
      { type: 'code', match: codeMatch, marker: 1 },
    ].filter((m) => m.match && m.match.index !== undefined)

    if (matches.length === 0) {
      parts.push({ text: remaining })
      break
    }

    const earliest = matches.reduce((a, b) =>
      (a.match!.index ?? Infinity) < (b.match!.index ?? Infinity) ? a : b
    )

    if (earliest.match!.index! > 0) {
      parts.push({ text: remaining.substring(0, earliest.match!.index!) })
    }

    const markType = earliest.type
    const mark = markType === 'code' ? 'code' : markType === 'bold' ? 'strong' : 'em'
    parts.push({ text: earliest.match![2], marks: [mark] })

    remaining = remaining.substring(
      earliest.match!.index! + earliest.marker + earliest.match![2].length + earliest.marker
    )
  }

  return parts
}

export function markdownToPortableText(markdown: string): PortableTextItem[] {
  const lines = markdown.split('\n')
  const blocks: PortableTextItem[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block: ```lang ... ```
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace('```', '').trim() || 'javascript'
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push({
        _type: 'code',
        _key: generateKey(),
        language: lang,
        code: codeLines.join('\n'),
      })
      i++ // skip closing ```
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const style = `h${level}`
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style,
        children: [{ _type: 'span', _key: generateKey(), text: headingMatch[2] }],
      })
      i++
      continue
    }

    // Unordered list: - item or * item
    const ulMatch = line.match(/^(\s*)[-*]\s+(.*)/)
    if (ulMatch) {
      const indent = ulMatch[1].length
      const level = Math.floor(indent / 2) + 1
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        listItem: 'bullet',
        level,
        children: parseInlineMarks(ulMatch[2]).map((part) => ({
          _type: 'span' as const,
          _key: generateKey(),
          text: part.text,
          marks: part.marks,
        })),
      })
      i++
      continue
    }

    // Ordered list: 1. item
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)/)
    if (olMatch) {
      const indent = olMatch[1].length
      const level = Math.floor(indent / 2) + 1
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        listItem: 'number',
        level,
        children: parseInlineMarks(olMatch[2]).map((part) => ({
          _type: 'span' as const,
          _key: generateKey(),
          text: part.text,
          marks: part.marks,
        })),
      })
      i++
      continue
    }

    // Blockquote: > text
    const quoteMatch = line.match(/^>\s+(.*)/)
    if (quoteMatch) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        children: [{ _type: 'span', _key: generateKey(), text: quoteMatch[1] }],
      })
      i++
      continue
    }

    // Regular paragraph
    blocks.push({
      _type: 'block',
      _key: generateKey(),
      children: parseInlineMarks(line).map((part) => ({
        _type: 'span' as const,
        _key: generateKey(),
        text: part.text,
        marks: part.marks,
      })),
    })
    i++
  }

  return blocks
}

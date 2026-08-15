function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

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

interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

interface TiptapDoc {
  type: 'doc'
  content: TiptapNode[]
}

function getStyle(type: string): string | undefined {
  const map: Record<string, string> = {
    paragraph: 'normal',
    heading: 'normal',
    blockquote: 'blockquote',
  }
  return map[type] || 'normal'
}

function getHeadingStyle(level: number): string {
  return `h${Math.min(Math.max(level, 1), 6)}`
}

function convertMarks(marks?: Array<{ type: string; attrs?: Record<string, any> }>): string[] | undefined {
  if (!marks || marks.length === 0) return undefined
  const result: string[] = []
  for (const mark of marks) {
    if (mark.type === 'bold') result.push('strong')
    else if (mark.type === 'italic') result.push('em')
    else if (mark.type === 'code') result.push('code')
    else if (mark.type === 'link') result.push('link')
  }
  return result.length > 0 ? result : undefined
}

function convertNode(node: TiptapNode, parentList?: { listItem: 'bullet' | 'number'; level: number }): PortableTextItem[] {
  if (node.type === 'text' && node.text !== undefined) {
    const marks = convertMarks(node.marks)
    return [
      {
        _type: 'block',
        _key: generateKey(),
        ...(parentList && { listItem: parentList.listItem, level: parentList.level }),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: node.text,
            ...(marks && { marks }),
          },
        ],
      },
    ]
  }

  if (node.type === 'codeBlock') {
    const lang = node.attrs?.language || 'javascript'
    const code = node.content?.map((c) => c.text || '').join('\n') || ''
    return [
      {
        _type: 'code',
        _key: generateKey(),
        language: lang,
        code,
      },
    ]
  }

  if (node.type === 'heading') {
    const level = node.attrs?.level || 1
    const children: PortableTextBlock['children'] = []
    if (node.content) {
      for (const child of node.content) {
        if (child.type === 'text' && child.text !== undefined) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text: child.text,
            marks: convertMarks(child.marks),
          })
        }
      }
    }
    return [
      {
        _type: 'block',
        _key: generateKey(),
        style: getHeadingStyle(level),
        children: children.length > 0 ? children : [{ _type: 'span', _key: generateKey(), text: '' }],
      },
    ]
  }

  if (node.type === 'bulletList' && node.content) {
    const items: PortableTextItem[] = []
    for (const item of node.content) {
      if (item.type === 'listItem' && item.content) {
        const level = (item.attrs?.level || 0) + 1
        for (const child of item.content) {
          items.push(...convertNode(child, { listItem: 'bullet', level }))
        }
      }
    }
    return items
  }

  if (node.type === 'orderedList' && node.content) {
    const items: PortableTextItem[] = []
    for (const item of node.content) {
      if (item.type === 'listItem' && item.content) {
        const level = (item.attrs?.level || 0) + 1
        for (const child of item.content) {
          items.push(...convertNode(child, { listItem: 'number', level }))
        }
      }
    }
    return items
  }

  if (node.type === 'blockquote' && node.content) {
    const items: PortableTextItem[] = []
    for (const child of node.content) {
      const converted = convertNode(child)
      for (const c of converted) {
        if (c._type === 'block') {
          items.push({ ...c, style: 'blockquote' })
        } else {
          items.push(c)
        }
      }
    }
    return items
  }

  if (node.content) {
    const items: PortableTextItem[] = []
    for (const child of node.content) {
      items.push(...convertNode(child, parentList))
    }
    return items
  }

  return []
}

export function tiptapToPortableText(doc: TiptapDoc): PortableTextItem[] {
  if (!doc || !doc.content) return []
  const items: PortableTextItem[] = []
  for (const node of doc.content) {
    items.push(...convertNode(node))
  }
  return items
}

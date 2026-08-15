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

function convertMarks(marks?: string[]): Array<{ type: string }> | undefined {
  if (!marks || marks.length === 0) return undefined
  const result: Array<{ type: string }> = []
  for (const mark of marks) {
    if (mark === 'strong') result.push({ type: 'bold' })
    else if (mark === 'em') result.push({ type: 'italic' })
    else if (mark === 'code') result.push({ type: 'code' })
  }
  return result.length > 0 ? result : undefined
}

function portableTextBlockToTiptap(block: PortableTextBlock): TiptapNode {
  const style = block.style || 'normal'

  if (style.startsWith('h')) {
    const level = parseInt(style.replace('h', ''), 10) || 1
    const content: TiptapNode[] = (block.children || []).map((child) => ({
      type: 'text',
      text: child.text,
      marks: convertMarks(child.marks),
    }))
    return {
      type: 'heading',
      attrs: { level },
      content: content.length > 0 ? content : [{ type: 'text', text: '' }],
    }
  }

  if (block.listItem) {
    const listType = block.listItem === 'bullet' ? 'bulletList' : 'orderedList'
    const level = (block.level || 1) - 1
    const paragraphContent: TiptapNode[] = (block.children || []).map((child) => ({
      type: 'text',
      text: child.text,
      marks: convertMarks(child.marks),
    }))
    return {
      type: 'listItem',
      attrs: { level },
      content: [
        {
          type: 'paragraph',
          content: paragraphContent.length > 0 ? paragraphContent : [{ type: 'text', text: '' }],
        },
      ],
    }
  }

  const content: TiptapNode[] = (block.children || []).map((child) => ({
    type: 'text',
    text: child.text,
    marks: convertMarks(child.marks),
  }))

  return {
    type: 'paragraph',
    content: content.length > 0 ? content : [{ type: 'text', text: '' }],
  }
}

function groupListItems(items: TiptapNode[], listType: string): TiptapNode[] {
  if (items.length === 0) return []

  const result: TiptapNode[] = []
  let currentList: TiptapNode | null = null

  for (const item of items) {
    if (!currentList) {
      currentList = { type: listType, content: [item] }
      result.push(currentList)
    } else {
      currentList.content!.push(item)
    }
  }

  return result
}

export function portableTextToTiptap(blocks: PortableTextItem[]): TiptapDoc {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
    }
  }

  const tiptapNodes: TiptapNode[] = []
  const bulletItems: TiptapNode[] = []
  const numberItems: TiptapNode[] = []

  for (const block of blocks) {
    if (block._type === 'code') {
      tiptapNodes.push({
        type: 'codeBlock',
        attrs: { language: block.language || 'javascript' },
        content: [{ type: 'text', text: block.code || '' }],
      })
      continue
    }

    if (block._type !== 'block') continue

    if (block.listItem === 'bullet') {
      bulletItems.push(portableTextBlockToTiptap(block))
      continue
    }

    if (block.listItem === 'number') {
      numberItems.push(portableTextBlockToTiptap(block))
      continue
    }

    if (bulletItems.length > 0) {
      tiptapNodes.push(...groupListItems(bulletItems, 'bulletList'))
      bulletItems.length = 0
    }
    if (numberItems.length > 0) {
      tiptapNodes.push(...groupListItems(numberItems, 'orderedList'))
      numberItems.length = 0
    }

    tiptapNodes.push(portableTextBlockToTiptap(block))
  }

  if (bulletItems.length > 0) {
    tiptapNodes.push(...groupListItems(bulletItems, 'bulletList'))
  }
  if (numberItems.length > 0) {
    tiptapNodes.push(...groupListItems(numberItems, 'orderedList'))
  }

  return {
    type: 'doc',
    content: tiptapNodes.length > 0 ? tiptapNodes : [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
  }
}

'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { PortableText } from '@portabletext/react'
import { markdownToPortableText } from '@/lib/markdown-to-portabletext'

interface RichTextEditorProps {
  value: any[]
  onChange: (value: any[]) => void
  label?: string
  error?: string
}

const portableTextComponents = {
  types: {
    code: ({ value }: any) => {
      if (!value) return null
      const codeContent = value?.code || ''
      const lang = value?.language || 'javascript'
      return codeContent ? (
        <div className="relative overflow-hidden rounded-lg bg-slate-900 my-3">
          <div className="bg-slate-800 px-3 py-1.5">
            <span className="text-xs font-medium text-emerald-400">{lang}</span>
          </div>
          <pre className="overflow-x-auto p-3 text-xs text-slate-300">
            <code>{codeContent}</code>
          </pre>
        </div>
      ) : null
    },
  },
  block: {
    normal: (props: any) => <p className="my-1 text-sm">{props.children}</p>,
    h1: (props: any) => <h1 className="text-xl font-bold my-2">{props.children}</h1>,
    h2: (props: any) => <h2 className="text-lg font-semibold my-2">{props.children}</h2>,
    h3: (props: any) => <h3 className="text-base font-medium my-1.5">{props.children}</h3>,
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-2 text-gray-600 italic">{props.children}</blockquote>
    ),
  },
  list: {
    bullet: (props: any) => <ul className="list-disc ml-5 my-1 text-sm">{props.children}</ul>,
    number: (props: any) => <ol className="list-decimal ml-5 my-1 text-sm">{props.children}</ol>,
  },
} as any

function portableTextToMarkdown(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (block._type === 'code') {
        return `\`\`\`${block.language || ''}\n${block.code || ''}\n\`\`\``
      }

      if (block._type !== 'block') return ''

      const indent = block.level ? '  '.repeat(block.level - 1) : ''
      const prefix = block.listItem === 'bullet' ? `${indent}- ` : block.listItem === 'number' ? `${indent}1. ` : ''

      const text = (block.children || [])
        .map((child: any) => {
          let t = child.text || ''
          if (child.marks?.includes('strong')) t = `**${t}**`
          if (child.marks?.includes('em')) t = `*${t}*`
          if (child.marks?.includes('code')) t = `\`${t}\``
          return t
        })
        .join('')

      if (block.style === 'h1') return `# ${text}`
      if (block.style === 'h2') return `## ${text}`
      if (block.style === 'h3') return `### ${text}`
      if (block.style === 'blockquote') return `> ${text}`

      return `${prefix}${text}`
    })
    .join('\n')
}

export default function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [markdown, setMarkdown] = useState(() => portableTextToMarkdown(value || []))
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newMarkdown = e.target.value
      setMarkdown(newMarkdown)
      const portableText = markdownToPortableText(newMarkdown)
      onChange(portableText)
    },
    [onChange]
  )

  const handleTab = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = markdown.substring(0, start) + '  ' + markdown.substring(end)
      setMarkdown(newValue)
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }, [markdown])

  const previewBlocks = useMemo(() => markdownToPortableText(markdown), [markdown])

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          <span className="text-red-500 ml-0.5">*</span>
        </label>
      )}

      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <div className="flex bg-gray-50 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'write'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'preview'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Preview
          </button>
        </div>

        {mode === 'write' ? (
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            onKeyDown={handleTab}
            placeholder="Write your answer in Markdown...

# Heading 1
## Heading 2
### Heading 3

- Bullet list item
1. Numbered list item

**Bold text** and *italic text*

`inline code`

```javascript
// Code block
console.log('Hello')
```"
            className="w-full px-4 py-3 text-sm outline-none min-h-[300px] font-mono resize-y bg-white"
          />
        ) : (
          <div className="p-4 min-h-[300px] prose prose-sm max-w-none">
            {previewBlocks.length > 0 ? (
              <PortableText value={previewBlocks} components={portableTextComponents} />
            ) : (
              <p className="text-gray-400 italic">Nothing to preview</p>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-1">
        Supports Markdown: # headings, - lists, **bold**, *italic*, `code`, ```lang code blocks```
      </p>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

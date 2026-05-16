"use client";

import { useState, useRef, type ReactNode } from 'react'
import { PortableText } from '@portabletext/react'

const portableTextComponents = {
  types: {
    code: ({ value }: any) => {
      if (!value || typeof value !== 'object') return null;
      const codeContent = value?.code || '';
      const lang = value?.language || 'javascript';
      return codeContent ? <CodeBlock code={codeContent} language={lang} /> : null;
    },
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          className="my-4 rounded-lg max-w-full"
        />
      );
    },
  },
  block: {
    normal: ({ children }: { children?: ReactNode }) => <p className="my-2">{children}</p>,
    h1: ({ children }: { children?: ReactNode }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
    h2: ({ children }: { children?: ReactNode }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className="text-lg font-medium my-2">{children}</h3>,
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
    number: ({ children }: { children?: ReactNode }) => <ol className="list-decimal ml-6 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => <li className="my-1">{children}</li>,
    number: ({ children }: { children?: ReactNode }) => <li className="my-1">{children}</li>,
  },
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [buttonText, setButtonText] = useState('Copy')
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(code).then(() => {
        setButtonText('Copied!')
        setTimeout(() => setButtonText('Copy'), 1000)
      })
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-slate-900 my-4">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <span className="text-xs font-medium text-emerald-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {buttonText}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-slate-300">
        <code ref={codeRef}>{code}</code>
      </pre>
    </div>
  )
}

interface QAItemProps {
  question: string
  answer: any
}

export default function QAItem({ question, answer }: QAItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="overflow-hidden rounded-lg border border-slate-600 bg-slate-900/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-800/50"
      >
        <span className="text-sm font-medium text-slate-200">{question}</span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-slate-600 px-4 py-3 text-sm text-slate-300">
          <PortableText value={Array.isArray(answer) ? answer : [answer]} components={portableTextComponents} />
        </div>
      )}
    </div>
  )
}
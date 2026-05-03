"use client";

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

const portableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-300">
        <code>{value.code}</code>
      </pre>
    ),
  },
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
          <PortableText value={answer} components={portableTextComponents} />
        </div>
      )}
    </div>
  )
}

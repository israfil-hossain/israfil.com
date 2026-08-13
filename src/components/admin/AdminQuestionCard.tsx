'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface AdminQuestionCardProps {
  question: {
    _id: string
    question: string
    answer: any
    order: number
    isPublished: boolean
  }
  index: number
  total: number
  onEdit: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
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
    h2: (props: any) => <h2 className="text-base font-semibold my-2">{props.children}</h2>,
    h3: (props: any) => <h3 className="text-sm font-medium my-1.5">{props.children}</h3>,
  },
  list: {
    bullet: (props: any) => <ul className="list-disc ml-5 my-1 text-sm">{props.children}</ul>,
    number: (props: any) => <ol className="list-decimal ml-5 my-1 text-sm">{props.children}</ol>,
  },
} as any

export default function AdminQuestionCard({ question, index, total, onEdit, onDelete, onMoveUp, onMoveDown }: AdminQuestionCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Order controls */}
          <div className="flex flex-col items-center gap-1 pt-0.5">
            <span className="text-xs font-medium text-gray-400 mb-1">{index + 1}</span>
            <button
              onClick={onMoveUp}
              disabled={index === 0}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move up"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={onMoveDown}
              disabled={index === total - 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move down"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 line-clamp-2">{question.question}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                question.isPublished
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {question.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>

        {question.answer && (
          <div className="mt-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {expanded ? 'Hide' : 'Show'} Answer
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                <PortableText
                  value={Array.isArray(question.answer) ? question.answer : [question.answer]}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

"use client";

import { useState } from 'react'
import { CourseTopic } from '@/types/course'
import QAItem from './QAItem'

interface CourseTopicAccordionProps {
  topics: CourseTopic[]
}

export default function CourseTopicAccordion({ topics }: CourseTopicAccordionProps) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId)
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50"
        >
          <button
            onClick={() => toggleTopic(topic._id)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-700/50"
          >
            <span className="text-lg font-semibold text-slate-100">{topic.title}</span>
            <svg
              className={`h-5 w-5 text-slate-400 transition-transform ${
                expandedTopic === topic._id ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedTopic === topic._id && topic.questions && (
            <div className="border-t border-slate-700 px-6 py-4">
              <div className="space-y-4">
                {topic.questions.map((qa) => (
                  <QAItem key={qa._id} question={qa.question} answer={qa.answer} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

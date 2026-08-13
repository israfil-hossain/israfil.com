'use client'

import Link from 'next/link'

interface AdminTopicCardProps {
  topic: {
    _id: string
    title: string
    slug: { current: string }
    order: number
    isPublished: boolean
    questionCount?: number
  }
  courseId: string
  onEdit: () => void
  onDelete: () => void
}

export default function AdminTopicCard({ topic, courseId, onEdit, onDelete }: AdminTopicCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <Link href={`/admin/courses/${courseId}/topics/${topic._id}`}>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {topic.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  topic.isPublished
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {topic.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {topic.questionCount || 0} questions
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex border-t border-gray-100">
        <button
          onClick={(e) => { e.preventDefault(); onEdit() }}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onDelete() }}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

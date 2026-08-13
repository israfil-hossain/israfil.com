'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RichTextEditor from './RichTextEditor'
import { markdownToPortableText } from '@/lib/markdown-to-portabletext'
import toast from 'react-hot-toast'

interface QuestionFormProps {
  initialData?: {
    _id: string
    question: string
    answer: any
    order: number
    isPublished: boolean
  }
  topicId: string
  onSuccess: () => void
  onCancel: () => void
}

export default function QuestionForm({ initialData, topicId, onSuccess, onCancel }: QuestionFormProps) {
  const [question, setQuestion] = useState(initialData?.question || '')
  const [answer, setAnswer] = useState<any[]>(initialData?.answer || [])
  const [order, setOrder] = useState(initialData?.order || 0)
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true)
  const [loading, setLoading] = useState(false)

  const isEditing = !!initialData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) {
      toast.error('Question is required')
      return
    }
    if (!answer || answer.length === 0) {
      toast.error('Answer is required')
      return
    }

    setLoading(true)
    try {
      const url = isEditing
        ? `/api/admin/questions/${initialData._id}`
        : '/api/admin/questions'

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          answer,
          topicId,
          order: Number(order),
          isPublished,
        }),
      })

      if (!res.ok) throw new Error('Failed to save')

      toast.success(isEditing ? 'Question updated' : 'Question created')
      onSuccess()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. What is Docker?"
        required
      />

      <RichTextEditor
        label="Answer"
        value={answer}
        onChange={setAnswer}
      />

      <Input
        label="Order"
        type="number"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
        min={0}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Published
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEditing ? 'Update Question' : 'Create Question'}
        </Button>
      </div>
    </form>
  )
}

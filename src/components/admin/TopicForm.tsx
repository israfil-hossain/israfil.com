'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/slugify'
import toast from 'react-hot-toast'

interface TopicFormProps {
  initialData?: {
    _id: string
    title: string
    slug: { current: string }
    order: number
    isPublished: boolean
  }
  courseId: string
  onSuccess: () => void
  onCancel: () => void
}

export default function TopicForm({ initialData, courseId, onSuccess, onCancel }: TopicFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug?.current || '')
  const [order, setOrder] = useState(initialData?.order || 0)
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true)
  const [loading, setLoading] = useState(false)

  const isEditing = !!initialData

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title))
    }
  }, [title, isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    setLoading(true)
    try {
      const url = isEditing
        ? `/api/admin/topics/${initialData._id}`
        : '/api/admin/topics'

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug || slugify(title),
          courseId,
          order: Number(order),
          isPublished,
        }),
      })

      if (!res.ok) throw new Error('Failed to save')

      toast.success(isEditing ? 'Topic updated' : 'Topic created')
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
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Basic"
        required
      />

      <Input
        label="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="e.g. basic"
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
          {isEditing ? 'Update Topic' : 'Create Topic'}
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import AdminTopicCard from '@/components/admin/AdminTopicCard'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'
import toast from 'react-hot-toast'

const TopicForm = lazy(() => import('@/components/admin/TopicForm'))

interface Topic {
  _id: string
  title: string
  slug: { current: string }
  order: number
  isPublished: boolean
  questionCount?: number
}

interface Course {
  _id: string
  title: string
  slug: { current: string }
}

export default function AdminTopicsPage() {
  const params = useParams()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Topic | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [courseRes, topicsRes] = await Promise.all([
        fetch(`/api/admin/courses`),
        fetch(`/api/admin/topics?courseId=${courseId}`),
      ])
      const courseData = await courseRes.json()
      const topicsData = await topicsRes.json()

      const currentCourse = courseData.courses?.find((c: Course) => c._id === courseId)
      setCourse(currentCourse || null)
      setTopics(topicsData.topics || [])
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/topics/${deleteTarget._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      toast.success('Topic deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete topic')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Container>
      <div className="mb-6">
        <Link
          href="/admin/courses"
          className="group mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <Heading className="font-black text-2xl">
              {course?.title || 'Loading...'}
            </Heading>
            <Paragraph className="mt-2">
              Manage topics for this course.
            </Paragraph>
          </div>
          <Button onClick={() => { setEditingTopic(null); setShowForm(true) }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Topic
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No topics yet. Add your first topic!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <AdminTopicCard
              key={topic._id}
              topic={topic}
              courseId={courseId}
              onEdit={() => { setEditingTopic(topic); setShowForm(true) }}
              onDelete={() => setDeleteTarget(topic)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingTopic ? 'Edit Topic' : 'New Topic'}
              </h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-lg" />}>
                <TopicForm
                  initialData={editingTopic || undefined}
                  courseId={courseId}
                  onSuccess={() => { setShowForm(false); setEditingTopic(null); fetchData() }}
                  onCancel={() => { setShowForm(false); setEditingTopic(null) }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Topic"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will also delete all questions under it.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Container>
  )
}

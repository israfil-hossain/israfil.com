'use client'

import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import AdminQuestionCard from '@/components/admin/AdminQuestionCard'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'
import toast from 'react-hot-toast'

const QuestionForm = lazy(() => import('@/components/admin/QuestionForm'))

interface Question {
  _id: string
  question: string
  answer: any
  order: number
  isPublished: boolean
}

export default function AdminQuestionsPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const topicId = params.topicId as string

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [reordering, setReordering] = useState(false)

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/questions?topicId=${topicId}`)
      const data = await res.json()
      setQuestions(data.questions || [])
    } catch {
      toast.error('Failed to load questions')
    } finally {
      setLoading(false)
    }
  }, [topicId])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const filtered = useMemo(() => {
    if (!search.trim()) return questions
    const q = search.toLowerCase()
    return questions.filter((item) => item.question?.toLowerCase().includes(q))
  }, [questions, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/questions/${deleteTarget._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      toast.success('Question deleted')
      setDeleteTarget(null)
      fetchQuestions()
    } catch {
      toast.error('Failed to delete question')
    } finally {
      setDeleting(false)
    }
  }

  const handleReorder = async (idxA: number, idxB: number) => {
    const visible = filtered
    const qA = visible[idxA]
    const qB = visible[idxB]
    if (!qA || !qB) return

    setReordering(true)
    try {
      // Swap order values
      const updates = [
        { id: qA._id, order: qB.order },
        { id: qB._id, order: qA.order },
      ]

      const res = await fetch('/api/admin/questions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })

      if (!res.ok) throw new Error()

      // Update local state
      setQuestions((prev) =>
        prev.map((q) => {
          if (q._id === qA._id) return { ...q, order: qB.order }
          if (q._id === qB._id) return { ...q, order: qA.order }
          return q
        })
      )
    } catch {
      toast.error('Failed to reorder')
    } finally {
      setReordering(false)
    }
  }

  return (
    <Container>
      <div className="mb-6">
        <Link
          href={`/admin/courses/${courseId}`}
          className="group mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <Heading className="font-black text-2xl">Questions & Answers</Heading>
            <Paragraph className="mt-2">
              Manage questions for this topic. Use arrows to reorder.
            </Paragraph>
          </div>
          <Button onClick={() => { setEditingQuestion(null); setShowForm(true) }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </Button>
        </div>
      </div>

      {/* Search */}
      {!loading && questions.length > 0 && (
        <div className="mb-6 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No questions yet. Add your first question!</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No questions match your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <AdminQuestionCard
              key={q._id}
              question={q}
              index={questions.indexOf(q)}
              total={questions.length}
              onEdit={() => { setEditingQuestion(q); setShowForm(true) }}
              onDelete={() => setDeleteTarget(q)}
              onMoveUp={() => handleReorder(idx, idx - 1)}
              onMoveDown={() => handleReorder(idx, idx + 1)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingQuestion ? 'Edit Question' : 'New Question'}
              </h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
                <QuestionForm
                  initialData={editingQuestion || undefined}
                  topicId={topicId}
                  onSuccess={() => { setShowForm(false); setEditingQuestion(null); fetchQuestions() }}
                  onCancel={() => { setShowForm(false); setEditingQuestion(null) }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Question"
        message={`Are you sure you want to delete this question?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Container>
  )
}

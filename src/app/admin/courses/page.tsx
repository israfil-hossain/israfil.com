'use client'

import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import AdminCourseCard from '@/components/admin/AdminCourseCard'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import Link from 'next/link'

const CourseForm = lazy(() => import('@/components/admin/CourseForm'))

interface Course {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  isPublished: boolean
  order: number
  topicCount?: number
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/courses')
      const data = await res.json()
      setCourses(data.courses || [])
    } catch {
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/courses/${deleteTarget._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      toast.success('Course deleted')
      setDeleteTarget(null)
      fetchCourses()
    } catch {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/courses" className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
            ← View Public Courses
          </Link>
          <Heading className="font-black text-2xl">Manage Courses</Heading>
          <Paragraph className="mt-2">
            Create and organize your courses, topics, and questions.
          </Paragraph>
        </div>
        <Button onClick={() => { setEditingCourse(null); setShowForm(true) }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No courses yet. Create your first course!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <AdminCourseCard
              key={course._id}
              course={course}
              onEdit={() => { setEditingCourse(course); setShowForm(true) }}
              onDelete={() => setDeleteTarget(course)}
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
                {editingCourse ? 'Edit Course' : 'New Course'}
              </h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
                <CourseForm
                  initialData={editingCourse || undefined}
                  onSuccess={() => { setShowForm(false); setEditingCourse(null); fetchCourses() }}
                  onCancel={() => { setShowForm(false); setEditingCourse(null) }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Course"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will also delete all topics and questions under it.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </Container>
  )
}

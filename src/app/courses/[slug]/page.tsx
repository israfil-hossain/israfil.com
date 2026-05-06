import { getSingleCourse } from '@/lib/query'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMeta } from '@/lib/seo'
import { Container } from '@/components/Container'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'
import CoursePageContent from '@/components/courses/CoursePageContent'

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = await getSingleCourse(slug)
  
  if (!course) {
    return { title: 'Notes Not Found' }
  }

  return generatePageMeta({
    title: `${course.title} - My Notes`,
    description: course.description?.[0]?.children?.[0]?.text || 'Study notes and learning materials',
    path: `/courses/${slug}`,
  })
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = await getSingleCourse(slug)

  if (!course) {
    notFound()
  }

  return (
    <Container>
      <Link
        href="/courses"
        className="group mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition"
      >
        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
      </Link>

      <CoursePageContent course={course} />
    </Container>
  )
}
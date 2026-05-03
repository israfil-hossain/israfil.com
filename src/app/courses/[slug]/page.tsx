import { getSingleCourse } from '@/lib/query'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generatePageMeta, SITE_URL } from '@/lib/seo'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[80vh]">
        {/* Left Sidebar - Course Topics */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <Heading as="h3" className="font-bold text-sm">
                📚 Topics
              </Heading>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {course.topics && course.topics.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {course.topics.map((topic: any, idx: number) => (
                    <li key={topic._id}>
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition list-none">
                          <span className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500">
                              {idx + 1}
                            </span>
                            <span className="line-clamp-1">{topic.title}</span>
                          </span>
                          <svg
                            className="h-4 w-4 text-gray-400 transition group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        {topic.questions && topic.questions.length > 0 && (
                          <ul className="bg-gray-50 px-4 py-2 space-y-2">
                            {topic.questions.map((qa: any) => (
                              <li key={qa._id}>
                                <a
                                  href={`#${qa._id}`}
                                  className="block text-xs text-gray-600 hover:text-blue-600 py-1 line-clamp-1"
                                >
                                  {qa.question}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </details>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No topics available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Main Content - Notes/QA */}
        <div className="lg:col-span-3">
          {course.thumbnail && (
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-gray-100">
              <Image
                src={course.thumbnail.asset.url}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <Heading className="font-bold text-2xl">{course.title}</Heading>
                {course.category && (
                  <span className="inline-block mt-2 rounded-full bg-white/20 px-3 py-1 text-xs">
                    {course.category}
                  </span>
                )}
              </div>
            </div>
          )}

          {course.description && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <Paragraph className="text-gray-700">
                {course.description[0]?.children?.[0]?.text || ''}
              </Paragraph>
            </div>
          )}

          {/* Q&A List */}
          {course.topics && course.topics.length > 0 ? (
            <div className="space-y-6">
              {course.topics.map((topic: any, topicIdx: number) => (
                <div key={topic._id} className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <Heading as="h3" className="font-bold text-gray-800">
                      {topicIdx + 1}. {topic.title}
                    </Heading>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {topic.questions && topic.questions.map((qa: any) => (
                      <div key={qa._id} id={qa._id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                              Q
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 mb-3">
                              {qa.question}
                            </p>
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                                  A
                                </div>
                              </div>
                              <div className="flex-1 prose prose-sm max-w-none text-gray-600">
                                {qa.answer && qa.answer.map((block: any) => (
                                  block._type === 'block' ? (
                                    <p key={block._key} className="mb-2">
                                      {block.children?.[0]?.text}
                                    </p>
                                  ) : null
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-secondary">No topics available for this note yet.</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

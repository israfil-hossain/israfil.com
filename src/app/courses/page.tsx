import { getCourses } from '@/lib/query'
import { Metadata } from 'next'
import { generatePageMeta } from '@/lib/seo'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import { Highlight } from '@/components/Highlight'
import CourseGrid from '@/components/courses/CourseGrid'

export const revalidate = 60

export const metadata: Metadata = generatePageMeta({
  title: "My Notes - Learning Materials",
  description: "Study notes, tutorials, and learning materials covering web development, programming, and technology topics.",
  path: "/courses",
})

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <Container>
      <span className="text-4xl">📚</span>
      <Heading className="font-black">My Notes</Heading>
      <Paragraph className="max-w-xl mt-4">
        Comprehensive study notes and <Highlight>learning materials</Highlight>{" "}
        to help you master web development, programming, and technology concepts.
      </Paragraph>

      <CourseGrid courses={courses || []} />
    </Container>
  )
}

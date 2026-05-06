import { getCourses } from '@/lib/query'
import CourseCard from '@/components/courses/CourseCard'
import { Metadata } from 'next'
import { generatePageMeta } from '@/lib/seo'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import { Highlight } from '@/components/Highlight'

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

      {courses?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary text-lg">No notes available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </Container>
  )
}

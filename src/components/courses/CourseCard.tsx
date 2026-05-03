import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '../Heading'
import Truncate from '../ui/truncate'

interface CourseCardProps {
  course: any
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug.current}`}>
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-gray-300">
        {course.thumbnail && (
          <div className="relative h-40 w-full overflow-hidden bg-gray-100">
            <Image
              src={course.thumbnail.asset.url}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {course.category && (
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
                {course.category}
              </span>
            )}
          </div>
        )}
        <div className="p-5">
          <Heading as="h4" className="font-bold text-base group-hover:text-blue-600 transition-colors line-clamp-1">
            {course.title}
          </Heading>
          {course.description && (
            <Truncate text={course.description[0]?.children?.[0]?.text || ''} limit={80} className="text-sm text-secondary mt-2" />
          )}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>{course.topics?.length || 0} topics</span>
            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">Read →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

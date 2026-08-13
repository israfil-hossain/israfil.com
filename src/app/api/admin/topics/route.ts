import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 })
    }

    const topics = await writeClient.fetch(
      `*[_type == "courseTopic" && course._ref == $courseId] | order(order asc) {
        _id,
        title,
        slug,
        order,
        isPublished,
        "questionCount": count(*[_type == "questionAnswer" && topic._ref == ^._id])
      }`,
      { courseId }
    )

    return NextResponse.json({ topics })
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, courseId, order, isPublished } = body

    if (!title || !courseId) {
      return NextResponse.json({ error: 'Title and courseId are required' }, { status: 400 })
    }

    const topic = await writeClient.create({
      _type: 'courseTopic',
      title,
      slug: { current: slug, _type: 'slug' },
      course: { _type: 'reference', _ref: courseId },
      order: order || 0,
      isPublished: isPublished !== false,
    })

    return NextResponse.json({ success: true, topic }, { status: 201 })
  } catch (error) {
    console.error('Error creating topic:', error)
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 })
  }
}

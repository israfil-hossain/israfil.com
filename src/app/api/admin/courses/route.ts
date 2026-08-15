import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-10-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function GET() {
  try {
    const courses = await writeClient.fetch(
      `*[_type == "course"] | order(order asc) {
        _id,
        title,
        slug,
        category,
        isPublished,
        order,
        publishedAt,
        "topicCount": count(*[_type == "courseTopic" && course._ref == ^._id])
      }`
    )
    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, description, category, thumbnail, order, isPublished } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const course = await writeClient.create({
      _type: 'course',
      title,
      slug: { current: slug, _type: 'slug' },
      description: description || [],
      category: category || 'interview-prep',
      thumbnail: thumbnail || undefined,
      order: order || 0,
      isPublished: isPublished !== false,
      publishedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, course }, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}

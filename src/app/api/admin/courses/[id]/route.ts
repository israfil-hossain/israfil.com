import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-10-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { title, slug, description, category, thumbnail, order, isPublished } = body

    const course = await writeClient
      .patch(id)
      .set({
        title,
        slug: { current: slug, _type: 'slug' },
        description: description || [],
        category,
        order,
        isPublished,
      })
      .commit()

    return NextResponse.json({ success: true, course })
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Delete topics and their questions first
    const topics = await writeClient.fetch(
      `*[_type == "courseTopic" && course._ref == $id]._id`,
      { id }
    )

    for (const topicId of topics) {
      await writeClient.delete(topicId)
    }

    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}

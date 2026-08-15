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
    const { title, slug, order, isPublished } = body

    const topic = await writeClient
      .patch(id)
      .set({
        title,
        slug: { current: slug, _type: 'slug' },
        order,
        isPublished,
      })
      .commit()

    return NextResponse.json({ success: true, topic })
  } catch (error) {
    console.error('Error updating topic:', error)
    return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Delete questions under this topic first
    const questions = await writeClient.fetch(
      `*[_type == "questionAnswer" && topic._ref == $id]._id`,
      { id }
    )

    for (const qId of questions) {
      await writeClient.delete(qId)
    }

    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting topic:', error)
    return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 })
  }
}

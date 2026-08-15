import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-10-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const topicId = searchParams.get('topicId')

    if (!topicId) {
      return NextResponse.json({ error: 'topicId is required' }, { status: 400 })
    }

    const questions = await writeClient.fetch(
      `*[_type == "questionAnswer" && topic._ref == $topicId] | order(order asc) {
        _id,
        question,
        answer,
        order,
        isPublished
      }`,
      { topicId }
    )

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { question, answer, topicId, order, isPublished } = body

    if (!question || !answer || !topicId) {
      return NextResponse.json(
        { error: 'Question, answer, and topicId are required' },
        { status: 400 }
      )
    }

    const qa = await writeClient.create({
      _type: 'questionAnswer',
      question,
      answer,
      topic: { _type: 'reference', _ref: topicId },
      order: order || 0,
      isPublished: isPublished !== false,
    })

    return NextResponse.json({ success: true, qa }, { status: 201 })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { updates } = body

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: 'updates array is required' }, { status: 400 })
    }

    const transaction = writeClient.transaction()
    for (const { id, order } of updates) {
      transaction.patch(id, (p: any) => p.set({ order }))
    }
    await transaction.commit()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating question order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

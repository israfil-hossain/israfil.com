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
    const { question, answer, order, isPublished } = body

    const qa = await writeClient
      .patch(id)
      .set({
        question,
        answer,
        order,
        isPublished,
      })
      .commit()

    return NextResponse.json({ success: true, qa })
  } catch (error: any) {
    console.error('Error updating question:', error?.message || error)
    return NextResponse.json({ error: 'Failed to update question', details: error?.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await writeClient.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting question:', error?.message || error)
    return NextResponse.json({ error: 'Failed to delete question', details: error?.message }, { status: 500 })
  }
}

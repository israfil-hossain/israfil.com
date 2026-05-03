import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, authorName, authorEmail, authorAvatar, rating, content } = body;

    if (!projectId || !authorName || !authorEmail || !rating || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (content.length < 10 || content.length > 2000) {
      return NextResponse.json(
        { error: "Content must be between 10 and 2000 characters" },
        { status: 400 }
      );
    }

    const testimonial = await writeClient.create({
      _type: "testimonial",
      project: {
        _type: "reference",
        _ref: projectId,
      },
      authorName,
      authorEmail,
      authorAvatar: authorAvatar || undefined,
      rating,
      content,
      status: "pending",
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}

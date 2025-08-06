// app/api/admin/tags/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(process.env.TAGS_COLLECTION || "tags");

    const tags = await collection.find({}).sort({ name: 1 }).toArray();

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { message: "Error fetching tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, isTech = false } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Tag name is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(process.env.TAGS_COLLECTION || "tags");

    // Check if tag already exists (case-insensitive)
    const existingTag = await collection.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingTag) {
      return NextResponse.json(
        { message: "Tag already exists" },
        { status: 400 }
      );
    }

    // Generate a random color for the tag
    const colors = [
      "#3B82F6",
      "#8B5CF6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#06B6D4",
      "#84CC16",
      "#F97316",
      "#EC4899",
      "#6366F1",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const tag = {
      name: name.trim(),
      color: randomColor,
      isTech: Boolean(isTech),
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(tag);

    return NextResponse.json(
      { message: "Tag created successfully", id: result.insertedId, ...tag },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { message: "Error creating tag" },
      { status: 500 }
    );
  }
}

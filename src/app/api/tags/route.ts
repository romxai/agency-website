// app/api/tags/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET handler to fetch all tags for portfolio display
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(process.env.TAGS_COLLECTION || "tags");

    const tags = await collection.find({}).sort({ name: 1 }).toArray();

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { message: "Error fetching tags" },
      { status: 500 }
    );
  }
}

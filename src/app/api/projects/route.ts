// app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET handler to fetch all visible projects for portfolio display
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const projects = await collection
      .find({ isHidden: { $ne: true } }) // Exclude hidden projects
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

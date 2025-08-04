import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const projects = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, tags, images = [], liveLink, githubLink } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    if (!description || !description.trim()) {
      return NextResponse.json(
        { message: "Project description is required" },
        { status: 400 }
      );
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { message: "At least one tag is required" },
        { status: 400 }
      );
    }

    // Validate links if provided
    const validateUrl = (url: string) => {
      if (!url) return true; // Optional field

      // Accept http, https, or www starting URLs
      const urlPattern = /^(https?:\/\/|www\.)/;
      return urlPattern.test(url);
    };

    if (liveLink && !validateUrl(liveLink)) {
      return NextResponse.json(
        { message: "Live link must start with http://, https://, or www." },
        { status: 400 }
      );
    }

    if (githubLink && !validateUrl(githubLink)) {
      return NextResponse.json(
        { message: "GitHub link must start with http://, https://, or www." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const project = {
      name: name.trim(),
      description: description.trim(),
      tags: tags,
      images: images,
      liveLink: liveLink?.trim() || "",
      githubLink: githubLink?.trim() || "",
      isHidden: false,
      isStarred: false,
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(project);

    return NextResponse.json(
      { message: "Project created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}

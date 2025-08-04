import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 }
      );
    }

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

    const updateData = {
      name: name.trim(),
      description: description.trim(),
      tags: tags,
      images: images,
      liveLink: liveLink?.trim() || "",
      githubLink: githubLink?.trim() || "",
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { isHidden, isStarred } = body;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const updateData: any = {};
    if (typeof isHidden === "boolean") updateData.isHidden = isHidden;
    if (typeof isStarred === "boolean") updateData.isStarred = isStarred;

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json(
      { message: "Error updating project status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}

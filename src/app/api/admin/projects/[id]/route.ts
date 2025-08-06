// app/api/admin/projects/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// PUT handler to update a project
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
    const {
      title,
      description,
      images = [],
      projectTags = [],
      techTags = [],
      isLive,
      liveLink,
      githubLink,
    } = body;

    // Validation - only title, description, and images are required
    const validationErrors = [];
    if (!title || !title.trim())
      validationErrors.push("Project title is required.");
    if (!description || !description.trim())
      validationErrors.push("Project description is required.");

    const validateUrl = (url: string) => /^(https?:\/\/|www\.)/.test(url);
    if (liveLink && !validateUrl(liveLink))
      validationErrors.push(
        "Live link must start with http://, https://, or www."
      );
    if (githubLink && !validateUrl(githubLink))
      validationErrors.push(
        "GitHub link must start with http://, https://, or www."
      );

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: validationErrors.join(" ") },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );

    const updateData = {
      title: title.trim(),
      description: description.trim(),
      images: images,
      projectTags: projectTags,
      techTags: techTags,
      isLive: isLive ?? false,
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

// PATCH handler to update partial project data (e.g., isHidden or isStarred)
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

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update" },
        { status: 400 }
      );
    }

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

// DELETE handler to delete a project
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

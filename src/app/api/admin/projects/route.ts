// app/api/admin/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET handler to fetch all projects
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

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

// POST handler to create a new project
export async function POST(request: NextRequest) {
  try {
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
    const projectsCollection = db.collection(
      process.env.PROJECTS_COLLECTION || "projects"
    );
    const tagsCollection = db.collection(process.env.TAGS_COLLECTION || "tags");

    // Automated Tag Management - handle project tags and tech tags separately
    const allTags = [...projectTags, ...techTags];
    const newTagsToCreate = [];

    for (const tagName of allTags) {
      const existingTag = await tagsCollection.findOne({
        name: { $regex: new RegExp(`^${tagName.trim()}$`, "i") },
      });
      if (!existingTag) {
        newTagsToCreate.push({
          name: tagName.trim(),
          color: getRandomColor(),
          createdAt: new Date().toISOString(),
        });
      }
    }
    if (newTagsToCreate.length > 0) {
      await tagsCollection.insertMany(newTagsToCreate);
    }

    const project = {
      title: title.trim(),
      description: description.trim(),
      images: images,
      projectTags: projectTags,
      techTags: techTags,
      isLive: isLive ?? false,
      liveLink: liveLink?.trim() || "",
      githubLink: githubLink?.trim() || "",
      isHidden: false,
      isStarred: false,
      createdAt: new Date().toISOString(),
    };

    const result = await projectsCollection.insertOne(project);

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

const getRandomColor = () => {
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
  return colors[Math.floor(Math.random() * colors.length)];
};

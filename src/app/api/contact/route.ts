import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // --- Start of Validation ---

    // Basic validation for request body
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Name length validation
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    // **FIX:** Validate that environment variables are loaded
    const dbName = process.env.MONGODB_DB_NAME;
    const collectionName = process.env.MONGODB_COLLECTION_NAME;

    if (!dbName || !collectionName) {
      console.error("MongoDB environment variables not set");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // --- End of Validation ---

    try {
      const client = await clientPromise;
      // Use the validated variables which are now guaranteed to be strings
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Create the document with a timestamp
      const submission = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        createdAt: new Date(),
        ip:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      };

      // Insert the document into the collection
      const result = await collection.insertOne(submission);

      // Return a success response
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          id: result.insertedId,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      return NextResponse.json(
        { error: "Database connection error. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

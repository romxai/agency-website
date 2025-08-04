import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(
      process.env.MONGODB_COLLECTION_NAME || "client-contact"
    );

    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Transform the data to include default values for isRead and isStarred
    const transformedContacts = contacts.map((contact) => ({
      _id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      message: contact.message,
      ip: contact.ip,
      userAgent: contact.userAgent,
      createdAt: contact.createdAt,
      isRead: contact.isRead || false,
      isStarred: contact.isStarred || false,
    }));

    return NextResponse.json(transformedContacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Error fetching contacts" },
      { status: 500 }
    );
  }
}

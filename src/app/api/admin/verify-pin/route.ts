import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    // Validate PIN format
    if (!pin || typeof pin !== "string" || pin.length !== 6) {
      return NextResponse.json(
        { message: "PIN must be exactly 6 digits" },
        { status: 400 }
      );
    }

    // Check if PIN contains only digits
    if (!/^\d{6}$/.test(pin)) {
      return NextResponse.json(
        { message: "PIN must contain only digits" },
        { status: 400 }
      );
    }

    // Get admin PIN from environment
    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      console.error("ADMIN_PIN environment variable not set");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Compare PINs
    if (pin === adminPin) {
      return NextResponse.json(
        { success: true, message: "PIN verified successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid PIN" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying PIN:", error);
    return NextResponse.json(
      { message: "Error verifying PIN" },
      { status: 500 }
    );
  }
}

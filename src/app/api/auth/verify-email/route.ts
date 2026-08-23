import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/auth/verification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Verification failed.",
          reason: result.reason,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! Your account is now active.",
      user: result.user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during verification." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing verification token parameter." },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Verification failed.",
          reason: result.reason,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! Your account is now active.",
      user: result.user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during verification." },
      { status: 500 }
    );
  }
}

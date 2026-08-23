import { NextRequest, NextResponse } from "next/server";
import { requestPasswordReset } from "@/lib/auth/password-reset";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await requestPasswordReset(email, request);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Forgot password API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

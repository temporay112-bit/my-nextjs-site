import { NextRequest, NextResponse } from "next/server";
import { resendVerificationEmail } from "@/lib/auth/verification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const result = await resendVerificationEmail(email, request);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to resend verification email." },
      { status: 500 }
    );
  }
}

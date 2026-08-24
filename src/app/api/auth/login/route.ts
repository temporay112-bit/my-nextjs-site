import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter both your Email and Password." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await db.getUserByEmailOrPhoneAsync(normalizedEmail);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This account has been suspended. Please contact support." },
        { status: 403 }
      );
    }

    const isMatch = verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // Check Email Verification status
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Your email address has not been verified yet. Please check your inbox or request a new verification link.",
          needsVerification: true,
          email: user.email,
        },
        { status: 403 }
      );
    }

    const { payload } = await createSession(user.id);

    db.logAction({
      userId: user.id,
      userName: user.name,
      action: "USER_LOGIN",
      entity: "User",
      entityId: user.id,
      details: `User logged in (${user.email}) with role ${payload.role}.`,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        emailVerified: payload.emailVerified,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}

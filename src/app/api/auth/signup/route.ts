import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { determineUserRole } from "@/lib/auth/session";
import { createAndSendVerificationToken } from "@/lib/auth/verification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid business or personal email address." },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = db.findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const role = determineUserRole(normalizedEmail);

    const newUser = db.createUser({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      status: "ACTIVE",
      emailVerified: false,
    });

    // Create secure hashed verification token and dispatch email via Nodemailer
    await createAndSendVerificationToken(newUser.id, normalizedEmail, newUser.name, request);

    db.logAction({
      userId: newUser.id,
      userName: newUser.name,
      action: "USER_SIGNUP",
      entity: "User",
      entityId: newUser.id,
      details: `New user registered (${normalizedEmail}). Verification email dispatched.`,
    });

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      message: "Account created successfully! Please check your email to verify your account.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Registration failed. Please check your information and try again." },
      { status: 500 }
    );
  }
}

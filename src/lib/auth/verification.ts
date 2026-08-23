import { randomBytes, createHash } from "crypto";
import { db, User } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { createSession } from "./session";
import { SafeUser, toSafeUser } from "./credentials";

export interface VerificationTokenPair {
  rawToken: string;
  tokenHash: string;
}

export interface VerificationResult {
  success: boolean;
  user?: SafeUser;
  error?: string;
  reason?: "INVALID_TOKEN" | "EXPIRED" | "ALREADY_USED" | "USER_NOT_FOUND" | "USER_SUSPENDED";
  alreadyVerified?: boolean;
}

/**
 * Generates a cryptographically secure 32-byte hex token and its SHA-256 hash.
 */
export function generateVerificationToken(): VerificationTokenPair {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  return { rawToken, tokenHash };
}

/**
 * SHA-256 token hashing
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token.trim()).digest("hex");
}

/**
 * Creates and stores a new verification token hash in the database, then dispatches
 * the verification email via Nodemailer.
 */
export async function createAndSendVerificationToken(
  userId: string,
  email: string,
  name: string,
  requestContext?: any
): Promise<{ success: boolean; rawToken: string; tokenHash: string; error?: string }> {
  const { rawToken, tokenHash } = generateVerificationToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

  // Persist tokenHash in DB (invalidating any older unused tokens)
  db.createVerificationToken(userId, tokenHash, expiresAt);

  // Dispatch branded email via Nodemailer with raw token
  const emailRes = await sendVerificationEmail(email, name, rawToken, requestContext);

  return {
    success: emailRes.success,
    rawToken,
    tokenHash,
    error: emailRes.error,
  };
}

/**
 * Validates a verification token from the user, updates emailVerified status,
 * marks single-use usedAt timestamp, and establishes a secure authenticated session.
 */
export async function verifyEmailToken(rawToken: string): Promise<VerificationResult> {
  if (!rawToken || typeof rawToken !== "string") {
    return {
      success: false,
      error: "Missing or invalid verification token.",
      reason: "INVALID_TOKEN",
    };
  }

  const cleanToken = rawToken.trim();
  const tokenHash = hashToken(cleanToken);

  // Look up token by tokenHash (or by raw token for backward compatibility)
  const tokenRecord =
    db.findVerificationTokenByHash(tokenHash) ||
    db.findVerificationTokenByHash(cleanToken);

  if (!tokenRecord) {
    return {
      success: false,
      error: "Invalid or expired verification link. Please request a new verification email.",
      reason: "INVALID_TOKEN",
    };
  }

  // Check if token was already used
  if (tokenRecord.usedAt !== null && tokenRecord.usedAt !== undefined) {
    return {
      success: false,
      error: "This verification link has already been used. Please sign in or request a new link.",
      reason: "ALREADY_USED",
    };
  }

  // Check if token has expired
  const tokenExpiry = new Date(tokenRecord.expiresAt || tokenRecord.expires).getTime();
  if (Date.now() > tokenExpiry) {
    return {
      success: false,
      error: "This verification link has expired. Please request a new one.",
      reason: "EXPIRED",
    };
  }

  // Find user by userId or identifier
  const user =
    db.findUserById(tokenRecord.userId || tokenRecord.identifier) ||
    db.findUserByEmail(tokenRecord.identifier || "");

  if (!user) {
    return {
      success: false,
      error: "Account associated with this verification link was not found.",
      reason: "USER_NOT_FOUND",
    };
  }

  if (user.status === "SUSPENDED") {
    return {
      success: false,
      error: "This account has been suspended. Please contact customer support.",
      reason: "USER_SUSPENDED",
    };
  }

  // Mark token as used (single-use enforcement)
  db.markVerificationTokenUsed(tokenRecord.id);

  // Update user emailVerified status
  let updatedUser = user;
  if (!user.emailVerified) {
    const res = db.updateUser(user.id, { emailVerified: true });
    if (res) updatedUser = res;

    db.logAction({
      userId: user.id,
      userName: user.name,
      action: "EMAIL_VERIFIED",
      entity: "User",
      entityId: user.id,
      details: `Email ${user.email} verified successfully via token.`,
    });
  }

  // Automatically establish active session if in web request context
  try {
    await createSession(user.id);
  } catch {}

  return {
    success: true,
    user: toSafeUser(updatedUser),
    alreadyVerified: user.emailVerified,
  };
}

/**
 * Resends verification token to a user by email address safely
 */
export async function resendVerificationEmail(
  email: string,
  requestContext?: any
): Promise<{ success: boolean; message: string }> {
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.findUserByEmail(cleanEmail);

  if (!user) {
    // Return positive response to prevent email enumeration
    return {
      success: true,
      message: "If an account exists with this email, a fresh verification link has been sent.",
    };
  }

  if (user.emailVerified) {
    return {
      success: true,
      message: "This email address is already verified. You can sign in immediately.",
    };
  }

  await createAndSendVerificationToken(user.id, user.email, user.name, requestContext);

  return {
    success: true,
    message: "A fresh verification link has been sent to your email.",
  };
}

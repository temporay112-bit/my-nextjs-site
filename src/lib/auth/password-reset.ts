import crypto from "crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { sendPasswordResetEmail } from "@/lib/email";

export interface TokenPair {
  rawToken: string;
  tokenHash: string;
}

export function generatePasswordResetToken(): TokenPair {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, tokenHash };
}

export async function requestPasswordReset(
  email: string,
  requestContext?: any
): Promise<{ success: boolean; message: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await db.findUserByEmailAsync(normalizedEmail);

  // Generic anti-enumeration response
  const genericSuccess = {
    success: true,
    message: "If an account exists with that email address, a password reset link has been dispatched.",
  };

  if (!user || user.status !== "ACTIVE") {
    return genericSuccess;
  }

  const { rawToken, tokenHash } = generatePasswordResetToken();
  const oneHourMs = 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + oneHourMs).toISOString();

  // Persist only the token hash
  await db.createPasswordResetTokenAsync(user.id, tokenHash, expiresAt);

  // Dispatch Nodemailer transactional email with raw token
  try {
    await sendPasswordResetEmail(user.email, user.name, rawToken, requestContext);
    db.logAction({
      userId: user.id,
      userName: user.name,
      action: "PASSWORD_RESET_REQUESTED",
      entity: "PasswordResetToken",
      details: `Password reset email dispatched to ${user.email}`,
    });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
  }

  return genericSuccess;
}

export async function completePasswordReset(
  rawToken: string,
  newPassword: string
): Promise<{ success: boolean; message?: string; error?: string; reason?: string }> {
  if (!rawToken || typeof rawToken !== "string") {
    return { success: false, error: "Invalid password reset token.", reason: "INVALID" };
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long." };
  }

  const cleanToken = rawToken.trim();
  const tokenHash = crypto.createHash("sha256").update(cleanToken).digest("hex");
  const tokenRecord =
    (await db.findPasswordResetTokenByHashAsync(tokenHash)) ||
    (await db.findPasswordResetTokenByHashAsync(cleanToken));

  if (!tokenRecord) {
    return { success: false, error: "Invalid password reset link.", reason: "INVALID" };
  }

  if (tokenRecord.usedAt !== null) {
    return {
      success: false,
      error: "This password reset link has already been used.",
      reason: "ALREADY_USED",
    };
  }

  const now = Date.now();
  const expiresAtMs = new Date(tokenRecord.expiresAt).getTime();
  if (now > expiresAtMs) {
    return {
      success: false,
      error: "This password reset link has expired. Please request a new one.",
      reason: "EXPIRED",
    };
  }

  const user = await db.findUserByIdAsync(tokenRecord.userId);
  if (!user) {
    return { success: false, error: "Associated user account was not found.", reason: "USER_NOT_FOUND" };
  }

  // Hash new password using salted scrypt
  const newPasswordHash = hashPassword(newPassword);

  // Update user in DB
  await db.updateUserAsync(user.id, {
    passwordHash: newPasswordHash,
  });

  // Mark token as used for replay protection
  await db.markPasswordResetTokenUsedAsync(tokenRecord.id);

  db.logAction({
    userId: user.id,
    userName: user.name,
    action: "PASSWORD_RESET_COMPLETED",
    entity: "User",
    entityId: user.id,
    details: `Password successfully reset for ${user.email}`,
  });

  return {
    success: true,
    message: "Your password has been successfully updated. You can now sign in with your new password.",
  };
}

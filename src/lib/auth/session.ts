import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { db, UserRole } from "@/lib/db";

export const SESSION_COOKIE_NAME = "slots_auth_session";
const SESSION_SECRET = process.env.AUTH_SECRET || "slots_sportswear_master_session_secret_2026";
export const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30-day sliding expiry

export interface SessionPayload {
  userId: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
  expiresAt: number;
}

export function signToken(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const expectedSignature = createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
    if (signature !== expectedSignature) return null;

    const payload: SessionPayload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Creates a signed session for the given user ID.
 * Reads the authoritative role from the database.
 */
export async function createSession(userId: string): Promise<{ token: string; payload: SessionPayload }> {
  const user = await db.findUserByIdAsync(userId);
  if (!user) throw new Error("User not found");

  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    phone: user.phone,
    name: user.name,
    role: user.role,
    emailVerified: user.emailVerified,
    expiresAt,
  };

  const token = signToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  await db.updateUserAsync(userId, { lastLoginAt: new Date().toISOString() });
  return { token, payload };
}

/**
 * Reads and verifies the current session payload from cookies.
 */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Refreshes sliding session expiration if within renewal window
 */
export async function refreshSessionIfNeeded(): Promise<SessionPayload | null> {
  try {
    const session = await getSession();
    if (!session) return null;

    const remainingMs = session.expiresAt - Date.now();
    // Refresh if less than 15 days remaining
    if (remainingMs < 15 * 24 * 60 * 60 * 1000) {
      const { payload } = await createSession(session.userId);
      return payload;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Destroys the current session and clears the session cookie.
 */
export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {}
}

export { requireAdmin, requireCustomer, requireAuthenticatedUser, getCurrentUser } from "./current-user";

export function determineUserRole(email: string): UserRole {
  if (email.toLowerCase().trim() === "shahrangujjar00@gmail.com") {
    return "ADMIN";
  }
  return "CUSTOMER";
}

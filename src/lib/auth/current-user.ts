import { db } from "@/lib/db";
import { getSession } from "./session";
import { SafeUser, toSafeUser } from "./credentials";

/**
 * Returns the currently authenticated SafeUser, loading authoritative data from DB.
 * Returns null if unauthenticated, deleted, or suspended.
 */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await db.findUserByIdAsync(session.userId);
  if (!user || user.status === "SUSPENDED") {
    return null;
  }

  return toSafeUser(user);
}

/**
 * Authorization guard requiring any valid authenticated user.
 */
export async function requireAuthenticatedUser(): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Authentication required");
  }
  return user;
}

/**
 * Authorization guard requiring an active Customer or Admin user.
 */
export async function requireCustomer(): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Login required");
  }
  return user;
}

/**
 * Authorization guard requiring an active ADMIN role validated from DB.
 */
export async function requireAdmin(): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin privileges required");
  }
  return user;
}

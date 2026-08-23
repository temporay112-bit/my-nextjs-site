import { db, User, UserRole, UserStatus } from "@/lib/db";
import { verifyPassword } from "./password";

export interface SafeUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface AuthResult {
  success: boolean;
  user?: SafeUser;
  error?: string;
  needsVerification?: boolean;
}

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    userId: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
  };
}

/**
 * Authenticates user credentials against the database.
 * Never exposes or returns passwordHash.
 */
export function authenticateUser(email: string, password: string): AuthResult {
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.findUserByEmail(cleanEmail);

  if (!user) {
    return { success: false, error: "Invalid credentials. Please check your email and password." };
  }

  if (user.status === "SUSPENDED") {
    return {
      success: false,
      error: "Your account is currently suspended. Please contact customer support.",
    };
  }

  const isValidPassword = verifyPassword(password, user.passwordHash);
  if (!isValidPassword) {
    return { success: false, error: "Invalid credentials. Please check your email and password." };
  }

  return {
    success: true,
    user: toSafeUser(user),
    needsVerification: !user.emailVerified,
  };
}

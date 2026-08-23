import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function POST() {
  const session = await getSession();
  if (session) {
    db.logAction({
      userId: session.userId,
      userName: session.name,
      action: "USER_LOGOUT",
      entity: "User",
      entityId: session.userId,
      details: "User logged out.",
    });
  }
  await destroySession();
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}

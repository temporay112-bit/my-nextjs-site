import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    // Return users with company/order stats, strictly stripping password hashes
    const users = db.getUsers().map((u) => {
      const profile = db.findCustomerProfileByUserId(u.id);
      const orders = db.findOrdersByCustomerId(u.id);
      const inquiries = db.findInquiriesByCustomerId(u.id);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || profile?.phone,
        companyName: profile?.companyName || "—",
        country: profile?.country || "—",
        role: u.role,
        status: u.status,
        emailVerified: u.emailVerified,
        ordersCount: orders.length,
        inquiriesCount: inquiries.length,
        createdAt: u.createdAt,
        lastLoginAt: u.lastLoginAt,
      };
    });

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

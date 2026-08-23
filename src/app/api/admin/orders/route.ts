import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db, OrderStatus } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const orders = db.getOrders();
    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { customerId, customerName, customerEmail, customerPhone, companyName, status, notes } = body;

    const newOrder = db.createOrder({
      customerId: customerId || "manual_admin_entry",
      customerName,
      customerEmail,
      customerPhone,
      companyName,
      status: (status as OrderStatus) || "NEW",
      notes,
    });

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "CREATE_ORDER",
      entity: "Order",
      entityId: newOrder.id,
      details: `Created order for ${customerName || customerEmail || "Customer"}`,
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and Status are required." }, { status: 400 });
    }

    const updated = db.updateOrderStatus(id, status as OrderStatus, notes);
    if (!updated) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "UPDATE_ORDER_STATUS",
      entity: "Order",
      entityId: updated.id,
      details: `Updated order ${updated.id} status to ${status}`,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import {
  Package,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export const metadata = {
  title: "My Orders | SLOTS SPORTSWEAR",
  description: "Track your manufacturing production orders and shipment milestones.",
  robots: {
    index: false,
    follow: false,
  },
};

function getStatusBadge(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-950/60 border-emerald-500/50 text-emerald-400";
    case "IN_PROGRESS":
      return "bg-[#B7FF00]/10 border-[#B7FF00]/40 text-[#B7FF00]";
    case "QUOTED":
      return "bg-blue-950/60 border-blue-500/50 text-blue-400";
    case "REVIEWING":
    case "CONTACTED":
      return "bg-amber-950/60 border-amber-500/50 text-amber-400";
    case "CANCELLED":
      return "bg-red-950/60 border-red-500/50 text-red-400";
    case "NEW":
    default:
      return "bg-[#2A2A2A] border-[#444444] text-[#E9E9E9]";
  }
}

export default async function AccountOrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/account/orders");
  }

  // Server-side ownership enforcement: query ONLY orders belonging to authenticated user ID
  const orders = db.findOrdersByCustomerId(user.id);
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#050505] text-[#FFFFFF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] mb-3">
              <Package className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
                PRODUCTION TRACKING
              </span>
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFFFF]">
              MY ORDERS
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Track your submitted custom sportswear manufacturing orders and production batches.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Dashboard Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-4">
            <AccountSidebar activeTab="orders" isAdmin={isAdmin} />
          </div>

          {/* Right Column: Orders Content */}
          <main className="lg:col-span-8 space-y-6">
            {orders.length === 0 ? (
              /* Empty State */
              <div className="bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-[#050505] border border-[#2A2A2A] text-[#777777] flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8" />
                </div>
                <h2 className="font-sora text-xl font-extrabold uppercase text-[#FFFFFF] mb-2 tracking-tight">
                  NO ORDERS YET
                </h2>
                <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto mb-8 leading-relaxed">
                  Your manufacturing orders will appear here once submitted and approved by our factory engineering team.
                </p>
                <Link
                  href="/contact#quote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              /* Orders List */
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#171717] border border-[#2A2A2A] p-6 shadow-xl relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-sora text-sm font-extrabold uppercase text-[#FFFFFF] tracking-wider">
                            #{order.reference || order.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 border text-[10px] font-barlow font-bold uppercase tracking-wider ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="font-inter text-xs text-[#777777] mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Placed on{" "}
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </p>
                      </div>

                      {order.companyName && (
                        <div className="text-right">
                          <span className="font-inter text-xs text-[#9CA3AF]">
                            {order.companyName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
                          Production Items
                        </span>
                        <div className="space-y-1.5">
                          {order.items.map((item, idx) => (
                            <div
                              key={item.id || idx}
                              className="p-3 bg-[#050505] border border-[#2A2A2A] flex items-center justify-between text-xs font-inter"
                            >
                              <span className="text-[#FFFFFF] font-medium">
                                {item.description}
                              </span>
                              <span className="text-[#B7FF00] font-bold">
                                {item.quantity} pcs
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {order.notes && (
                      <div className="p-3 bg-[#050505] border border-[#2A2A2A] text-xs font-inter text-[#9CA3AF]">
                        <span className="text-[#777777] font-semibold block mb-0.5">Notes:</span>
                        {order.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

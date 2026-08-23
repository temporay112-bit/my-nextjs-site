import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  Package,
  Layers,
  ShoppingCart,
  Users,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const allProducts = db.getProducts({ publishedOnly: false });
  const publishedCount = allProducts.products.filter((p) => p.published).length;
  const categories = db.getCategories(false);
  const orders = db.getOrders();
  const users = db.getUsers();
  const customers = users.filter((u) => u.role === "CUSTOMER");
  const auditLogs = db.getAuditLogs(8);

  const metrics = [
    {
      label: "TOTAL PRODUCTS",
      value: allProducts.total,
      sub: `${publishedCount} Live in Catalog`,
      icon: Package,
      href: "/admin/products",
      color: "text-[#B7FF00]",
    },
    {
      label: "CATEGORIES",
      value: categories.length,
      sub: "B2B Categories & Subs",
      icon: Layers,
      href: "/admin/categories",
      color: "text-[#60A5FA]",
    },
    {
      label: "ORDERS / RFQS",
      value: orders.length,
      sub: `${orders.filter((o) => o.status === "NEW").length} New Inquiries`,
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "text-[#F59E0B]",
    },
    {
      label: "VERIFIED BUYERS",
      value: customers.length,
      sub: "Registered B2B Clients",
      icon: Users,
      href: "/admin/customers",
      color: "text-[#34D399]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase text-[#FFFFFF]">
            CMS Dashboard Overview
          </h1>
          <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Real-time management for SLOTS SPORTSWEAR catalogue, client data, and production orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/categories"
            className="px-4 py-2.5 bg-[#171717] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-[#FFFFFF] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              href={m.href}
              className="bg-[#141721] border border-[#1F2430] hover:border-[#2A3347] p-6 rounded-none transition-all group block shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                  {m.label}
                </span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="mt-3">
                <span className="font-sora text-3xl font-extrabold text-[#FFFFFF]">
                  {m.value}
                </span>
                <span className="block font-inter text-xs text-[#6B7280] mt-1">
                  {m.sub}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Orders + Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders / Inquiries */}
        <div className="lg:col-span-7 bg-[#141721] border border-[#1F2430] p-6 rounded-none">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1F2430]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#B7FF00]" />
              <h2 className="font-sora text-sm font-bold uppercase text-[#FFFFFF]">
                Recent Orders & Inquiries
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="font-barlow text-xs font-bold uppercase tracking-wider text-[#B7FF00] hover:underline"
            >
              View All
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-[#6B7280] font-inter text-xs">
              No orders or RFQs logged in the system yet.
            </div>
          ) : (
            <div className="divide-y divide-[#1F2430]">
              {orders.slice(0, 5).map((ord) => (
                <div key={ord.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sora text-xs font-bold text-[#FFFFFF]">
                        {ord.customerName || ord.customerEmail || `Order #${ord.id}`}
                      </span>
                      <span className="px-2 py-0.5 bg-[#1F2430] text-[#B7FF00] font-barlow text-[10px] font-bold uppercase">
                        {ord.status}
                      </span>
                    </div>
                    <span className="font-inter text-[11px] text-[#6B7280]">
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/admin/orders"
                    className="p-1.5 text-[#6B7280] hover:text-[#FFFFFF] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security & Audit Trail */}
        <div className="lg:col-span-5 bg-[#141721] border border-[#1F2430] p-6 rounded-none">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1F2430]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#B7FF00]" />
              <h2 className="font-sora text-sm font-bold uppercase text-[#FFFFFF]">
                Audit Activity Log
              </h2>
            </div>
            <Link
              href="/admin/login-data"
              className="font-barlow text-xs font-bold uppercase tracking-wider text-[#B7FF00] hover:underline"
            >
              Audit Trail
            </Link>
          </div>

          <div className="space-y-3 font-inter text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2.5 bg-[#0E1015] border border-[#1F2430] rounded-none">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-barlow font-bold uppercase text-[#B7FF00]">
                    {log.action}
                  </span>
                  <span className="text-[#6B7280] text-[10px]">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-[11px] mt-1 truncate">
                  {log.details || log.entity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

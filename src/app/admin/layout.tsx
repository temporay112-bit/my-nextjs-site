import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  LayoutDashboard,
  Layers,
  Package,
  ShoppingCart,
  Users,
  ShieldAlert,
  Image as ImageIcon,
  FileText,
  ExternalLink,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const metadata = {
  title: "Admin CMS | SLOTS SPORTSWEAR",
  description: "Administrative Content Management & Order Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login?redirect=/admin");
  }
  
  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Quote Inquiries", href: "/admin/inquiries", icon: FileText },
    { label: "Orders / RFQs", href: "/admin/orders", icon: ShoppingCart },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Media Manager", href: "/admin/media", icon: ImageIcon },
    { label: "Login & Security", href: "/admin/login-data", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#0E1015] text-[#E5E7EB] flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#050505] border-r border-[#1F2430] flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Admin Header Branding */}
          <div className="p-6 border-b border-[#1F2430] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#B7FF00] rounded-none animate-pulse" />
                <span className="font-sora text-sm font-extrabold uppercase tracking-wider text-[#FFFFFF]">
                  SLOTS CMS
                </span>
              </div>
              <span className="font-barlow text-[10px] uppercase font-bold tracking-widest text-[#9CA3AF] block mt-0.5">
                ENTERPRISE CONTROL
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#171717] border border-[#2A2A2A] text-[#B7FF00] font-barlow text-[10px] font-bold">
              v3.0
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 font-inter text-xs font-medium text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#141822] transition-colors rounded-none"
                >
                  <Icon className="w-4 h-4 text-[#777777]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-4 border-t border-[#1F2430] space-y-3">
          <div className="flex items-center justify-between px-2">
            <div>
              <p className="font-sora text-xs font-bold text-[#FFFFFF]">{user.name}</p>
              <span className="font-barlow text-[10px] text-[#B7FF00] uppercase font-bold tracking-wider">
                {user.role}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="p-1.5 text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#141822] rounded-none"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

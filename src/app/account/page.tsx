import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import {
  User as UserIcon,
  ShieldCheck,
  Package,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export const metadata = {
  title: "My Account | SLOTS SPORTSWEAR",
  description: "Customer account portal, manufacturing inquiries, and order management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/account");
  }

  const profile = db.findCustomerProfileByUserId(user.id);
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#050505] text-[#FFFFFF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb / Eyebrow */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
                {isAdmin ? "ADMINISTRATOR PORTAL" : "B2B CLIENT ACCOUNT"}
              </span>
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFFFF]">
              WELCOME BACK, <span className="text-[#B7FF00]">{user.name}</span>.
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Manage your sportswear quotations, active tech packs, production orders, and company profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
            >
              <span>REQUEST NEW QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Dashboard Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-4">
            <AccountSidebar activeTab="profile" isAdmin={isAdmin} />
          </div>

          {/* Right Column: Main Profile & Status Content */}
          <main className="lg:col-span-8 space-y-6">
            {/* Account Information Card */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#050505] text-[#B7FF00] border border-[#2A2A2A]">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-sora text-sm sm:text-base font-extrabold uppercase text-[#FFFFFF] tracking-tight">
                      ACCOUNT INFORMATION
                    </h2>
                    <p className="font-inter text-xs text-[#777777]">
                      Your verified client details and contact credentials
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] font-barlow text-[11px] font-bold tracking-wider uppercase">
                  {user.role}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Full Name / Contact
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#FFFFFF]">
                    {user.name}
                  </p>
                </div>

                {/* Business Email */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Business Email
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#B7FF00] break-all">
                    {user.email}
                  </p>
                </div>

                {/* Phone / WhatsApp */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Phone / WhatsApp
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#FFFFFF]">
                    {user.phone || profile?.phone || "Not provided"}
                  </p>
                </div>

                {/* Company / Brand */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Company / Brand Name
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#FFFFFF]">
                    {profile?.companyName || "Independent Buyer"}
                  </p>
                </div>

                {/* Country */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Country / Region
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#FFFFFF]">
                    {profile?.country || "International"}
                  </p>
                </div>

                {/* Member Since */}
                <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                  <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                    Client Since
                  </span>
                  <p className="font-inter text-sm font-semibold text-[#FFFFFF]">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Verification & Account Status */}
            <div className="bg-[#171717] border border-[#2A2A2A] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#050505] text-[#B7FF00] border border-[#2A2A2A]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-sora text-sm sm:text-base font-extrabold uppercase text-[#FFFFFF] tracking-tight">
                      SECURITY &amp; VERIFICATION STATUS
                    </h2>
                    <p className="font-inter text-xs text-[#777777]">
                      Email validation and authentication parameters
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#050505] border border-[#2A2A2A] flex items-center justify-between">
                  <div>
                    <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                      Email Status
                    </span>
                    <p className="font-inter text-xs font-semibold text-[#FFFFFF]">
                      {user.emailVerified ? "Verified & Authenticated" : "Pending Verification"}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-[10px] font-barlow font-bold uppercase tracking-wider">
                    {user.emailVerified ? "EMAIL VERIFIED" : "UNVERIFIED"}
                  </span>
                </div>

                <div className="p-4 bg-[#050505] border border-[#2A2A2A] flex items-center justify-between">
                  <div>
                    <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                      Account Status
                    </span>
                    <p className="font-inter text-xs font-semibold text-[#FFFFFF]">
                      {user.status === "ACTIVE" ? "Active B2B Portal" : "Suspended"}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-[10px] font-barlow font-bold uppercase tracking-wider">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/account/orders"
                className="p-6 bg-[#171717] hover:bg-[#1f1f1f] border border-[#2A2A2A] hover:border-[#B7FF00]/40 transition-all group block"
              >
                <div className="flex items-center justify-between mb-3">
                  <Package className="w-6 h-6 text-[#B7FF00]" />
                  <span className="text-[#777777] group-hover:text-[#B7FF00] text-xs font-sora font-bold">&rarr;</span>
                </div>
                <h3 className="font-sora text-sm font-bold uppercase text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors">
                  VIEW ORDERS
                </h3>
                <p className="font-inter text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Track bulk manufacturing order production milestones and shipments.
                </p>
              </Link>

              <Link
                href="/account/inquiries"
                className="p-6 bg-[#171717] hover:bg-[#1f1f1f] border border-[#2A2A2A] hover:border-[#B7FF00]/40 transition-all group block"
              >
                <div className="flex items-center justify-between mb-3">
                  <FileText className="w-6 h-6 text-[#B7FF00]" />
                  <span className="text-[#777777] group-hover:text-[#B7FF00] text-xs font-sora font-bold">&rarr;</span>
                </div>
                <h3 className="font-sora text-sm font-bold uppercase text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors">
                  MANAGE INQUIRIES
                </h3>
                <p className="font-inter text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Review submitted B2B quotation requests and tech pack attachments.
                </p>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

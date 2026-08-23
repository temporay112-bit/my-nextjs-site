import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import {
  FileText,
  Calendar,
  ArrowUpRight,
  Download,
  Building2,
  Tag,
  Paperclip,
} from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export const metadata = {
  title: "My Inquiries | SLOTS SPORTSWEAR",
  description: "Review your submitted project and custom sportswear quotation inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

function getInquiryStatusBadge(status: string) {
  switch (status) {
    case "QUOTED":
      return "bg-[#B7FF00]/10 border-[#B7FF00]/40 text-[#B7FF00]";
    case "REVIEWING":
    case "CONTACTED":
      return "bg-amber-950/60 border-amber-500/50 text-amber-400";
    case "CLOSED":
      return "bg-[#2A2A2A] border-[#444444] text-[#777777]";
    case "NEW":
    default:
      return "bg-blue-950/60 border-blue-500/50 text-blue-400";
  }
}

export default async function AccountInquiriesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/account/inquiries");
  }

  // Server-side ownership enforcement: query ONLY inquiries belonging to authenticated user ID
  const inquiries = db.findInquiriesByCustomerId(user.id);
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#050505] text-[#FFFFFF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] mb-3">
              <FileText className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
                B2B INQUIRY LOG
              </span>
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#FFFFFF]">
              MY INQUIRIES
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Review your submitted B2B manufacturing quotation requests, project scopes, and tech packs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Dashboard Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-4">
            <AccountSidebar activeTab="inquiries" isAdmin={isAdmin} />
          </div>

          {/* Right Column: Inquiries Content */}
          <main className="lg:col-span-8 space-y-6">
            {inquiries.length === 0 ? (
              /* Empty State */
              <div className="bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-[#050505] border border-[#2A2A2A] text-[#777777] flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="font-sora text-xl font-extrabold uppercase text-[#FFFFFF] mb-2 tracking-tight">
                  NO INQUIRIES YET
                </h2>
                <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto mb-8 leading-relaxed">
                  Your quotation and custom manufacturing inquiries will appear here once submitted.
                </p>
                <Link
                  href="/contact#quote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              /* Inquiries List */
              <div className="space-y-4">
                {inquiries.map((inquiry) => {
                  const fileUrl = inquiry.fileReference
                    ? inquiry.fileReference.startsWith("http://") || inquiry.fileReference.startsWith("https://")
                      ? inquiry.fileReference
                      : `/api/upload/file?pathname=${encodeURIComponent(inquiry.fileReference)}`
                    : null;
                  const filename = inquiry.fileReference
                    ? inquiry.fileReference.split("/").pop() || "Tech Pack"
                    : null;

                  return (
                    <div
                      key={inquiry.id}
                      className="bg-[#171717] border border-[#2A2A2A] p-6 shadow-xl space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-sora text-sm font-extrabold uppercase text-[#FFFFFF] tracking-wider">
                              Inquiry #{inquiry.id.substring(0, 16)}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 border text-[10px] font-barlow font-bold uppercase tracking-wider ${getInquiryStatusBadge(
                                inquiry.status || "NEW"
                              )}`}
                            >
                              {inquiry.status || "NEW"}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-[#777777] mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              Submitted on{" "}
                              {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {inquiry.productCategory && (
                            <span className="px-2.5 py-1 bg-[#050505] border border-[#2A2A2A] text-[#B7FF00] font-barlow text-xs font-bold uppercase tracking-wider">
                              {inquiry.productCategory}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="p-4 bg-[#050505] border border-[#2A2A2A]">
                        <span className="font-sora text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                          Project Scope / Message
                        </span>
                        <p className="font-inter text-xs sm:text-sm text-[#D1D5DB] leading-relaxed whitespace-pre-wrap">
                          {inquiry.message}
                        </p>
                      </div>

                      {/* Tech Pack Attachment Link */}
                      {fileUrl && filename && (
                        <div className="p-3 bg-[#050505] border border-[#2A2A2A] flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-inter text-[#E9E9E9]">
                            <Paperclip className="w-4 h-4 text-[#B7FF00]" />
                            <span className="font-semibold">{filename}</span>
                          </div>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#333333] border border-[#B7FF00]/40 text-[#B7FF00] text-xs font-sora font-bold uppercase tracking-wider transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

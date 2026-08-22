import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SLOTS SPORTSWEAR",
  description: "Privacy Policy and data protection terms for SLOTS SPORTSWEAR custom apparel inquiries and tech pack uploads.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#050505] text-[#FFFFFF] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sora font-bold text-[#777777] hover:text-[#B7FF00] uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#2A2A2A] flex items-center justify-center text-[#B7FF00]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="font-sora text-xs font-bold text-[#B7FF00] uppercase tracking-widest-brand">
              LEGAL & CONFIDENTIALITY
            </p>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              PRIVACY POLICY
            </h1>
          </div>
        </div>

        <p className="font-inter text-xs text-[#777777] mb-10 pb-6 border-b border-[#2A2A2A]">
          Last Updated: 2026 Edition &bull; Draft for Corporate B2B Review
        </p>

        <div className="space-y-8 font-inter text-sm text-[#E9E9E9]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you submit a manufacturing inquiry, request a quote, or upload technical specifications (Tech Packs) to SLOTS SPORTSWEAR, we collect the information necessary to evaluate and process your B2B order. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#777777]">
              <li>Contact details: Name, business email address, phone / WhatsApp number, and company name.</li>
              <li>Order specifications: Product categories, estimated quantities, custom requirements, and project notes.</li>
              <li>Technical files: Proprietary Tech Packs, vector artwork (.ai, .pdf, .svg), and design mockups.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              2. Tech Pack Confidentiality & Non-Disclosure
            </h2>
            <p>
              SLOTS SPORTSWEAR treats all customer designs, proprietary tech packs, sizing charts, and brand assets as strictly confidential under industry Non-Disclosure practices. We do not sell, license, share, or publicly display customer technical assets to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              3. Secure File Storage & Infrastructure
            </h2>
            <p>
              Uploaded tech packs are transferred directly via secure browser-to-cloud protocols and stored in private object storage partitions with access control tokens. File access is restricted solely to authorized engineering and production personnel for sampling and costing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              4. Analytics & Telemetry
            </h2>
            <p>
              We employ privacy-safe Google Analytics 4 tracking strictly to analyze website usage performance and feature engagement. No personally identifiable customer details, form text values, or uploaded file data are transmitted to telemetry providers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              5. Contact Us Regarding Your Data
            </h2>
            <p>
              If you have any questions or require data removal of past quote inquiries, please contact our compliance desk directly at <a href="mailto:shahrangujjar00@gmail.com" className="text-[#B7FF00] underline">shahrangujjar00@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

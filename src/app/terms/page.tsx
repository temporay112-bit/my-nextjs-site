import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | SLOTS SPORTSWEAR",
  description: "Manufacturing terms, order conditions, sample approval, and export specifications for SLOTS SPORTSWEAR.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-sora text-xs font-bold text-[#B7FF00] uppercase tracking-widest-brand">
              B2B MANUFACTURING TERMS
            </p>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              TERMS & CONDITIONS
            </h1>
          </div>
        </div>

        <p className="font-inter text-xs text-[#777777] mb-10 pb-6 border-b border-[#2A2A2A]">
          Last Updated: 2026 Edition &bull; Standard Export Terms &bull; Draft for Corporate B2B Review
        </p>

        <div className="space-y-8 font-inter text-sm text-[#E9E9E9]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              1. Inquiry & Quotation Scope
            </h2>
            <p>
              All quotations issued through the SLOTS SPORTSWEAR inquiry system or official sales communications represent formal manufacturing estimates based on provided tech pack specifications, fabric GSM, order quantities, and customization methods. Official pricing is finalized upon physical sample sign-off and proforma invoice issuance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              2. Sampling & Pre-Production Approval
            </h2>
            <p>
              For all OEM, ODM, and Private Label production runs, physical or digital pre-production samples (PPS) are produced for buyer inspection. Bulk manufacturing commences only after written PPS approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              3. Quality Control & Tolerance Standards
            </h2>
            <p>
              SLOTS SPORTSWEAR enforces strict multi-stage quality control (AQL standards) across fabric inspection, cutting accuracy, stitching durability, customization alignment, and garment finishing. Standard international apparel dimensional tolerances (&plusmn;1-2 cm) apply unless tighter tolerances are formally contracted in advance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              4. Payment & International Logistics
            </h2>
            <p>
              Accepted payment terms (Bank Wire Transfer T/T, Remitly, Western Union, RIA, and other approved B2B payment methods) and shipping arrangements (DDP Cargo Service, DHL Express, Air/Sea freight) are governed by the agreed commercial contract and proforma invoice terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sora text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">
              5. Governing Law
            </h2>
            <p>
              Manufacturing operations are headquartered in Sialkot, Pakistan, operating in full compliance with the Sialkot Chamber of Commerce & Industry (SCCI) export regulations and international trade standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

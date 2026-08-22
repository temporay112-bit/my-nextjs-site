import React from "react";
import { CERTIFICATE_LOGOS } from "@/data/certificates";
import { InfiniteLogoMarquee } from "@/components/compliance/InfiniteLogoMarquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShieldCheck, FileCheck, Award, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificatesSectionProps {
  className?: string;
}

/**
 * CertificatesSection — TASK 09: OUR CERTIFICATES
 * Theme: Theme Family 01 (Trust / Logistics / Payment Family — Light background #F5F5F3)
 * Standard Spacing: py-14 sm:py-16 lg:py-16
 */
export function CertificatesSection({ className }: CertificatesSectionProps) {
  return (
    <section
      id="certificates"
      aria-label="Our Certifications & Compliance Documents"
      className={cn(
        "relative w-full bg-[#F5F5F3] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="TRUSTED & VERIFIED"
          headline="OUR CERTIFICATES"
          supportingText="Official business, tax, and manufacturing credentials verifying our operational authenticity and export compliance."
          align="center"
          theme="light"
          className="mb-8 sm:mb-10"
        />

        {/* Continuous Horizontal Logo Marquee */}
        <div className="my-4 sm:my-6 pb-6 border-b border-[#D9DEE7]">
          <InfiniteLogoMarquee
            items={CERTIFICATE_LOGOS}
            speedSeconds={28}
            logoHeightClass="h-16 sm:h-20"
            gapClass="gap-10 sm:gap-16 lg:gap-20"
            showLabels={true}
            theme="light"
            labelTheme="light"
          />
        </div>

        {/* Verification & Trust Micro-Badges */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#D9DEE7] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold text-[#171717] uppercase tracking-wide">
                Chamber Registered
              </p>
              <p className="font-inter text-[11px] text-[#6B7280]">
                Sialkot Chamber of Commerce
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#D9DEE7] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold text-[#171717] uppercase tracking-wide">
                FBR Taxpayer Active
              </p>
              <p className="font-inter text-[11px] text-[#6B7280]">
                Government of Pakistan Tax Registered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#D9DEE7] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold text-[#171717] uppercase tracking-wide">
                Quality Standards
              </p>
              <p className="font-inter text-[11px] text-[#6B7280]">
                ISO &amp; GMP Manufacturing Workflow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#D9DEE7] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold text-[#171717] uppercase tracking-wide">
                B2B Verified Audit
              </p>
              <p className="font-inter text-[11px] text-[#6B7280]">
                Documents available upon buyer request
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

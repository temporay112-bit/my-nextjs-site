import React from "react";
import { getPublishedMetrics, SOCIAL_PROOF_CONTENT } from "@/data/site-stats";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MetricCard } from "@/components/trust/MetricCard";
import { Button } from "@/components/shared/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialProofProps {
  className?: string;
}

/**
 * SocialProof — TASK 13: SOCIAL PROOF / COMPANY CAPABILITIES
 * Theme: Theme Family 02 (Product / Capability Family — Light background #FFFFFF)
 * Standard Spacing: py-14 sm:py-16 lg:py-16
 */
export function SocialProof({ className }: SocialProofProps) {
  const metrics = getPublishedMetrics();

  if (metrics.length === 0) {
    return null;
  }

  return (
    <section
      id="capabilities-proof"
      aria-label="SLOTS SPORTSWEAR Business Capabilities and Social Proof"
      className={cn(
        "relative w-full bg-[#FFFFFF] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={SOCIAL_PROOF_CONTENT.eyebrow}
          headline={SOCIAL_PROOF_CONTENT.headline}
          supportingText={SOCIAL_PROOF_CONTENT.supportingText}
          align="center"
          theme="light"
          className="mb-10 sm:mb-12"
        />

        {/* 4-Card Grid: 2 columns x 2 rows on mobile/tablet, 4 columns on desktop */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6"
          role="list"
          aria-label="Company scale and capability metrics"
        >
          {metrics.map((metric, index) => (
            <div key={metric.id} role="listitem" className="h-full">
              <MetricCard metric={metric} index={index} className="h-full" />
            </div>
          ))}
        </div>

        {/* Bottom Banner Call to Action Strip */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#171717] border border-[#2A2A2A] text-slots-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4 text-left">
            <div className="w-11 h-11 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora text-sm sm:text-base font-bold text-slots-white uppercase tracking-tight">
                READY TO SCALE YOUR SPORTSWEAR LINE?
              </h3>
              <p className="font-inter text-xs sm:text-sm text-technical-grey mt-0.5">
                From tech pack development to full-scale export manufacturing, our production team is ready.
              </p>
            </div>
          </div>

          <Button
            href="/contact#quote"
            variant="primary"
            size="md"
            className="inline-flex items-center gap-2 group shrink-0 font-extrabold"
          >
            <span>WORK WITH US</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}

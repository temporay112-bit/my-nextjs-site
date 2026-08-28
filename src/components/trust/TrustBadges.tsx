import React from "react";
import { TRUST_BADGES } from "@/data/trust";
import { TrustBadgeCard } from "@/components/trust/TrustBadgeCard";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

/**
 * TrustBadges — Compact credibility strip
 * Theme: Light (#FFFFFF), Dark text (#171717 / #4B5563), Compact vertical spacing (28px - 36px).
 */
export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <section
      aria-label="Why brands trust SLOTS SPORTSWEAR"
      className={cn(
        "relative w-full bg-[#FFFFFF] border-t border-b border-[#E5E7EB] overflow-hidden py-3 sm:py-3.5",
        className
      )}
    >
      {/* Visually hidden heading for screen readers */}
      <h2 className="sr-only">Key Strengths</h2>

      {/* Subtle edge fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-10 bg-gradient-to-r from-white via-white/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-10 bg-gradient-to-l from-white via-white/80 to-transparent"
        aria-hidden="true"
      />

      {/* Infinite Marquee Track */}
      <div
        className="animate-marquee-infinite flex items-center"
        style={{ animationDuration: "35s" }}
      >
        {/* Sequence 1 */}
        <div className="flex items-center shrink-0">
          {TRUST_BADGES.map((badge, index) => (
            <div key={`track1-${badge.id}`} className="shrink-0 px-4 sm:px-6 md:px-8">
              <TrustBadgeCard badge={badge} showDivider={index > 0} />
            </div>
          ))}
        </div>

        {/* Sequence 2 (Seamless loop duplicate) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {TRUST_BADGES.map((badge, index) => (
            <div key={`track2-${badge.id}`} className="shrink-0 px-4 sm:px-6 md:px-8">
              <TrustBadgeCard badge={badge} showDivider={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

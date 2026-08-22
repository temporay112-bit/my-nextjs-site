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
        "relative w-full bg-[#FFFFFF] border-t border-b border-[#E5E7EB]",
        className
      )}
    >
      {/* Visually hidden heading for screen readers */}
      <h2 className="sr-only">Key Strengths</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {TRUST_BADGES.map((badge, index) => (
            <TrustBadgeCard
              key={badge.id}
              badge={badge}
              showDivider={index > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

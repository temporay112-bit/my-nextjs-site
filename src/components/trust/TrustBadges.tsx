import React from "react";
import { TRUST_BADGES } from "@/data/trust";
import { TrustBadgeCard } from "@/components/trust/TrustBadgeCard";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <section
      aria-label="Why brands trust SLOTS SPORTSWEAR"
      className={cn(
        "relative w-full bg-graphite border-t border-b border-carbon-grey/40",
        className
      )}
    >
      {/* Visually hidden heading for screen readers */}
      <h2 className="sr-only">Key Strengths</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
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

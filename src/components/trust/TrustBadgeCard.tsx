import React from "react";
import type { TrustBadge } from "@/data/trust";
import { cn } from "@/lib/utils";

interface TrustBadgeCardProps {
  badge: TrustBadge;
  /** Whether to show the left border divider (desktop editorial dividers) */
  showDivider?: boolean;
}

export function TrustBadgeCard({ badge, showDivider = false }: TrustBadgeCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-center py-1 sm:py-1.5 transition-all duration-200 whitespace-nowrap",
        showDivider && "pl-4 sm:pl-6 md:pl-8 border-l border-[#E5E7EB]"
      )}
    >
      {/* Technical B2B Indicator Accent & Title */}
      <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-electric-lime shrink-0 shadow-sm" aria-hidden="true" />
        <h3 className="font-sora text-xs sm:text-sm font-bold text-slots-black leading-tight">
          {badge.title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-inter text-xs text-[#4B5563] leading-relaxed pl-3.5">
        {badge.description}
      </p>
    </div>
  );
}

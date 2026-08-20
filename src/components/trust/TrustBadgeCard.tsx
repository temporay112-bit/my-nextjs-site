import React from "react";
import { ShieldCheck, Layers3, Clock3, Globe2 } from "lucide-react";
import type { TrustBadge } from "@/data/trust";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  ShieldCheck,
  Layers3,
  Clock3,
  Globe2,
} as const;

interface TrustBadgeCardProps {
  badge: TrustBadge;
  /** Whether to show the left border divider (desktop editorial dividers) */
  showDivider?: boolean;
}

export function TrustBadgeCard({ badge, showDivider = false }: TrustBadgeCardProps) {
  const Icon = ICON_MAP[badge.icon];

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 transition-colors duration-200",
        showDivider && "lg:border-l lg:border-carbon-grey/40"
      )}
    >
      {/* Number + Icon Row */}
      <div className="flex items-center gap-3">
        <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand">
          {badge.number}
        </span>
        <Icon
          className="w-5 h-5 text-electric-lime/80 group-hover:text-electric-lime transition-colors duration-200 stroke-[1.75]"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="font-sora text-sm sm:text-[15px] font-bold uppercase tracking-technical text-slots-white leading-tight">
        {badge.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-xs sm:text-[13px] text-technical-grey leading-relaxed">
        {badge.description}
      </p>
    </div>
  );
}

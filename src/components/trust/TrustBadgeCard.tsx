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
        "group relative flex flex-col gap-2 px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-3 transition-colors duration-200",
        showDivider && "lg:border-l lg:border-[#E5E7EB]"
      )}
    >
      {/* Number + Icon Row */}
      <div className="flex items-center gap-2.5">
        <span className="font-sora text-xs font-bold text-[#171717] tracking-widest-brand">
          {badge.number}
        </span>
        <div className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center group-hover:bg-electric-lime group-hover:text-[#050505] transition-colors duration-200">
          <Icon className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-sora text-xs sm:text-sm font-bold uppercase tracking-technical text-[#171717] leading-tight">
        {badge.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-xs text-[#4B5563] leading-relaxed">
        {badge.description}
      </p>
    </div>
  );
}

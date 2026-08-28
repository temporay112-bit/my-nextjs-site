import React from "react";
import {
  Factory,
  PenTool,
  ShieldCheck,
  Tags,
  Layers3,
  Globe2,
  MessageCircleMore,
  Eye,
  LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhyChoosePoint } from "@/data/trust";

/** Map icon name strings → Lucide components */
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Factory,
  PenTool,
  ShieldCheck,
  Tags,
  Layers3,
  Globe2,
  MessageCircleMore,
  Eye,
};

interface WhyChooseCardProps {
  point: WhyChoosePoint;
  className?: string;
}

export function WhyChooseCard({ point, className }: WhyChooseCardProps) {
  const IconComponent = ICON_MAP[point.icon] ?? Factory;

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between gap-3 p-4 sm:p-4.5",
        "rounded-xl border border-carbon-grey/70",
        "bg-slots-black/60",
        "transition-all duration-200 ease-out",
        "hover:border-electric-lime/40 hover:bg-carbon-grey/40",
        "focus-within:border-electric-lime/40",
        className
      )}
    >
      {/* Top row: Icon + Number watermark */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            "bg-carbon-grey border border-carbon-grey/80",
            "text-technical-grey",
            "group-hover:bg-electric-lime/10 group-hover:border-electric-lime/30 group-hover:text-electric-lime",
            "transition-all duration-200"
          )}
          aria-hidden="true"
        >
          <IconComponent className="w-4 h-4" strokeWidth={1.75} />
        </div>

        <span
          className="font-barlow text-2xl sm:text-3xl font-black text-carbon-grey/40 leading-none select-none group-hover:text-electric-lime/20 transition-colors duration-200"
          aria-hidden="true"
        >
          {point.number}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3 className="font-sora text-xs sm:text-sm font-bold text-slots-white uppercase tracking-wide leading-snug">
          {point.title}
        </h3>
        <p className="font-inter text-[11px] sm:text-xs text-technical-grey leading-relaxed">
          {point.description}
        </p>
      </div>
    </article>
  );
}

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
        "group relative flex flex-col gap-4 p-5 sm:p-6",
        "rounded-2xl border border-carbon-grey/70",
        "bg-slots-black/60 backdrop-blur-sm",
        "transition-all duration-250 ease-out",
        "hover:border-electric-lime/40 hover:bg-carbon-grey/40",
        "focus-within:border-electric-lime/40",
        className
      )}
    >
      {/* Card number — subtle top-right watermark */}
      <span
        className="absolute top-4 right-5 font-barlow text-4xl font-black text-carbon-grey/40 leading-none select-none group-hover:text-electric-lime/15 transition-colors duration-250"
        aria-hidden="true"
      >
        {point.number}
      </span>

      {/* Icon block */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          "bg-carbon-grey border border-carbon-grey/80",
          "text-technical-grey",
          "group-hover:bg-electric-lime/10 group-hover:border-electric-lime/30 group-hover:text-electric-lime",
          "transition-all duration-250"
        )}
        aria-hidden="true"
      >
        <IconComponent className="w-4.5 h-4.5" strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 pr-4">
        <h3 className="font-sora text-sm sm:text-base font-bold text-slots-white uppercase tracking-wide leading-snug">
          {point.title}
        </h3>
        <p className="font-inter text-xs sm:text-[13px] text-technical-grey leading-relaxed">
          {point.description}
        </p>
      </div>
    </article>
  );
}

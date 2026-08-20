import React from "react";
import { FilePenLine, Lightbulb, Tags, Check } from "lucide-react";
import type { CapabilityModel } from "@/data/capabilities";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  FilePenLine,
  Lightbulb,
  Tags,
} as const;

interface CapabilityCardProps {
  capability: CapabilityModel;
  className?: string;
}

export function CapabilityCard({ capability, className }: CapabilityCardProps) {
  const Icon = ICON_MAP[capability.icon];

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-light-grey/30 p-6 sm:p-8 transition-all duration-300 shadow-md",
        className
      )}
    >
      {/* Top Header Row: Number + Icon */}
      <div>
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-carbon-grey/40">
          <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-3 py-1 rounded-full bg-graphite border border-light-grey/10">
            {capability.number}
          </span>
          <div className="w-10 h-10 rounded-xl bg-graphite border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center transition-colors duration-200">
            <Icon className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
          </div>
        </div>

        {/* Titles */}
        <div className="mt-5 sm:mt-6">
          <div className="flex items-baseline gap-2">
            <h3 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slots-white">
              {capability.title}
            </h3>
          </div>
          <p className="font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider text-technical-grey mt-1">
            {capability.fullTitle}
          </p>

          <p className="font-sora text-sm sm:text-base font-bold uppercase tracking-tight text-electric-lime mt-4">
            {capability.headline}
          </p>

          <p className="font-inter text-xs sm:text-sm text-light-grey/80 mt-2.5 leading-relaxed">
            {capability.description}
          </p>
        </div>

        {/* Benefits Checklist */}
        <div className="mt-6 sm:mt-7 pt-5 border-t border-carbon-grey/40">
          <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey mb-3">
            Key Inclusions:
          </p>
          <ul className="space-y-2.5">
            {capability.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-light-grey/90">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" aria-hidden="true" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="mt-8 pt-6 border-t border-carbon-grey/40">
        <Button
          variant="outline"
          size="md"
          href={capability.href}
          fullWidth
          className="border-carbon-grey/70 text-slots-white group-hover:border-electric-lime group-hover:bg-electric-lime group-hover:text-slots-black transition-all duration-300 font-bold text-xs tracking-wider"
        >
          {capability.ctaLabel}
        </Button>
      </div>
    </div>
  );
}

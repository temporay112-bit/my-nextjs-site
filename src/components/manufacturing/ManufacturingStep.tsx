import React from "react";
import {
  MessageSquareText,
  Ruler,
  Layers3,
  ClipboardList,
  Scissors,
  Workflow,
  Tags,
  ShieldCheck,
  PackageCheck,
  Globe2,
} from "lucide-react";
import type { ManufacturingStepItem } from "@/data/manufacturing";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  MessageSquareText,
  Ruler,
  Layers3,
  ClipboardList,
  Scissors,
  Workflow,
  Tags,
  ShieldCheck,
  PackageCheck,
  Globe2,
} as const;

interface ManufacturingStepProps {
  step: ManufacturingStepItem;
  className?: string;
}

export function ManufacturingStep({ step, className }: ManufacturingStepProps) {
  const Icon = ICON_MAP[step.icon];

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-graphite border border-carbon-grey/60 hover:border-light-grey/30 p-5 sm:p-6 transition-all duration-300 shadow-sm",
        className
      )}
    >
      <div>
        {/* Step Header: Number pill + Icon */}
        <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40">
          <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-2.5 py-1 rounded-full bg-slots-black/60 border border-light-grey/10">
            {step.number}
          </span>
          <div className="w-9 h-9 rounded-xl bg-slots-black/60 border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center transition-colors duration-200">
            <Icon className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sora text-sm sm:text-[15px] font-bold uppercase tracking-technical text-slots-white group-hover:text-electric-lime transition-colors duration-200 mt-4 leading-snug">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-inter text-xs sm:text-[13px] text-technical-grey group-hover:text-light-grey/90 transition-colors duration-200 mt-2 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Subtle bottom progress marker */}
      <div className="mt-4 pt-3 border-t border-carbon-grey/30 flex items-center justify-between text-[11px] font-sora text-technical-grey/70">
        <span className="uppercase tracking-wider">STAGE {step.number}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-carbon-grey group-hover:bg-electric-lime transition-colors duration-200" />
      </div>
    </div>
  );
}

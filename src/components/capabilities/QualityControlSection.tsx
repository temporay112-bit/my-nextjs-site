import React from "react";
import {
  ShieldCheck,
  ScanLine,
  CheckCircle2,
  Ruler,
  PackageCheck,
  Check,
} from "lucide-react";
import { QUALITY_CONTROL_ITEMS } from "@/data/capabilities";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ICON_MAP = {
  ShieldCheck,
  ScanLine,
  CheckCircle2,
  Ruler,
  PackageCheck,
} as const;

export function QualityControlSection() {
  return (
    <section
      id="quality-control"
      aria-label="Quality Control & Inspection System"
      className="w-full bg-graphite text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="MULTI-STAGE INSPECTION"
          headline="QUALITY CONTROL"
          supportingText="Our comprehensive quality control protocol enforces systematic audits at every stage of the manufacturing workflow — ensuring verified material durability, precise garment dimensions, and export-grade finishing."
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* 5 QC Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {QUALITY_CONTROL_ITEMS.map((stage, index) => {
            const Icon = ICON_MAP[stage.icon];
            const isWide = index === 3 || index === 4;

            return (
              <div
                key={stage.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slots-black border border-carbon-grey/70 hover:border-light-grey/25 transition-all duration-300 group shadow-md ${
                  isWide ? "lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar: Number + Checkpoint Badge + Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-2.5 py-0.5 rounded-full bg-graphite border border-light-grey/10">
                        {stage.number}
                      </span>
                      <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey px-2 py-0.5 rounded bg-carbon-grey/60">
                        {stage.checkpoint}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-graphite border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Category & Title */}
                  <p className="font-sora text-[10px] font-bold uppercase tracking-widest-brand text-technical-grey mb-1">
                    {stage.category}
                  </p>
                  <h3 className="font-sora text-base sm:text-lg font-extrabold uppercase text-slots-white tracking-tight mb-2.5">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed mb-5">
                    {stage.description}
                  </p>
                </div>

                {/* Inspection Checkpoints */}
                <div className="pt-4 border-t border-carbon-grey/40">
                  <p className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey mb-2.5">
                    Inspection Checkpoints:
                  </p>
                  <ul className="space-y-2">
                    {stage.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-light-grey/90">
                        <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mt-0.5">
                          <Check className="w-2 h-2 stroke-[2.5]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

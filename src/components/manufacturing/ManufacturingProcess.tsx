import React from "react";
import Image from "next/image";
import {
  MANUFACTURING_STEPS,
  MANUFACTURING_SECTION_CONTENT,
  PROCESS_PHASE_CARDS,
} from "@/data/manufacturing";
import { ManufacturingStep } from "@/components/manufacturing/ManufacturingStep";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface ManufacturingProcessProps {
  className?: string;
}

export function ManufacturingProcess({ className }: ManufacturingProcessProps) {
  return (
    <section
      id="manufacturing-process"
      aria-label="SLOTS SPORTSWEAR Manufacturing Process"
      className={cn(
        "relative w-full bg-slots-black text-slots-white py-14 sm:py-16 lg:py-16 border-b border-carbon-grey/40 overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={MANUFACTURING_SECTION_CONTENT.eyebrow}
          headline={MANUFACTURING_SECTION_CONTENT.headline}
          supportingText={MANUFACTURING_SECTION_CONTENT.supportingText}
          align="center"
          theme="dark"
        />

        {/* 4 Core Process Stage Photography Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {PROCESS_PHASE_CARDS.map((phase) => (
            <div
              key={phase.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-graphite border border-carbon-grey/60 hover:border-light-grey/30 min-h-[280px] sm:min-h-[300px] p-5 sm:p-6 transition-all duration-300 shadow-md"
            >
              {/* Background Process Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={phase.image}
                  alt={phase.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slots-black via-slots-black/75 to-slots-black/40" />
              </div>

              {/* Top Row: Phase Number + Stages Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-2.5 py-1 rounded-full bg-slots-black/70 border border-light-grey/10 backdrop-blur-md">
                  PHASE {phase.phaseNumber}
                </span>
                <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-light-grey/90 px-2 py-0.5 rounded bg-carbon-grey/80 border border-light-grey/10 backdrop-blur-md">
                  {phase.stages}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-electric-lime">
                  {phase.subtitle}
                </p>
                <h3 className="font-sora text-base sm:text-lg font-extrabold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors duration-200 mt-1">
                  {phase.title}
                </h3>
                <p className="font-inter text-xs text-light-grey/80 line-clamp-2 mt-1.5 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed 10-Step Sequential Workflow Grid */}
        <div className="mt-14 sm:mt-18">
          <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40 mb-6 sm:mb-8">
            <div>
              <p className="font-sora text-xs font-bold uppercase tracking-widest-brand text-electric-lime">
                DETAILED PRODUCTION TIMELINE
              </p>
              <h3 className="font-sora text-lg sm:text-xl font-bold uppercase tracking-tight text-slots-white mt-1">
                10-Stage Manufacturing Workflow
              </h3>
            </div>
            <span className="hidden sm:inline-block font-inter text-xs text-technical-grey">
              End-to-End Traceability
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {MANUFACTURING_STEPS.map((step) => (
              <ManufacturingStep key={step.id} step={step} />
            ))}
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            href={MANUFACTURING_SECTION_CONTENT.cta.href}
            className="font-extrabold shadow-lg hover:shadow-cta-glow px-8 py-3.5 md:py-4"
          >
            {MANUFACTURING_SECTION_CONTENT.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

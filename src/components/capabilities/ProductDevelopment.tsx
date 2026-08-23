import React from "react";
import Link from "next/link";
import {
  FileSearch,
  Scissors,
  Layers,
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PRODUCT_DEVELOPMENT_ITEMS } from "@/data/capabilities";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ICON_MAP = {
  FileSearch,
  Scissors,
  Layers,
  Sliders,
  Sparkles,
} as const;

export function ProductDevelopment() {
  return (
    <section
      id="product-development"
      aria-label="5-Stage Product Development Workflow"
      className="w-full bg-slots-black text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60 relative overflow-hidden"
    >
      {/* Background Decorative Accent Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-lime/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-carbon-grey/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="ENGINEERING & PROTOTYPING"
            headline="PRODUCT DEVELOPMENT"
            supportingText="Our structured 5-stage product development methodology transforms technical concepts into production-ready apparel with exact sizing, performance fabrics, and precise brand finishes."
            align="left"
            theme="dark"
          />

          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 font-sora text-xs md:text-sm font-bold uppercase text-electric-lime hover:text-slots-white transition-colors group self-start md:self-auto shrink-0 pb-1"
          >
            <span>SUBMIT YOUR TECH PACK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Development Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCT_DEVELOPMENT_ITEMS.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            const isWide = index === 3 || index === 4; // layout balance for 5 items

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-graphite/90 border border-carbon-grey/70 hover:border-electric-lime/40 hover:bg-graphite transition-all duration-300 group shadow-sm ${
                  isWide ? "lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-barlow text-sm font-bold tracking-widest text-electric-lime px-2.5 py-0.5 rounded-full bg-carbon-grey/80 border border-light-grey/10">
                        STAGE {item.stepNumber}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-carbon-grey/70 border border-light-grey/10 flex items-center justify-center text-electric-lime group-hover:scale-105 transition-transform duration-200 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category & Title */}
                  <p className="font-sora text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-brand text-technical-grey mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-sora text-lg sm:text-xl font-extrabold uppercase text-slots-white tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-carbon-grey/60">
                  <p className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey mb-2.5">
                    Stage Deliverables:
                  </p>
                  <ul className="space-y-2">
                    {item.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime shrink-0 mt-0.5" />
                        <span className="font-inter text-xs text-light-grey/90">{del}</span>
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

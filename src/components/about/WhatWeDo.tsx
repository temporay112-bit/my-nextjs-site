import React from "react";
import Link from "next/link";
import {
  Scissors,
  FileCode,
  Lightbulb,
  Tags,
  Layers,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { WHAT_WE_DO_ITEMS } from "@/data/about";

export function WhatWeDo() {
  const iconMap = {
    Scissors: Scissors,
    FileCode: FileCode,
    Lightbulb: Lightbulb,
    Tags: Tags,
    Layers: Layers,
    Truck: Truck,
  };

  return (
    <section
      id="what-we-do"
      className="w-full bg-graphite text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-grey/90 border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-3.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
              <span>CORE CAPABILITIES</span>
            </div>

            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.12]">
              WHAT WE DO
            </h2>

            <p className="font-inter text-sm sm:text-base md:text-lg text-technical-grey mt-3.5 leading-relaxed">
              Comprehensive B2B sportswear production capabilities structured for international
              apparel brands, sourcing managers, sports teams, and private labels.
            </p>
          </div>

          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 font-sora text-xs md:text-sm font-bold uppercase text-electric-lime hover:text-slots-white transition-colors group self-start md:self-auto"
          >
            <span>DISCUSS YOUR PRODUCTION REQUIREMENTS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Capability Cards Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_DO_ITEMS.map((item) => {
            const IconComp = iconMap[item.icon] || Scissors;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-carbon-grey/50 border border-light-grey/10 hover:border-electric-lime/40 hover:bg-carbon-grey/80 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-barlow text-sm font-bold tracking-widest text-technical-grey group-hover:text-electric-lime transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slots-black border border-light-grey/10 flex items-center justify-center text-electric-lime group-hover:scale-105 transition-transform duration-200 shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-sora text-base sm:text-lg font-bold uppercase text-slots-white tracking-tight mb-1.5">
                    {item.title}
                  </h3>

                  <p className="font-inter text-xs font-semibold uppercase tracking-wider text-electric-lime mb-3">
                    {item.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables checklist */}
                <div className="pt-4 border-t border-carbon-grey/80">
                  <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey mb-2.5">
                    Key Deliverables
                  </p>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime shrink-0" />
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

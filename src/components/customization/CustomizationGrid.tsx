import React from "react";
import {
  Palette,
  Layers,
  Droplets,
  Ruler,
  Sparkles,
  Printer,
  Tags,
  FileText,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { CUSTOMIZATION_OPTIONS } from "@/data/customization";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ICON_MAP = {
  Palette,
  Layers,
  Droplets,
  Ruler,
  Sparkles,
  Printer,
  Tags,
  FileText,
  PackageCheck,
  ShieldCheck,
} as const;

export function CustomizationGrid() {
  return (
    <section
      id="customization-options"
      aria-label="10 Sportswear Customization Options"
      className="w-full bg-graphite text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="CUSTOMIZATION OPTIONS"
          headline="COMPLETE FREEDOM OVER YOUR APPAREL SPECIFICATIONS"
          supportingText="Explore our 10 core customization capabilities engineered to give B2B buyers complete control over product design, materials, fitting, brand embellishment, and retail packaging."
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* 10-Item Customization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CUSTOMIZATION_OPTIONS.map((option) => {
            const Icon = ICON_MAP[option.icon];

            return (
              <div
                key={option.id}
                id={option.id}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slots-black border border-carbon-grey/70 hover:border-electric-lime/40 hover:bg-slots-black/90 transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Top Bar: Option Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40 mb-5">
                    <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-3 py-1 rounded-full bg-graphite border border-light-grey/10">
                      OPTION {option.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-graphite border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Category & Title */}
                  <p className="font-sora text-[10px] font-bold uppercase tracking-widest-brand text-technical-grey mb-1">
                    {option.category}
                  </p>
                  <h3 className="font-sora text-lg sm:text-xl font-extrabold uppercase text-slots-white tracking-tight mb-3">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed mb-6">
                    {option.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-carbon-grey/40">
                  <p className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey mb-2.5">
                    Key Features & Inclusions:
                  </p>
                  <ul className="space-y-2">
                    {option.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-light-grey/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime shrink-0 mt-0.5" />
                        <span>{del}</span>
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

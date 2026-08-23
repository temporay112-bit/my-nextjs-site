import React from "react";
import Link from "next/link";
import { FilePenLine, Lightbulb, Tags, Check, ArrowRight } from "lucide-react";
import { DETAILED_CAPABILITY_MODELS } from "@/data/capabilities";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ICON_MAP = {
  FilePenLine,
  Lightbulb,
  Tags,
} as const;

export function CapabilityDeepDive() {
  return (
    <section
      id="engagement-models"
      aria-label="Manufacturing Engagement Models: OEM, ODM & Private Label"
      className="w-full bg-graphite text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ENGAGEMENT MODELS"
          headline="OEM, ODM & PRIVATE LABEL"
          supportingText="Choose the manufacturing model that fits your operational needs. Whether you provide ready-to-cut tech packs or need collaborative concept design, SLOTS SPORTSWEAR delivers end-to-end production reliability."
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* 3-Column Detailed Model Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DETAILED_CAPABILITY_MODELS.map((model) => {
            const Icon = ICON_MAP[model.icon];

            return (
              <div
                key={model.id}
                id={model.id}
                className="flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/70 hover:border-electric-lime/40 p-6 sm:p-8 transition-all duration-300 shadow-md group"
              >
                <div>
                  {/* Top Header Row: Number + Badge + Icon */}
                  <div className="flex items-center justify-between pb-5 border-b border-carbon-grey/40">
                    <div className="flex items-center gap-2.5">
                      <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-3 py-1 rounded-full bg-graphite border border-light-grey/10">
                        {model.number}
                      </span>
                      <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey px-2.5 py-0.5 rounded bg-carbon-grey/60">
                        {model.badge}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-graphite border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Titles & Headings */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slots-white">
                        {model.title}
                      </h3>
                    </div>
                    <p className="font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider text-technical-grey mt-1">
                      {model.fullTitle}
                    </p>

                    <p className="font-sora text-sm sm:text-base font-bold uppercase tracking-tight text-electric-lime mt-4">
                      {model.headline}
                    </p>

                    <p className="font-inter text-xs sm:text-sm text-light-grey/80 mt-3 leading-relaxed">
                      {model.summary}
                    </p>
                  </div>

                  {/* Ideal For Section */}
                  <div className="mt-5 p-3.5 rounded-xl bg-carbon-grey/40 border border-light-grey/5">
                    <p className="font-sora text-[10px] font-bold uppercase tracking-widest-brand text-technical-grey mb-1">
                      Best Suited For:
                    </p>
                    <p className="font-inter text-xs text-light-grey/90 leading-normal">
                      {model.idealFor}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-5 border-t border-carbon-grey/40">
                    <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey mb-3.5">
                      Key Inclusions & Deliverables:
                    </p>
                    <ul className="space-y-2.5">
                      {model.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-light-grey/90">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" aria-hidden="true" />
                          </span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-8 pt-6 border-t border-carbon-grey/40">
                  <Link
                    href={model.href}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-carbon-grey/80 text-slots-white font-sora font-bold text-xs uppercase tracking-wider group-hover:border-electric-lime group-hover:bg-electric-lime group-hover:text-slots-black transition-all duration-300 active:scale-[0.98]"
                  >
                    <span>{model.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

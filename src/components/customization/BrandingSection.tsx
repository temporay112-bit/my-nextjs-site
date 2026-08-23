import React from "react";
import Link from "next/link";
import { Sparkles, Printer, Tags, Check, ArrowRight } from "lucide-react";
import { BRANDING_TECHNIQUES } from "@/data/customization";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function BrandingSection() {
  return (
    <section
      id="branding"
      aria-label="High-Definition Branding & Embellishment Techniques"
      className="w-full bg-slots-black text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60 relative overflow-hidden"
    >
      {/* Background Decorative Lighting Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-electric-lime/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="BRANDING & EMBELLISHMENT"
            headline="HIGH-DEFINITION BRAND IDENTITY"
            supportingText="Elevate your athletic garments with direct factory decoration techniques. From textured 3D embroidery to silicone heat seals and custom woven labeling, every logo is executed with precision."
            align="left"
            theme="dark"
          />

          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 font-sora text-xs md:text-sm font-bold uppercase text-electric-lime hover:text-slots-white transition-colors group self-start md:self-auto shrink-0 pb-1"
          >
            <span>DISCUSS YOUR BRANDING SPECS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Branding Technique Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BRANDING_TECHNIQUES.map((tech, index) => {
            const icons = [Sparkles, Printer, Tags];
            const Icon = icons[index % icons.length];

            return (
              <div
                key={tech.id}
                className="flex flex-col justify-between rounded-2xl bg-graphite/90 border border-carbon-grey/70 hover:border-electric-lime/40 hover:bg-graphite transition-all duration-300 p-6 sm:p-8 group shadow-sm"
              >
                <div>
                  {/* Top Bar: Badge & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40 mb-5">
                    <span className="font-sora text-[10px] font-bold uppercase tracking-widest-brand text-electric-lime px-3 py-1 rounded-full bg-carbon-grey/80 border border-light-grey/10">
                      {tech.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-carbon-grey/70 border border-light-grey/10 text-electric-lime flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Titles */}
                  <p className="font-sora text-xs font-semibold uppercase tracking-wider text-technical-grey mb-1">
                    {tech.subtitle}
                  </p>
                  <h3 className="font-sora text-lg sm:text-xl font-extrabold uppercase text-slots-white tracking-tight mb-3">
                    {tech.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="pt-4 border-t border-carbon-grey/60">
                  <p className="font-sora text-[10px] font-bold uppercase tracking-wider text-technical-grey mb-3">
                    Decoration Deliverables:
                  </p>
                  <ul className="space-y-2.5">
                    {tech.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-light-grey/90">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                        <span>{feat}</span>
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

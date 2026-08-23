import React from "react";
import Link from "next/link";
import { ArrowRight, Download, MessageSquareText } from "lucide-react";
import { CAPABILITIES_PAGE_CTA } from "@/data/capabilities";

export function CapabilitiesCta() {
  const { eyebrow, headline, supportingText, ctaLabel, ctaHref, secondaryLabel, secondaryHref } =
    CAPABILITIES_PAGE_CTA;

  return (
    <section
      aria-label="Capabilities Consultation Call to Action"
      className="relative w-full bg-slots-black text-slots-white py-20 sm:py-24 md:py-28 overflow-hidden"
    >
      {/* Ambient Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-electric-lime/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite/90 border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-electric-lime" />
          <span>{eyebrow}</span>
        </div>

        {/* Section H2 Headline */}
        <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.1] mb-6">
          {headline}
        </h2>

        {/* Supporting Copy */}
        <p className="font-inter text-sm sm:text-base md:text-lg text-light-grey/85 leading-relaxed max-w-2xl mx-auto mb-10">
          {supportingText}
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-electric-lime text-slots-black font-sora font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-[#a8eb00] hover:shadow-cta-glow transition-all duration-200 active:scale-[0.98] group w-full sm:w-auto"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href={secondaryHref}
            download="slots-sportswear-catalogue.pdf"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-graphite/80 border border-light-grey/20 text-slots-white font-sora font-semibold text-xs md:text-sm uppercase tracking-wider hover:bg-carbon-grey hover:border-light-grey/30 transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            <Download className="w-4 h-4 text-electric-lime" />
            <span>{secondaryLabel}</span>
          </Link>
        </div>

        {/* Trust Badges Footer Bar */}
        <div className="mt-14 pt-8 border-t border-carbon-grey/50 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-inter text-technical-grey uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>OEM & ODM Capabilities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>Tech Pack & Prototyping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>Strict Multi-Stage QC</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>Worldwide B2B Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}

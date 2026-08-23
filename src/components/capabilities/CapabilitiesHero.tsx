import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Factory, Layers, ShieldCheck } from "lucide-react";
import { CAPABILITIES_HERO_CONTENT } from "@/data/capabilities";

export function CapabilitiesHero() {
  const { eyebrow, headline, supportingText, primaryCta, secondaryCta, trustHighlights } =
    CAPABILITIES_HERO_CONTENT;

  return (
    <section className="relative w-full bg-slots-black text-slots-white overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-carbon-grey/40">
      {/* Background Image & Ambient Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory/facility-main.jpg"
          alt="SLOTS SPORTSWEAR Sialkot manufacturing floor and production capabilities"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20 filter brightness-[0.65] contrast-[1.2] scale-[1.02]"
        />
        {/* Layered High-contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slots-black via-slots-black/95 to-slots-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slots-black via-transparent to-slots-black/70" />
        
        {/* Subtle Technical Grid Motif */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-2 text-xs font-inter uppercase tracking-widest-brand text-technical-grey">
            <li>
              <Link href="/" className="hover:text-electric-lime transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-technical-grey/60" />
            </li>
            <li className="text-slots-white font-semibold" aria-current="page">
              Capabilities
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-graphite/90 border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-5 sm:mb-6 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          {/* Primary Semantic H1 */}
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.08] mb-6">
            {headline}
          </h1>

          {/* Supporting Copy */}
          <p className="font-inter text-base sm:text-lg md:text-xl text-light-grey/90 leading-relaxed max-w-2xl mb-8 sm:mb-10 font-normal">
            {supportingText}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 md:py-4 rounded-full bg-electric-lime text-slots-black font-sora font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-[#a8eb00] hover:shadow-cta-glow transition-all duration-200 active:scale-[0.98] group"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 md:py-4 rounded-full bg-graphite/80 border border-light-grey/20 text-slots-white font-sora font-semibold text-xs md:text-sm uppercase tracking-wider hover:bg-carbon-grey hover:border-light-grey/30 transition-all duration-200 active:scale-[0.98]"
            >
              <span>{secondaryCta.label}</span>
            </Link>
          </div>
        </div>

        {/* Quick Capabilities Highlights Bar */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-carbon-grey/50 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-graphite/40 border border-carbon-grey/40 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-lg bg-carbon-grey/70 border border-light-grey/10 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-electric-lime" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold uppercase text-slots-white tracking-wider">
                {trustHighlights[0].title}
              </p>
              <p className="font-inter text-xs text-technical-grey">{trustHighlights[0].description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-graphite/40 border border-carbon-grey/40 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-lg bg-carbon-grey/70 border border-light-grey/10 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-electric-lime" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold uppercase text-slots-white tracking-wider">
                {trustHighlights[1].title}
              </p>
              <p className="font-inter text-xs text-technical-grey">{trustHighlights[1].description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-graphite/40 border border-carbon-grey/40 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-lg bg-carbon-grey/70 border border-light-grey/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-electric-lime" />
            </div>
            <div>
              <p className="font-sora text-xs font-bold uppercase text-slots-white tracking-wider">
                {trustHighlights[2].title}
              </p>
              <p className="font-inter text-xs text-technical-grey">{trustHighlights[2].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

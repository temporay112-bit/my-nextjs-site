import React from "react";
import { HeroPosterSlider } from "@/components/hero/HeroPosterSlider";
import { Button } from "@/components/shared/Button";
import { HERO_CONTENT } from "@/data/hero";
import { ShieldCheck, Zap, Factory } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      aria-label="SLOTS SPORTSWEAR Hero"
      className={cn(
        "relative w-full min-h-[72vh] md:min-h-[80vh] lg:min-h-[86vh] max-h-[920px] bg-slots-black text-slots-white flex items-center overflow-hidden",
        className
      )}
    >
      {/* 4-Poster Background Slider */}
      <div className="absolute inset-0 z-0">
        <HeroPosterSlider />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slots-black/70 border border-light-grey/20 backdrop-blur-md text-xs font-inter font-semibold uppercase tracking-wider text-electric-lime mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse" />
            <span>CUSTOM SPORTSWEAR MANUFACTURER & EXPORTER</span>
          </div>

          {/* Primary Semantic H1 */}
          <h1 className="font-sora text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.06] drop-shadow-md">
            {HERO_CONTENT.headline}
          </h1>

          {/* Supporting Lead Text */}
          <p className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-light-grey/90 max-w-2xl mt-4 sm:mt-6 leading-relaxed drop-shadow">
            {HERO_CONTENT.subheadline}
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-2">
            <Button
              variant="primary"
              size="lg"
              href={HERO_CONTENT.primaryCta.href}
              className="shadow-lg hover:shadow-cta-glow font-extrabold"
            >
              {HERO_CONTENT.primaryCta.label}
            </Button>

            <Button
              variant="outline"
              size="lg"
              href={HERO_CONTENT.secondaryCta.href}
              className="border-light-grey/40 text-slots-white hover:bg-slots-white hover:text-slots-black backdrop-blur-sm"
            >
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-light-grey/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-light-grey/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-electric-lime" />
              <span>Sialkot Manufacturing Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-electric-lime" />
              <span>OEM / ODM & Private Label</span>
            </div>
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4 text-electric-lime" />
              <span>Worldwide B2B Export</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

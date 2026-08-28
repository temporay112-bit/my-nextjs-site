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
        "relative w-full h-[23vh] min-h-[190px] max-h-[205px] sm:h-[32vh] sm:min-h-[260px] sm:max-h-[300px] md:h-[48vh] md:min-h-[400px] md:max-h-[480px] lg:h-[78vh] lg:min-h-[600px] lg:max-h-[840px] bg-slots-black text-slots-white flex items-center overflow-hidden z-0",
        className
      )}
    >
      {/* 4-Poster Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HeroPosterSlider />
      </div>

      {/* Hero Content Layer — shifted slightly upward via controlled padding */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-1.5 sm:pt-4 sm:pb-4 md:pt-10 md:pb-12 lg:pt-10 lg:pb-16 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slots-black/75 border border-light-grey/20 backdrop-blur-md text-[7.5px] sm:text-xs font-inter font-semibold uppercase tracking-wider text-electric-lime mb-0.5 sm:mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span>CUSTOM SPORTSWEAR MANUFACTURER &amp; EXPORTER</span>
          </div>

          {/* Primary Semantic H1 */}
          <h1 className="font-sora text-[15.5px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.08] sm:leading-[1.1] drop-shadow-md">
            {HERO_CONTENT.headline}
          </h1>

          {/* Supporting Lead Text — visually balanced 2-line layout on mobile */}
          <p className="font-inter text-[8.5px] sm:text-xs md:text-sm lg:text-base text-light-grey/90 max-w-2xl mt-0.5 sm:mt-2.5 leading-tight sm:leading-relaxed drop-shadow">
            <span className="block sm:inline">Premium custom sportswear manufacturing for international</span>{" "}
            <span className="block sm:inline">B2B brands, teams and private-label buyers.</span>
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-1 sm:mt-4 pt-0.5">
            <Button
              variant="primary"
              size="md"
              href={HERO_CONTENT.primaryCta.href}
              className="shadow-lg hover:shadow-cta-glow font-extrabold text-[9px] sm:text-xs md:text-sm py-0.5 px-2 sm:py-2 sm:px-4"
            >
              {HERO_CONTENT.primaryCta.label}
            </Button>

            <Button
              variant="outline"
              size="md"
              href={HERO_CONTENT.secondaryCta.href}
              className="border-light-grey/40 text-slots-white hover:bg-slots-white hover:text-slots-black backdrop-blur-sm text-[9px] sm:text-xs md:text-sm py-0.5 px-2 sm:py-2 sm:px-4"
            >
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-1 sm:mt-5 pt-1 sm:pt-3.5 border-t border-light-grey/15 flex flex-wrap items-center gap-2 sm:gap-5 text-[8px] sm:text-xs text-light-grey/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-lime flex-shrink-0" />
              <span>Sialkot Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-lime flex-shrink-0" />
              <span>OEM / ODM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Factory className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-lime flex-shrink-0" />
              <span>Global Export</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { ShieldCheck, ArrowRight, CheckCircle2, Factory, Globe, Award } from "lucide-react";

export function ManufacturingHero() {
  return (
    <section className="relative w-full bg-slots-black text-slots-white py-16 sm:py-20 lg:py-24 border-b border-carbon-grey/40 overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory/facility-main.jpg"
          alt="SLOTS SPORTSWEAR Sialkot apparel manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slots-black/90 via-slots-black/80 to-slots-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-slots-black via-slots-black/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-carbon-grey/80 border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-6 shadow-sm backdrop-blur-md">
            <Factory className="w-4 h-4 text-electric-lime" />
            <span>OUR MANUFACTURING</span>
          </div>

          {/* Semantic H1 Headline */}
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.1] text-slots-white">
            FROM CONCEPT TO <br />
            <span className="text-electric-lime">PRODUCTION.</span>
          </h1>

          {/* Description */}
          <p className="font-inter text-base sm:text-lg md:text-xl text-light-grey/90 mt-5 leading-relaxed max-w-2xl">
            A structured 10-step production workflow engineered to transform technical specifications and apparel CAD designs into high-performance bulk sportswear orders for global B2B clients.
          </p>

          {/* Key Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-carbon-grey/60">
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <CheckCircle2 className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>10-Stage Process</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <Globe className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>Sialkot Export Hub</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <Award className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <ShieldCheck className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>AQL 2.5 Multi-QC</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/contact#quote"
              className="font-extrabold shadow-lg hover:shadow-cta-glow inline-flex items-center gap-2"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#manufacturing-process"
              className="border border-carbon-grey hover:border-light-grey/30"
            >
              EXPLORE 10-STEP WORKFLOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

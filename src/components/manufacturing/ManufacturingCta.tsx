import React from "react";
import { Button } from "@/components/shared/Button";
import { ArrowRight, Factory, CheckCircle2 } from "lucide-react";

export function ManufacturingCta() {
  return (
    <section className="relative w-full bg-slots-black text-slots-white py-16 sm:py-20 border-b border-carbon-grey/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-graphite border border-carbon-grey/80 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-electric-lime/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content Left */}
          <div className="max-w-2xl relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slots-black border border-light-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-4">
              <Factory className="w-4 h-4" />
              <span>READY TO MANUFACTURE?</span>
            </div>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slots-white leading-tight">
              START YOUR SPORTSWEAR <br />
              <span className="text-electric-lime">PRODUCTION RUN.</span>
            </h2>
            <p className="font-inter text-sm sm:text-base text-technical-grey mt-3 leading-relaxed">
              Partner with Sialkot&apos;s leading B2B sportswear manufacturer for OEM, ODM, and private-label activewear. Submit your tech pack or request a bulk production quote today.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-xs font-inter text-light-grey">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime" /> Fast Tech Pack Quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime" /> Low Sample Lead Times
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime" /> Worldwide Export
              </span>
            </div>
          </div>

          {/* Action Right */}
          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              href="/contact#quote"
              className="font-extrabold shadow-lg hover:shadow-cta-glow px-8 py-4 text-center w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/products"
              className="border border-carbon-grey hover:border-light-grey/30 w-full sm:w-auto text-center"
            >
              Browse Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

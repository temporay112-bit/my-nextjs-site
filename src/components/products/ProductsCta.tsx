import React from "react";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

export function ProductsCta() {
  return (
    <section className="relative w-full bg-slots-black text-slots-white py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background Motifs */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
          <span>START YOUR PRODUCTION ORDER</span>
        </div>

        {/* Headline */}
        <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.1] mb-5">
          READY TO MANUFACTURE YOUR COLLECTION?
        </h2>

        {/* Supporting Copy */}
        <p className="font-inter text-sm sm:text-base md:text-lg text-light-grey/80 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Connect directly with our apparel production team in Sialkot. Upload your tech pack, request fabric swatches, or get an accurate quotation for bulk sportswear manufacturing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact#quote"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-electric-lime text-slots-black font-sora font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#a8eb00] hover:shadow-cta-glow transition-all duration-200 active:scale-[0.98] w-full sm:w-auto group"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="/slots-catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-graphite border border-light-grey/20 text-slots-white font-sora font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-carbon-grey hover:border-light-grey/30 transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            <FileDown className="w-4 h-4 text-electric-lime" />
            <span>DOWNLOAD CATALOGUE (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

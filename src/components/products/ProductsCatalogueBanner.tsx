import React from "react";
import Link from "next/link";
import { FileDown, ArrowRight, BookOpen } from "lucide-react";

export function ProductsCatalogueBanner() {
  return (
    <section className="w-full bg-graphite text-slots-white py-12 sm:py-16 border-b border-carbon-grey/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-carbon-grey/50 border border-light-grey/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-slots-black border border-light-grey/15 flex items-center justify-center text-electric-lime shrink-0 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>

            <div>
              <span className="font-sora text-xs font-bold uppercase tracking-widest-brand text-electric-lime block mb-1">
                OFFICIAL B2B CATALOGUE
              </span>
              <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase text-slots-white">
                Download Full 2026 Sportswear Catalogue
              </h3>
              <p className="font-inter text-xs sm:text-sm text-technical-grey mt-1">
                High-resolution product lines, detailed fabric compositions, and customization options in PDF format.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="/slots-catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-electric-lime text-slots-black font-sora font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#a8eb00] hover:shadow-cta-glow transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              <FileDown className="w-4 h-4" />
              <span>DOWNLOAD PDF (13.5 MB)</span>
            </a>

            <Link
              href="/contact#quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slots-black border border-light-grey/20 text-slots-white font-sora font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-carbon-grey transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>REQUEST QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

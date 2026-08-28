"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OFFICIAL_CATALOGUE, CATALOGUE_SECTION_CONTENT } from "@/data/catalogue";
import { trackEvent } from "@/lib/analytics";
import { Download, ExternalLink, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CatalogueSectionProps {
  className?: string;
}

/**
 * CatalogueSection — TASK 14: CATALOGUE ACCESS / PDF CATALOGUE
 *
 * Location: Mounted after Social Proof (#11) and before Get a Quote (#13).
 * Architecture: Production-ready App Router component with official PDF download and view actions.
 */
export function CatalogueSection({ className }: CatalogueSectionProps) {
  const handleCatalogueClick = (action: "view" | "download") => {
    trackEvent("catalogue_click", {
      action,
      file: OFFICIAL_CATALOGUE.filename,
    });
  };

  return (
    <section
      id="catalogue"
      aria-label="SLOTS SPORTSWEAR Official Product Catalogue"
      className={cn(
        "relative w-full bg-graphite text-slots-white py-14 sm:py-16 lg:py-16 border-b border-carbon-grey/40 overflow-hidden",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-electric-lime/[0.03] rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={CATALOGUE_SECTION_CONTENT.eyebrow}
          headline={CATALOGUE_SECTION_CONTENT.headline}
          supportingText={CATALOGUE_SECTION_CONTENT.supportingText}
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* Feature Box Card */}
        <div className="rounded-3xl bg-slots-black border border-carbon-grey/70 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A15_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Information & Actions */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime text-xs font-sora font-bold uppercase tracking-wider">
                  {OFFICIAL_CATALOGUE.year}
                </span>
                <span className="px-3 py-1 rounded-full bg-carbon-grey/80 border border-carbon-grey text-technical-grey text-xs font-inter font-medium">
                  {OFFICIAL_CATALOGUE.fileSize}
                </span>
              </div>

              <div>
                <h3 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slots-white">
                  {OFFICIAL_CATALOGUE.title}
                </h3>
                <p className="font-inter text-sm sm:text-base text-technical-grey mt-2 leading-relaxed">
                  {OFFICIAL_CATALOGUE.subtitle}
                </p>
              </div>

              {/* Key Highlights Checklist */}
              <div className="space-y-2.5 pt-2">
                <p className="font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-3">
                  What&apos;s Inside:
                </p>
                {OFFICIAL_CATALOGUE.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm font-inter text-light-grey/90">
                    <CheckCircle2 className="w-4 h-4 text-electric-lime shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={OFFICIAL_CATALOGUE.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCatalogueClick("view")}
                  className="inline-flex items-center justify-center font-sora font-bold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime select-none active:scale-[0.98] bg-electric-lime text-slots-black hover:bg-[#a8eb00] hover:shadow-cta-glow rounded-full text-sm md:text-base tracking-wider px-8 py-3.5 md:py-4 gap-2 group text-center"
                >
                  <span>VIEW CATALOGUE</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={OFFICIAL_CATALOGUE.pdfUrl}
                  download="SLOTS-SPORTSWEAR-CATALOGUE-2026.pdf"
                  onClick={() => handleCatalogueClick("download")}
                  className="inline-flex items-center justify-center font-sora font-bold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-grey select-none active:scale-[0.98] border border-carbon-grey hover:border-light-grey/40 hover:bg-carbon-grey text-slots-white rounded-full text-sm md:text-base tracking-wider px-8 py-3.5 md:py-4 gap-2 group text-center"
                >
                  <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                  <span>DOWNLOAD PDF CATALOGUE</span>
                </a>
              </div>
            </div>

            {/* Right Column: Catalogue Cover Image */}
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] rounded-2xl border border-carbon-grey/70 shadow-2xl relative overflow-hidden bg-slots-black">
                <Image
                  src={OFFICIAL_CATALOGUE.coverImage || "/images/catalogue/catalogue-cover.jpg"}
                  alt="SLOTS SPORTSWEAR 2026 Product Catalogue Cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

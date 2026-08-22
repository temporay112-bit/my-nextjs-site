import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { WhyChooseCard } from "@/components/trust/WhyChooseCard";
import { getPublishedWhyChoosePoints } from "@/data/trust";

interface WhyChooseProps {
  className?: string;
}

/**
 * WhyChoose — TASK 12: WHY CHOOSE SLOTS SPORTSWEAR?
 *
 * Position: After Trust Badges (#03), Before Products (#05).
 * per 01-project-requirements.md homepage final order and
 * 08-homepage-section-build-order.md.
 *
 * Layout:
 *  - Left col (lg): editorial statement — eyebrow, H2, supporting text, CTA
 *  - Right col (lg): 4×2 advantage card grid
 *
 * Server Component — no unnecessary client JS.
 * All hover/transition effects are pure CSS via Tailwind group utilities.
 */
export function WhyChoose({ className }: WhyChooseProps) {
  const points = getPublishedWhyChoosePoints();

  if (points.length === 0) return null;

  return (
    <section
      id="why-choose"
      aria-label="Why Choose SLOTS SPORTSWEAR for B2B Custom Sportswear Manufacturing"
      className={cn(
        "relative w-full bg-graphite text-slots-white overflow-hidden",
        "py-14 sm:py-16 lg:py-16",
        "border-b border-carbon-grey/40",
        className
      )}
    >
      {/* Ambient background glow — purely decorative */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-electric-lime/[0.035] blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-electric-lime/[0.025] blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Two-column editorial composition ── */}
        <div className="lg:grid lg:grid-cols-[1fr_1.8fr] lg:gap-16 xl:gap-20 items-start">

          {/* LEFT — Statement column */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 mb-12 lg:mb-0">
            {/* Section Heading */}
            <SectionHeading
              eyebrow="WHY SLOTS SPORTSWEAR"
              headline="BUILT AROUND YOUR BRAND."
              supportingText="A B2B manufacturing partner focused on customisation, production quality, communication and international delivery."
              align="left"
              theme="dark"
            />

            {/* Divider accent */}
            <div className="flex items-center gap-3 mt-2" aria-hidden="true">
              <div className="w-8 h-0.5 bg-electric-lime rounded-full" />
              <div className="w-2 h-0.5 bg-electric-lime/40 rounded-full" />
            </div>

            {/* Proof micro-list */}
            <ul className="flex flex-col gap-2.5 mt-1" role="list">
              {[
                "Custom garment development",
                "Production for international B2B buyers",
                "Transparent order coordination",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-inter text-xs sm:text-sm text-technical-grey"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-electric-lime shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-4 lg:mt-6">
              <Button
                href="/contact#quote"
                variant="primary"
                size="lg"
                className="inline-flex items-center gap-2 group/btn"
              >
                START YOUR PROJECT
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </div>

            {/* Bottom label */}
            <p className="font-inter text-[11px] text-technical-grey/70 tracking-wide mt-1">
              SIALKOT, PAKISTAN — MANUFACTURING FOR INTERNATIONAL BRANDS
            </p>
          </div>

          {/* RIGHT — Advantage card grid */}
          <div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              role="list"
              aria-label="Manufacturing advantages"
            >
              {points.map((point) => (
                <div key={point.id} role="listitem">
                  <WhyChooseCard point={point} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

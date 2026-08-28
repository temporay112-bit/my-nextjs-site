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
        "relative w-full bg-[#171717] text-slots-white overflow-hidden",
        "py-12 sm:py-14 lg:py-16",
        "border-b border-[#2A2A2A]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Two-column balanced equal-height composition ── */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10 items-stretch">

          {/* LEFT — Statement card column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl border border-carbon-grey/70 bg-slots-black/60">
            <div className="flex flex-col gap-5">
              {/* Section Heading */}
              <SectionHeading
                eyebrow="WHY SLOTS SPORTSWEAR"
                headline="Built around your brand."
                supportingText="A B2B manufacturing partner focused on customisation, production quality, communication and international delivery."
                align="left"
                theme="dark"
              />

              {/* Divider accent */}
              <div className="flex items-center gap-3" aria-hidden="true">
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
            </div>

            {/* CTA & Bottom Label */}
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button
                href="/contact#quote"
                variant="primary"
                size="md"
                className="inline-flex items-center justify-center gap-2 group/btn w-fit px-6"
              >
                <span>START YOUR PROJECT</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Button>

              <p className="font-inter text-xs text-technical-grey/70 tracking-wide">
                Sialkot, Pakistan — Manufacturing for international brands
              </p>
            </div>
          </div>

          {/* RIGHT — 8-box Advantage card grid */}
          <div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 h-full content-between mt-8 lg:mt-0"
            role="list"
            aria-label="Manufacturing advantages"
          >
            {points.map((point) => (
              <div key={point.id} role="listitem" className="h-full">
                <WhyChooseCard point={point} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

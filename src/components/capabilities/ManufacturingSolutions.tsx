import React from "react";
import { CAPABILITY_MODELS, CAPABILITIES_SECTION_CONTENT } from "@/data/capabilities";
import { CapabilityCard } from "@/components/capabilities/CapabilityCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface ManufacturingSolutionsProps {
  className?: string;
}

export function ManufacturingSolutions({ className }: ManufacturingSolutionsProps) {
  return (
    <section
      id="manufacturing-solutions"
      aria-label="Manufacturing Engagement Models"
      className={cn(
        "relative w-full bg-graphite text-slots-white py-14 sm:py-16 lg:py-16 border-b border-carbon-grey/40 overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={CAPABILITIES_SECTION_CONTENT.eyebrow}
          headline={CAPABILITIES_SECTION_CONTENT.headline}
          supportingText={CAPABILITIES_SECTION_CONTENT.supportingText}
          align="center"
          theme="dark"
        />

        {/* 3-Column Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          {CAPABILITY_MODELS.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Tags, FileText, PackageCheck, ShieldCheck } from "lucide-react";
import { PRIVATE_LABEL_FINISHING } from "@/data/customization";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function PrivateLabelSection() {
  const { eyebrow, headline, supportingText, features } = PRIVATE_LABEL_FINISHING;
  const icons = [Tags, FileText, PackageCheck, ShieldCheck];

  return (
    <section
      id="private-label-finishing"
      aria-label="Private Label Finishing & Packaging"
      className="w-full bg-graphite text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={eyebrow}
          headline={headline}
          supportingText={supportingText}
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={index}
                className="flex items-start gap-5 p-6 sm:p-7 rounded-2xl bg-slots-black border border-carbon-grey/70 hover:border-electric-lime/40 transition-all duration-300 group shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-graphite border border-carbon-grey/50 group-hover:border-electric-lime/40 text-electric-lime flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <div>
                  <h3 className="font-sora text-lg font-extrabold uppercase text-slots-white tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Cpu, ShieldCheck, Factory, Globe, CheckCircle2 } from "lucide-react";
import { COMPANY_OVERVIEW_CONTENT } from "@/data/about";

export function CompanyOverview() {
  const { eyebrow, headline, leadParagraph, bodyParagraphs, pillars, quickFacts } =
    COMPANY_OVERVIEW_CONTENT;

  const iconMap = {
    Cpu: Cpu,
    ShieldCheck: ShieldCheck,
    Factory: Factory,
    Globe: Globe,
  };

  return (
    <section id="company-overview" className="w-full bg-slots-white py-16 sm:py-20 md:py-24 border-b border-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-grey/80 border border-carbon-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-slots-black mb-3.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slots-black leading-[1.12]">
            {headline}
          </h2>

          <p className="font-inter text-base sm:text-lg md:text-xl text-carbon-grey font-medium mt-4 leading-relaxed">
            {leadParagraph}
          </p>
        </div>

        {/* Two-Column Editorial & Quick Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-5">
            {bodyParagraphs.map((para, index) => (
              <p
                key={index}
                className="font-inter text-sm sm:text-base text-carbon-grey leading-relaxed"
              >
                {para}
              </p>
            ))}

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F9F9F8] border border-light-grey">
                <CheckCircle2 className="w-4 h-4 text-slots-black shrink-0 mt-0.5" />
                <span className="font-inter text-xs sm:text-sm font-semibold text-slots-black">
                  Zero Unauthorized Subcontracting
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F9F9F8] border border-light-grey">
                <CheckCircle2 className="w-4 h-4 text-slots-black shrink-0 mt-0.5" />
                <span className="font-inter text-xs sm:text-sm font-semibold text-slots-black">
                  Direct Tech Pack & Spec Adherence
                </span>
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-graphite text-slots-white border border-carbon-grey/60 shadow-md">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-carbon-grey/80">
                <h3 className="font-sora text-xs sm:text-sm font-bold uppercase tracking-widest-brand text-electric-lime">
                  Company Specification
                </h3>
                <span className="text-[11px] font-mono uppercase text-technical-grey">Verified B2B Data</span>
              </div>

              <dl className="space-y-4">
                {quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 pb-3.5 border-b border-carbon-grey/40 last:border-0 last:pb-0">
                    <dt className="font-inter text-xs text-technical-grey uppercase tracking-wider font-medium">
                      {fact.label}
                    </dt>
                    <dd className="font-sora text-xs sm:text-sm font-bold text-slots-white sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="pt-10 border-t border-light-grey">
          <div className="mb-6">
            <h3 className="font-sora text-xs uppercase tracking-widest-brand text-technical-grey font-bold">
              Core Manufacturing Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar) => {
              const IconComp = iconMap[pillar.icon] || ShieldCheck;
              return (
                <div
                  key={pillar.number}
                  className="p-5 sm:p-6 rounded-xl bg-[#F8F8F6] border border-light-grey hover:border-carbon-grey/40 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-barlow text-lg font-bold text-technical-grey">
                      {pillar.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slots-black text-electric-lime flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="font-sora text-sm sm:text-base font-bold uppercase text-slots-black tracking-tight mb-2">
                    {pillar.title}
                  </h4>

                  <p className="font-inter text-xs sm:text-sm text-carbon-grey leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

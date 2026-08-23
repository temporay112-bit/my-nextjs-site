import React from "react";
import { ShieldCheck, CheckCircle2, BadgeCheck, Lock } from "lucide-react";
import { ABOUT_TRUST_CONTENT } from "@/data/about";

export function AboutTrust() {
  const { eyebrow, headline, supportingText, metrics, assurances } = ABOUT_TRUST_CONTENT;

  const iconMap = {
    ShieldCheck: ShieldCheck,
    CheckCircle2: CheckCircle2,
    BadgeCheck: BadgeCheck,
    Lock: Lock,
  };

  return (
    <section
      id="trust"
      className="w-full bg-[#F5F5F3] py-16 sm:py-20 md:py-24 border-b border-light-grey"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slots-white border border-carbon-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-slots-black mb-3.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slots-black leading-[1.12]">
            {headline}
          </h2>

          <p className="font-inter text-sm sm:text-base md:text-lg text-carbon-grey mt-3.5 leading-relaxed">
            {supportingText}
          </p>
        </div>

        {/* 4 Verified Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-6 sm:p-7 rounded-2xl bg-slots-white border border-light-grey shadow-xs hover:border-carbon-grey/40 transition-all duration-200"
            >
              <div className="font-sora text-4xl sm:text-5xl font-extrabold text-slots-black tracking-tight mb-2">
                {metric.value}
              </div>
              <h3 className="font-sora text-xs sm:text-sm font-bold uppercase tracking-wider text-slots-black mb-2">
                {metric.label}
              </h3>
              <p className="font-inter text-xs text-carbon-grey leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* 4 B2B Assurances */}
        <div>
          <div className="mb-6">
            <h3 className="font-sora text-xs uppercase tracking-widest-brand text-technical-grey font-bold">
              B2B Governance & Operational Assurances
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assurances.map((assur, idx) => {
              const IconComp = iconMap[assur.icon] || ShieldCheck;

              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl bg-slots-white border border-light-grey"
                >
                  <div className="w-10 h-10 rounded-lg bg-slots-black text-electric-lime flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-sora text-sm font-bold uppercase text-slots-black tracking-tight mb-2">
                    {assur.title}
                  </h4>
                  <p className="font-inter text-xs text-carbon-grey leading-relaxed">
                    {assur.description}
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

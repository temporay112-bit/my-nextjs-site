import React from "react";
import { CUSTOMIZATION_PROCESS_STEPS } from "@/data/customization";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CustomizationProcess() {
  return (
    <section
      id="customization-process"
      aria-label="4-Step Customization Workflow"
      className="w-full bg-slots-black text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="WORKFLOW & EXECUTION"
          headline="FROM CONCEPT TO CUSTOM FINISH"
          supportingText="Our structured 4-step customization workflow ensures seamless communication, exact sample verification, precision manufacturing, and on-time global export."
          align="center"
          theme="dark"
          className="mb-12 sm:mb-16"
        />

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CUSTOMIZATION_PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col justify-between p-6 rounded-2xl bg-graphite/80 border border-carbon-grey/70 hover:border-electric-lime/40 transition-all duration-300 group"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40 mb-4">
                  <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-3 py-1 rounded-full bg-slots-black border border-light-grey/10">
                    STEP {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sora text-base font-extrabold uppercase text-slots-white tracking-tight mb-2.5 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-xs text-light-grey/80 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div className="pt-3 border-t border-carbon-grey/40">
                <span className="font-sora text-[10px] font-bold uppercase tracking-widest-brand text-technical-grey block mb-1">
                  Step Output:
                </span>
                <span className="font-inter text-xs font-semibold text-electric-lime">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

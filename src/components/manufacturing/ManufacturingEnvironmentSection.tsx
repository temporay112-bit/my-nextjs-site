import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShieldCheck, CheckCircle2, Factory, Cpu, Layers, Award } from "lucide-react";
import { FACTORY_FEATURED_PROOF, FACTORY_PROOF_ITEMS } from "@/data/factory";

export function ManufacturingEnvironmentSection() {
  return (
    <section
      id="manufacturing-environment"
      aria-label="OUR MANUFACTURING ENVIRONMENT"
      className="relative w-full bg-graphite text-slots-white py-16 sm:py-20 border-b border-carbon-grey/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="SIALKOT APPAREL FACILITY"
          headline="OUR MANUFACTURING ENVIRONMENT"
          supportingText="Explore our authentic sportswear production facility operating with systematic quality inspection and structured export workflows in Sialkot, Pakistan."
          align="center"
          theme="dark"
        />

        {/* Featured Production Hub Hero Card */}
        <div className="mt-10 sm:mt-12 relative overflow-hidden rounded-3xl bg-slots-black border border-carbon-grey/60 hover:border-light-grey/30 transition-all duration-300 shadow-xl min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-8 lg:p-10 group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={FACTORY_FEATURED_PROOF.image}
              alt={FACTORY_FEATURED_PROOF.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slots-black via-slots-black/80 to-slots-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slots-black/90 via-slots-black/60 to-transparent" />
          </div>

          {/* Top Badges */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slots-black/80 border border-light-grey/20 backdrop-blur-md text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime shadow-sm">
              <ShieldCheck className="w-4 h-4 text-electric-lime" />
              <span>EXPORT MANUFACTURING HUB</span>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-carbon-grey/80 border border-light-grey/10 backdrop-blur-md text-[11px] font-sora font-semibold uppercase tracking-wider text-light-grey/90">
              AUTHENTIC FACILITY PROOF
            </span>
          </div>

          {/* Bottom Content Area */}
          <div className="relative z-10 max-w-3xl">
            <h3 className="font-sora text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slots-white leading-tight">
              {FACTORY_FEATURED_PROOF.title}
            </h3>
            <p className="font-inter text-sm sm:text-base text-light-grey/90 mt-3 sm:mt-4 leading-relaxed">
              {FACTORY_FEATURED_PROOF.description}
            </p>

            {/* Feature Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 sm:mt-8 pt-6 border-t border-light-grey/15">
              {FACTORY_FEATURED_PROOF.tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slots-black/70 border border-carbon-grey/60 text-xs font-inter font-medium text-light-grey"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Authentic Facility Proof Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FACTORY_PROOF_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-light-grey/30 transition-all duration-300 shadow-md min-h-[340px] p-5 sm:p-6"
            >
              {/* Card Image Thumbnail Header */}
              <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden mb-5 border border-carbon-grey/50">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slots-black via-transparent to-slots-black/30" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="font-sora text-[10px] font-bold text-slots-black bg-electric-lime uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Number Indicator */}
                <div className="absolute bottom-3 right-3">
                  <span className="font-sora text-xs font-bold text-electric-lime bg-slots-black/80 border border-light-grey/10 backdrop-blur-md px-2 py-0.5 rounded">
                    {item.number}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div>
                <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey">
                  {item.category}
                </p>
                <h4 className="font-sora text-base sm:text-[17px] font-bold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors duration-200 mt-1">
                  {item.title}
                </h4>
                <p className="font-inter text-xs sm:text-[13px] text-light-grey/80 line-clamp-3 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Verification Footer */}
              <div className="mt-4 pt-3 border-t border-carbon-grey/40 flex items-center justify-between text-[11px] font-inter text-technical-grey">
                <span>Verified Facility Workflow</span>
                <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

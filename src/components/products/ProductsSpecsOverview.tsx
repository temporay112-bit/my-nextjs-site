import React from "react";
import { PRODUCTS_SPECS } from "@/data/products-catalogue";
import { Layers, Ruler, Sparkles, TrendingUp } from "lucide-react";

export function ProductsSpecsOverview() {
  const iconMap = [Layers, Ruler, Sparkles, TrendingUp];

  return (
    <section className="w-full bg-slots-white py-16 sm:py-20 border-b border-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-grey/80 border border-carbon-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-slots-black mb-3.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>B2B MANUFACTURING STANDARDS</span>
          </div>

          <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slots-black leading-[1.12]">
            ENGINEERED TO SPECIFICATION
          </h2>

          <p className="font-inter text-sm sm:text-base text-carbon-grey mt-3.5 leading-relaxed">
            Every garment manufactured at SLOTS SPORTSWEAR adheres to strict technical benchmarks
            tailored for commercial sports brands, athletic clubs, and private-label buyers.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS_SPECS.map((spec, idx) => {
            const IconComp = iconMap[idx] || Layers;
            return (
              <div
                key={spec.number}
                className="p-6 rounded-2xl bg-[#F8F8F6] border border-light-grey hover:border-carbon-grey/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-barlow text-lg font-bold text-technical-grey">
                    {spec.number}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-slots-black text-electric-lime flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sora text-sm sm:text-base font-bold uppercase text-slots-black tracking-tight mb-2">
                  {spec.title}
                </h3>

                <p className="font-inter text-xs sm:text-sm text-carbon-grey leading-relaxed">
                  {spec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

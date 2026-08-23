import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SPECIALIZATION_ITEMS } from "@/data/about";

export function OurSpecialization() {
  return (
    <section
      id="specialization"
      className="w-full bg-slots-white py-16 sm:py-20 md:py-24 border-b border-light-grey"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-grey/80 border border-carbon-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-slots-black mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
              <span>PRODUCT SPECIALIZATION</span>
            </div>

            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slots-black leading-[1.12]">
              OUR SPECIALIZATION
            </h2>

            <p className="font-inter text-sm sm:text-base md:text-lg text-carbon-grey mt-3.5 leading-relaxed">
              Targeted expertise in high-demand athletic apparel categories confirmed by verified
              production capabilities and technical craftsmanship.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-sora text-xs md:text-sm font-bold uppercase text-slots-black hover:text-carbon-grey transition-colors group self-start md:self-auto"
          >
            <span>VIEW ALL PRODUCT LINES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Specialization Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIALIZATION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#F8F8F6] border border-light-grey overflow-hidden hover:border-carbon-grey/40 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Product Image Slot */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-carbon-grey">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slots-black/80 via-transparent to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slots-black/80 backdrop-blur-xs text-[11px] font-sora font-bold text-electric-lime border border-light-grey/15 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-barlow text-xs font-bold text-light-grey/80 tracking-widest uppercase block mb-1">
                    {item.number} • {item.category}
                  </span>
                  <h3 className="font-sora text-lg sm:text-xl font-extrabold uppercase text-slots-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-inter text-xs sm:text-sm text-carbon-grey leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="mb-6">
                    <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-slots-black mb-3">
                      Confirmed Product Capabilities
                    </p>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-electric-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-slots-black font-bold" />
                          </div>
                          <span className="font-inter text-xs text-slots-black font-medium leading-tight">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-light-grey">
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-between w-full font-sora text-xs font-bold uppercase text-slots-black group-hover:text-carbon-grey transition-colors"
                  >
                    <span>EXPLORE {item.title.split(" ")[0]} SPECIFICATIONS</span>
                    <ArrowRight className="w-4 h-4 text-slots-black transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

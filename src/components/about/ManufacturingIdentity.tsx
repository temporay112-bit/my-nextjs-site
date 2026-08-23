import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldAlert, CheckCircle, Factory } from "lucide-react";
import { MANUFACTURING_IDENTITY_CONTENT } from "@/data/about";

export function ManufacturingIdentity() {
  const {
    eyebrow,
    headline,
    supportingText,
    locationDetails,
    productionCapabilities,
    galleryImages,
  } = MANUFACTURING_IDENTITY_CONTENT;

  return (
    <section
      id="manufacturing-identity"
      className="w-full bg-slots-black text-slots-white py-16 sm:py-20 md:py-24 border-b border-carbon-grey/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.12]">
            {headline}
          </h2>

          <p className="font-inter text-sm sm:text-base md:text-lg text-technical-grey mt-3.5 leading-relaxed">
            {supportingText}
          </p>
        </div>

        {/* Sialkot Manufacturing Hub Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-graphite border border-carbon-grey/80 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-sora font-bold uppercase tracking-wider text-electric-lime mb-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {locationDetails.city}, {locationDetails.region}, {locationDetails.country}
                </span>
              </div>

              <h3 className="font-sora text-xl sm:text-2xl font-bold uppercase text-slots-white mb-2">
                {locationDetails.hubTitle}
              </h3>

              <p className="font-inter text-xs sm:text-sm text-light-grey/80 leading-relaxed max-w-3xl">
                {locationDetails.hubDescription}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-carbon-grey/80 border border-light-grey/10">
                <Factory className="w-4 h-4 text-electric-lime shrink-0" />
                <span className="font-inter text-xs font-semibold text-slots-white">
                  Direct Factory Floor Operation
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-carbon-grey/80 border border-light-grey/10">
                <CheckCircle className="w-4 h-4 text-electric-lime shrink-0" />
                <span className="font-inter text-xs font-semibold text-slots-white">
                  Chamber of Commerce Registered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Production Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {productionCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl bg-carbon-grey/40 border border-carbon-grey/80 hover:border-light-grey/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slots-black border border-light-grey/10 flex items-center justify-center font-barlow text-sm font-bold text-electric-lime mb-4">
                0{idx + 1}
              </div>
              <h4 className="font-sora text-sm sm:text-base font-bold uppercase text-slots-white tracking-tight mb-2">
                {cap.title}
              </h4>
              <p className="font-inter text-xs sm:text-sm text-technical-grey leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* Authentic Factory Proof Gallery (6 Real Steps) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-sora text-xs uppercase tracking-widest-brand text-electric-lime font-bold mb-1">
                AUTHENTIC EVIDENCE
              </p>
              <h3 className="font-sora text-xl sm:text-2xl font-bold uppercase text-slots-white">
                In-House Production Flow
              </h3>
            </div>

            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-2 font-sora text-xs md:text-sm font-bold uppercase text-electric-lime hover:text-slots-white transition-colors group"
            >
              <span>EXPLORE FULL MANUFACTURING PROCESS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-xl overflow-hidden bg-graphite border border-carbon-grey/80 hover:border-electric-lime/40 transition-all duration-300"
              >
                <div className="relative w-full h-52 sm:h-56 overflow-hidden">
                  <Image
                    src={img.image}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slots-black/90 via-slots-black/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slots-black/85 backdrop-blur-xs text-[10px] font-sora font-bold text-electric-lime border border-light-grey/15 uppercase tracking-wider">
                      {img.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-barlow text-[11px] font-bold text-technical-grey tracking-widest uppercase block">
                      {img.stage}
                    </span>
                    <h4 className="font-sora text-sm font-bold uppercase text-slots-white tracking-tight">
                      {img.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

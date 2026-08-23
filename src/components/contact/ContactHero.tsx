import React from "react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2, MessageSquareText } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative w-full bg-slots-black text-slots-white py-16 sm:py-20 lg:py-24 border-b border-carbon-grey/40 overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/factory/facility-main.jpg"
          alt="SLOTS SPORTSWEAR Sialkot export facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slots-black via-slots-black/90 to-slots-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-carbon-grey/80 border border-light-grey/15 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-6 shadow-sm backdrop-blur-md">
            <MessageSquareText className="w-4 h-4 text-electric-lime" />
            <span>GET IN TOUCH</span>
          </div>

          {/* Primary H1 Headline */}
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.1] text-slots-white">
            START YOUR <br />
            <span className="text-electric-lime">PROJECT.</span>
          </h1>

          {/* Description */}
          <p className="font-inter text-base sm:text-lg md:text-xl text-light-grey/90 mt-5 leading-relaxed max-w-2xl">
            Connect directly with our Sialkot sportswear manufacturing facility. Submit your technical specifications, request a formal bulk quotation, or discuss OEM &amp; private-label production.
          </p>

          {/* Quick Value Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-carbon-grey/60">
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <CheckCircle2 className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <ShieldCheck className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>NDA Protected</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <CheckCircle2 className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>Direct Factory Rates</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-light-grey">
              <CheckCircle2 className="w-4 h-4 text-electric-lime flex-shrink-0" />
              <span>Worldwide Shipping</span>
            </div>
          </div>

          {/* CTA Link to Form */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="#quote"
              className="font-extrabold shadow-lg hover:shadow-cta-glow inline-flex items-center gap-2"
            >
              <span>SUBMIT TECH PACK &amp; QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

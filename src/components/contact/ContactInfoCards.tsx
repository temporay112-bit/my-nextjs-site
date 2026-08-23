import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ContactInfoCards() {
  return (
    <section
      id="contact-info"
      aria-label="Direct B2B Contact Channels"
      className="relative w-full bg-graphite text-slots-white py-14 sm:py-16 border-b border-carbon-grey/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="DIRECT COMMUNICATION"
          headline="VERIFIED FACTORY CHANNELS"
          supportingText="Reach out directly to our commercial merchandising team in Sialkot for rapid assistance with custom sportswear inquiries."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {/* Card 1: Email */}
          <div className="group relative flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-electric-lime/40 transition-all duration-300 p-6 shadow-md">
            <div>
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 stroke-[2]" />
              </div>
              <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey">
                Business Email
              </p>
              <h3 className="font-sora text-base font-bold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors mt-1">
                Quotations &amp; Tech Packs
              </h3>
              <a
                href="mailto:shahrangujjar00@gmail.com"
                className="font-inter text-xs sm:text-sm text-electric-lime font-semibold block mt-2 hover:underline break-all"
              >
                shahrangujjar00@gmail.com
              </a>
              <a
                href="mailto:info@slotssportswear.com"
                className="font-inter text-xs text-light-grey/80 block mt-1 hover:underline break-all"
              >
                info@slotssportswear.com
              </a>
            </div>
            <div className="mt-6 pt-3 border-t border-carbon-grey/40 text-[11px] font-inter text-technical-grey">
              24-hour formal response
            </div>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="group relative flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-electric-lime/40 transition-all duration-300 p-6 shadow-md">
            <div>
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 stroke-[2]" />
              </div>
              <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey">
                Phone / WhatsApp
              </p>
              <h3 className="font-sora text-base font-bold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors mt-1">
                Instant B2B Support
              </h3>
              <a
                href="https://wa.me/923157847080"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs sm:text-sm text-electric-lime font-semibold block mt-2 hover:underline"
              >
                +92 315 7847080
              </a>
              <span className="font-inter text-xs text-light-grey/80 block mt-1">
                Direct WhatsApp Quotations
              </span>
            </div>
            <div className="mt-6 pt-3 border-t border-carbon-grey/40 text-[11px] font-inter text-technical-grey">
              Instant messaging ready
            </div>
          </div>

          {/* Card 3: Factory Location */}
          <div className="group relative flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-electric-lime/40 transition-all duration-300 p-6 shadow-md">
            <div>
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey">
                Factory Address
              </p>
              <h3 className="font-sora text-base font-bold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors mt-1">
                Export Manufacturing Hub
              </h3>
              <p className="font-inter text-xs sm:text-sm text-light-grey/90 mt-2 leading-relaxed">
                Small Industrial Estate, Sialkot 51310, Punjab, Pakistan
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-carbon-grey/40 text-[11px] font-inter text-technical-grey flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-electric-lime" />
              <span>Verified SCCI &amp; FBR Registered</span>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className="group relative flex flex-col justify-between rounded-2xl bg-slots-black border border-carbon-grey/60 hover:border-electric-lime/40 transition-all duration-300 p-6 shadow-md">
            <div>
              <div className="w-10 h-10 rounded-xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey">
                Working Hours
              </p>
              <h3 className="font-sora text-base font-bold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors mt-1">
                Factory Schedule
              </h3>
              <p className="font-inter text-xs sm:text-sm text-light-grey/90 mt-2">
                Monday – Saturday<br />
                8:00 AM – 6:00 PM PKT (UTC+5)
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-carbon-grey/40 text-[11px] font-inter text-technical-grey">
              Global Timezone Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

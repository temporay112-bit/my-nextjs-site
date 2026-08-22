import React from "react";
import Image from "next/image";
import { PAYMENT_METHODS, PAYMENT_FEATURE_CARDS, PAYMENT_ADVISORY } from "@/data/payments";
import { Shield, Globe, Lock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodsProps {
  className?: string;
}

/**
 * PaymentMethods — TASK 11: PAYMENT METHODS (Light Theme Redesign)
 *
 * Design Specifications:
 * - Section Background: Soft off-white / light grey (#F5F5F3).
 * - Top Badge: Pill shape with #2563EB blue background, white text: "• SECURE B2B TRANSACTIONS •".
 * - Heading: "PAYMENT METHODS" (#171717 Sora 800 uppercase).
 * - Subtitle: #4B5563 Inter.
 * - Single Horizontal Row: Exactly 4 payment logos (Bank Transfer, Remitly, Venmo, MoneyGram) with uppercase labels (#374151).
 * - 4 Bottom Feature Cards: White background (#FFFFFF), #D9DEE7 border, 16px radius, #17324D titles, #4B5563 descriptions.
 * - Feature Icons: Shield, Globe, Lock, Info in #2563EB blue with #EFF6FF background & #BFDBFE border.
 * - Retains exact approved descriptions and titles verbatim.
 */
export function PaymentMethods({ className }: PaymentMethodsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-5 h-5 text-[#2563EB]" strokeWidth={2} aria-hidden="true" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-[#2563EB]" strokeWidth={2} aria-hidden="true" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-[#2563EB]" strokeWidth={2} aria-hidden="true" />;
      case "Info":
      default:
        return <Info className="w-5 h-5 text-[#2563EB]" strokeWidth={2} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="payment"
      aria-label="Accepted Payment Methods for B2B Orders"
      className={cn(
        "relative w-full bg-[#F5F5F3] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Top Blue Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#2563EB] text-[#FFFFFF] text-[11px] sm:text-xs font-sora font-bold tracking-widest uppercase mb-4 shadow-sm">
            &bull; SECURE B2B TRANSACTIONS &bull;
          </div>

          {/* Main Title */}
          <h2 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#171717]">
            PAYMENT METHODS
          </h2>

          {/* Description */}
          <p className="font-inter text-sm sm:text-base text-[#4B5563] mt-3 sm:mt-4 leading-relaxed">
            Flexible payment options for approved international B2B manufacturing orders. Specific terms are confirmed at the time of order placement.
          </p>
        </div>

        {/* Four-Logo Horizontal Presentation (Desktop: 4 columns, Mobile: 2x2 grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center justify-items-center mb-14 sm:mb-16 pb-12 border-b border-[#D9DEE7]">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              className="flex flex-col items-center justify-center w-full group"
            >
              {/* Logo Container without dark card wrapper */}
              <div className="h-14 sm:h-16 md:h-18 lg:h-20 w-full max-w-[200px] flex items-center justify-center relative transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={method.logo}
                  alt={method.altText}
                  width={180}
                  height={65}
                  className="max-h-full max-w-full w-auto h-auto object-contain"
                />
              </div>

              {/* Logo Label */}
              <span className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#374151] mt-3 text-center">
                {method.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Feature Cards (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PAYMENT_FEATURE_CARDS.map((card) => (
            <div
              key={card.id}
              className="p-5 sm:p-6 rounded-[16px] bg-[#FFFFFF] border border-[#D9DEE7] shadow-sm flex flex-col items-start gap-3.5 transition-all duration-200 hover:shadow-md hover:border-[#BFDBFE]"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                {getIcon(card.iconName)}
              </div>

              {/* Card Text Content */}
              <div>
                <h3 className="font-sora text-sm sm:text-base font-bold text-[#17324D] tracking-tight">
                  {card.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-1.5">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Note */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#D9DEE7] flex items-start gap-3 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <p className="font-inter text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            <strong className="font-semibold text-[#17324D]">{PAYMENT_ADVISORY.label}: </strong>
            {PAYMENT_ADVISORY.text}
          </p>
        </div>

      </div>
    </section>
  );
}

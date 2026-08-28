import React from "react";
import { VERIFIED_SHIPPING_OPTIONS } from "@/data/shipping";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Clock, ShieldCheck, CheckCircle2, AlertCircle, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShippingMethodsProps {
  className?: string;
}

/**
 * ShippingMethods — TASK 10: SHIPPING METHODS (AGREEMENT UPDATE)
 *
 * Sourced directly from verified SHIPPINGS TERMS & CUSTOMS DUTY AGREEMENT:
 * - Option 01: DDP CARGO SERVICE (All Costs Included / 8-10 business days / Exporter paid)
 * - Option 02: EXPRESS SHIPPING VIA DHL (4-6 business days / Client paid duties at delivery)
 */
export function ShippingMethods({ className }: ShippingMethodsProps) {
  const publishedOptions = VERIFIED_SHIPPING_OPTIONS.filter((o) => o.isPublished);

  return (
    <section
      id="shipping"
      aria-label="International Shipping Options & Agreement Terms"
      className={cn(
        "relative w-full bg-[#FFFFFF] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="GLOBAL LOGISTICS"
          headline="SHIPPING METHODS"
          supportingText="Choose the verified shipping option that best fits your order requirements and delivery schedule."
          align="center"
          theme="light"
          className="mb-8 sm:mb-12"
        />

        {/* 2 Verified Shipping Option Detail Cards */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {publishedOptions.map((option) => {
            const isDDP = option.id === "ddp-cargo";

            return (
              <div
                key={option.id}
                className={cn(
                  "relative flex flex-col justify-between p-7 sm:p-9 rounded-2xl border transition-all duration-300 hover:shadow-xl",
                  isDDP
                    ? "bg-light-grey/30 border-slots-black/20 hover:border-slots-black"
                    : "bg-light-grey/30 border-light-grey hover:border-slots-black/30"
                )}
              >
                <div>
                  {/* Top Badge & Option Identifier */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-slots-black text-electric-lime font-sora font-extrabold text-sm flex items-center justify-center">
                        {option.optionNumber}
                      </span>
                      <span className="font-sora text-xs font-bold text-slots-black uppercase tracking-wider">
                        {option.headline}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "font-sora text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                        isDDP
                          ? "bg-slots-black text-electric-lime"
                          : "bg-slots-black/10 text-slots-black border border-slots-black/20"
                      )}
                    >
                      {option.badge}
                    </span>
                  </div>

                  {/* Option Title */}
                  <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slots-black">
                    {option.title}
                  </h3>

                  <p className="font-inter text-xs sm:text-sm text-carbon-grey mt-2 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Technical Terms Grid */}
                  <div className="mt-6 pt-5 border-t border-light-grey space-y-3.5">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-slots-black shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sora text-xs font-bold text-slots-black uppercase tracking-wide">
                          Delivery Timeline
                        </p>
                        <p className="font-inter text-xs text-carbon-grey">
                          {option.deliveryTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {isDDP ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-sora text-xs font-bold text-slots-black uppercase tracking-wide">
                          Duties &amp; Taxes
                        </p>
                        <p className="font-inter text-xs text-carbon-grey">
                          {option.dutiesTaxes} ({option.responsibility})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-technical-grey shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sora text-xs font-bold text-slots-black uppercase tracking-wide">
                          Customs &amp; Delivery Fee Policy
                        </p>
                        <p className="font-inter text-xs text-technical-grey leading-relaxed">
                          {option.additionalChargesText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlight Strip */}
                <div className="mt-6 pt-4 border-t border-light-grey flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slots-black" />
                    <span className="font-sora text-xs font-bold uppercase tracking-wider text-slots-black">
                      {option.highlight}
                    </span>
                  </div>
                  <span className="font-inter text-[11px] text-technical-grey">
                    Agreement Sourced
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory / Logistics Governance Note */}
        <div className="mt-10 p-4 rounded-xl bg-light-grey/50 border border-light-grey flex items-start gap-3 text-left">
          <Globe className="w-5 h-5 text-slots-black shrink-0 mt-0.5" />
          <p className="font-inter text-xs text-technical-grey leading-relaxed">
            <span className="font-semibold text-slots-black">Logistics Note: </span>
            Shipping terms and delivery timelines may vary based on destination country, order volume, customs inspection conditions, and the final bilateral shipment agreement.
          </p>
        </div>
      </div>
    </section>
  );
}

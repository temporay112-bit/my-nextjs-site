import React from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ShieldCheck, Mail, MapPin, CheckCircle2, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteSectionProps {
  className?: string;
}

export function QuoteSection({ className }: QuoteSectionProps) {
  return (
    <section
      id="quote"
      aria-label="Request a Manufacturing Quote"
      className={cn(
        "relative w-full bg-slots-black text-slots-white py-14 sm:py-16 lg:py-16 border-b border-carbon-grey/40 overflow-hidden",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: B2B Messaging & Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite border border-light-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-4 sm:mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
                <span>START YOUR PROJECT</span>
              </div>

              {/* Semantic H2 Headline */}
              <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slots-white leading-[1.1]">
                LET&apos;S BUILD YOUR NEXT PRODUCT.
              </h2>

              {/* Supporting Lead Copy */}
              <p className="font-inter text-sm sm:text-base text-light-grey/90 mt-4 leading-relaxed">
                Connect directly with our Sialkot manufacturing team. Submit your project requirements, target quantities, or upload your tech pack for a fast, structured B2B quotation.
              </p>

              {/* B2B Buyer Assurances */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-carbon-grey/40">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-sora text-xs font-bold uppercase tracking-wider text-slots-white">
                      Direct Factory Pricing &amp; Support
                    </h3>
                    <p className="font-inter text-xs text-technical-grey mt-0.5">
                      Work directly with our production facility in Sialkot without broker markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-sora text-xs font-bold uppercase tracking-wider text-slots-white">
                      Tech Pack &amp; Sample Development
                    </h3>
                    <p className="font-inter text-xs text-technical-grey mt-0.5">
                      Upload PDF, AI, PSD or ZIP files for rapid specification &amp; pattern review.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-sora text-xs font-bold uppercase tracking-wider text-slots-white">
                      Rapid B2B Response
                    </h3>
                    <p className="font-inter text-xs text-technical-grey mt-0.5">
                      Our commercial team reviews all inquiries promptly during working hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-sora text-xs font-bold uppercase tracking-wider text-slots-white">
                      NDA &amp; Private Label Confidentiality
                    </h3>
                    <p className="font-inter text-xs text-technical-grey mt-0.5">
                      Your proprietary garment designs and branding assets remain 100% protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="mt-8 p-5 rounded-2xl bg-graphite/80 border border-carbon-grey/60">
              <p className="font-sora text-xs font-bold uppercase tracking-wider text-electric-lime mb-3">
                Direct Contact Channels
              </p>
              <div className="space-y-2.5 text-xs font-inter text-light-grey/90">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-electric-lime/80" />
                  <span>info@slotssportswear.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-electric-lime/80" />
                  <span>Sialkot, Punjab, Pakistan (Export Manufacturing Hub)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form (7 cols) */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

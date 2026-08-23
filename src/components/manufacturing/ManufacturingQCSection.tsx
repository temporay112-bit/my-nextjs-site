import React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShieldCheck, CheckCircle2, Search, Ruler, Layers, AlertCircle, PackageCheck } from "lucide-react";

export interface QCStageItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  checkpoints: string[];
}

const QC_STAGES: QCStageItem[] = [
  {
    number: "01",
    title: "RAW MATERIAL & FABRIC AUDIT",
    subtitle: "Incoming Material Control",
    description: "Systematic fabric roll testing, GSM weight verification, shrinkage evaluation, and colorfastness audits prior to production release.",
    checkpoints: ["GSM Weight & Blend Audit", "Color Shade & Dye Lot Match", "Shrinkage & Torque Test"],
  },
  {
    number: "02",
    title: "PRE-PRODUCTION SAMPLE APPROVAL",
    subtitle: "Pattern & Fit Verification",
    description: "Detailed measurement alignment against buyer tech pack specifications, pattern grading verification, and pre-production sample sign-off.",
    checkpoints: ["CAD Measurement Check", "Size Grading Verification", "Pre-Production Fit Sample"],
  },
  {
    number: "03",
    title: "IN-LINE SEWING & ASSEMBLY QC",
    subtitle: "Workmanship & Seam Inspection",
    description: "Real-time assembly line monitoring, stitch density (SPI) checks, flatlock seam strength testing, and alignment audits.",
    checkpoints: ["Stitch Per Inch (SPI) Audit", "Seam Pull & Tensile Strength", "Alignment & Trim Placement"],
  },
  {
    number: "04",
    title: "100% MEASUREMENT & WORKMANSHIP AUDIT",
    subtitle: "Finished Garment Audit",
    description: "Comprehensive individual garment inspection for dimensional accuracy, loose thread trimming, seam cleanliness, and visual aesthetics.",
    checkpoints: ["100% Dimension Audit", "Loose Thread Trimming", "Aesthetic & Symmetry Inspection"],
  },
  {
    number: "05",
    title: "NEEDLE DETECTION & PRE-SHIPMENT AUDIT",
    subtitle: "Export Security & Packaging QC",
    description: "High-sensitivity metal detection scanning, polybag barcode verification, carton packaging inspection, and final AQL 2.5 export clearance.",
    checkpoints: ["Metal & Needle Scan", "Polybag Barcode Verification", "AQL 2.5 Export Clearance"],
  },
];

export function ManufacturingQCSection() {
  return (
    <section
      id="quality-control"
      aria-label="QUALITY CONTROL STANDARDS"
      className="relative w-full bg-slots-black text-slots-white py-16 sm:py-20 border-b border-carbon-grey/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="MULTI-STAGE QC AUDIT"
          headline="QUALITY CONTROL"
          supportingText="Every sportswear order undergoes systematic multi-stage quality control checks to ensure strict compliance with international B2B buyer specifications."
          align="center"
          theme="dark"
        />

        {/* 5-Stage QC Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {QC_STAGES.map((stage) => (
            <div
              key={stage.number}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-graphite border border-carbon-grey/60 hover:border-light-grey/30 transition-all duration-300 p-6 shadow-md"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40">
                  <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-2.5 py-1 rounded-full bg-slots-black/60 border border-light-grey/10">
                    STAGE {stage.number}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-electric-lime" />
                </div>

                <p className="font-sora text-[11px] font-bold uppercase tracking-wider text-technical-grey mt-4">
                  {stage.subtitle}
                </p>
                <h3 className="font-sora text-base sm:text-lg font-extrabold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors duration-200 mt-1">
                  {stage.title}
                </h3>
                <p className="font-inter text-xs sm:text-[13px] text-light-grey/80 mt-2.5 leading-relaxed">
                  {stage.description}
                </p>

                {/* Checkpoint Bullets */}
                <div className="mt-5 space-y-2 pt-4 border-t border-carbon-grey/30">
                  {stage.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-inter text-light-grey">
                      <CheckCircle2 className="w-3.5 h-3.5 text-electric-lime flex-shrink-0" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="mt-6 pt-3 border-t border-carbon-grey/30 flex items-center justify-between text-[11px] font-sora text-technical-grey">
                <span>ISO 9001 Compliant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
              </div>
            </div>
          ))}

          {/* Quality Summary Feature Box */}
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-carbon-grey to-graphite border border-electric-lime/40 p-6 shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-lime text-slots-black font-sora text-xs font-extrabold uppercase tracking-wider mb-4">
                <PackageCheck className="w-4 h-4" />
                <span>AQL 2.5 STANDARD</span>
              </div>
              <h3 className="font-sora text-lg sm:text-xl font-extrabold uppercase text-slots-white tracking-tight">
                INTERNATIONAL EXPORT COMPLIANCE
              </h3>
              <p className="font-inter text-xs sm:text-sm text-light-grey/90 mt-3 leading-relaxed">
                All production batches adhere to Acceptable Quality Limit (AQL 2.5) sampling standards for major apparel export markets across Europe, North America, and Australasia.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-light-grey/20 flex items-center gap-2 text-xs font-sora text-electric-lime font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Tolerance Defect Thresholds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

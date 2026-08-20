export interface FactoryProofItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
}

export const FACTORY_FEATURED_PROOF = {
  id: "main-facility",
  title: "SIALKOT APPAREL PRODUCTION FACILITY",
  eyebrow: "EXPORT MANUFACTURING HUB",
  badge: "AUTHENTIC FACILITY PROOF",
  description:
    "Dedicated sportswear and activewear manufacturing lines operating with systematic quality inspection and structured export workflows in Sialkot, Pakistan.",
  image: "/images/factory/facility-main.jpg",
  alt: "SLOTS SPORTSWEAR manufacturing facility floor and sportswear production lines",
  tags: [
    "Sialkot Export Hub",
    "Multi-Stage QC",
    "OEM & ODM Lines",
    "Worldwide Export",
  ],
};

export const FACTORY_PROOF_ITEMS: FactoryProofItem[] = [
  {
    id: "fabric-inspection",
    number: "01",
    title: "FABRIC & MATERIAL INSPECTION",
    category: "Material Preparation",
    description:
      "Systematic fabric roll testing, GSM verification, colorfastness checks, and trim matching prior to production line release.",
    image: "/images/factory/inspection.jpg",
    alt: "SLOTS SPORTSWEAR fabric inspection and material preparation",
    badge: "INCOMING QC",
  },
  {
    id: "precision-cutting",
    number: "02",
    title: "PRECISION GARMENT CUTTING",
    category: "Panel Preparation",
    description:
      "Accurate multi-layer fabric panel cutting following approved sizing grading, tech pack dimensions, and pattern markers.",
    image: "/images/factory/cutting.jpg",
    alt: "SLOTS SPORTSWEAR fabric cutting and garment panel preparation",
    badge: "ACCURACY CHECK",
  },
  {
    id: "sewing-assembly",
    number: "03",
    title: "SEWING & GARMENT ASSEMBLY",
    category: "Assembly Lines",
    description:
      "Crafted assembly with specialized flatlock, overlock, and twin-needle stitching for durable athletic performance.",
    image: "/images/factory/sewing.jpg",
    alt: "SLOTS SPORTSWEAR garment sewing and athletic apparel assembly",
    badge: "CRAFTSMANSHIP",
  },
  {
    id: "branding-customization",
    number: "04",
    title: "BRANDING & CUSTOMIZATION",
    category: "Decoration & Details",
    description:
      "High-density embroidery, heat transfer, screen printing, and private-label woven neck tags applied to client specifications.",
    image: "/images/factory/branding.jpg",
    alt: "SLOTS SPORTSWEAR custom embroidery, branding, and private-label finishing",
    badge: "PRIVATE LABEL",
  },
  {
    id: "quality-control",
    number: "05",
    title: "QUALITY CONTROL & TESTING",
    category: "Inline & Final Inspection",
    description:
      "Stringent measurement audits, seam strength evaluation, and comprehensive aesthetic review before packaging handover.",
    image: "/images/factory/qc.jpg",
    alt: "SLOTS SPORTSWEAR quality control inspection and measurement verification",
    badge: "100% INSPECTED",
  },
  {
    id: "finishing-packing",
    number: "06",
    title: "FINISHING & EXPORT PACKING",
    category: "Export Preparation",
    description:
      "Final pressing, individual polybag packing, barcode carton labeling, and export freight preparation for international delivery.",
    image: "/images/factory/packing.jpg",
    alt: "SLOTS SPORTSWEAR garment packing, carton packaging, and export preparation",
    badge: "GLOBAL EXPORT",
  },
];

export const FACTORY_SECTION_CONTENT = {
  eyebrow: "MANUFACTURING PROOF",
  headline: "BUILT TO PRODUCE.",
  supportingText:
    "Explore our authentic manufacturing workflow and production craftsmanship engineered for international B2B sportswear brands.",
  trustHighlights: [
    { label: "Sialkot Manufacturing Hub", value: "Verified Facility" },
    { label: "Quality Control", value: "Multi-Stage Inspection" },
    { label: "Production Models", value: "OEM / ODM / Private Label" },
    { label: "Global Reach", value: "Worldwide B2B Export" },
  ],
};

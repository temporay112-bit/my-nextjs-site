export interface CustomizationOption {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  icon:
    | "Palette"
    | "Layers"
    | "Droplets"
    | "Ruler"
    | "Sparkles"
    | "Printer"
    | "Tags"
    | "FileText"
    | "PackageCheck"
    | "ShieldCheck";
  deliverables: string[];
}

export const CUSTOMIZATION_HERO_CONTENT = {
  eyebrow: "CUSTOMIZATION",
  headline: "BUILT AROUND YOUR BRAND.",
  supportingText:
    "Elevate your sportswear collection with complete private-label branding, bespoke material selection, precision embellishment, and custom garment finishing engineered for international apparel brands.",
  primaryCta: {
    label: "DISCUSS YOUR CUSTOM PROJECT",
    href: "/contact#quote",
  },
  secondaryCta: {
    label: "EXPLORE OPTIONS",
    href: "#customization-options",
  },
  trustHighlights: [
    {
      title: "Bespoke Product Design",
      description: "Custom silhouettes, cut & sew grading, and CAD development",
    },
    {
      title: "High-Definition Embellishment",
      description: "3D embroidery, heat-transfer silicone & screen printing",
    },
    {
      title: "Private Label Finishing",
      description: "Woven neck tags, hang tags, polybags & retail packing",
    },
  ],
};

export const CUSTOMIZATION_OPTIONS: CustomizationOption[] = [
  {
    id: "custom-product-design",
    number: "01",
    title: "Custom Product Design",
    category: "Design & Silhouettes",
    description:
      "Tailored apparel silhouettes, CAD pattern drafting, and bespoke athletic garment design developed to buyer specifications.",
    icon: "Palette",
    deliverables: [
      "Custom silhouette & pattern development",
      "CAD technical design review",
      "Tailored garment cut & seam engineering",
      "Design adaptation for bulk production",
    ],
  },
  {
    id: "fabric-selection",
    number: "02",
    title: "Fabric Selection",
    category: "Materials & Composition",
    description:
      "Sourcing and composition matching of premium performance knits, wovens, moisture-wicking synthetic blends, and GSM weights.",
    icon: "Layers",
    deliverables: [
      "Technical performance knits & wovens",
      "Moisture-wicking & 4-way stretch fabrics",
      "GSM weight & density verification",
      "Breathable mesh & stretch panel options",
    ],
  },
  {
    id: "colors",
    number: "03",
    title: "Colors",
    category: "Dyeing & Palette",
    description:
      "Custom Pantone color matching, lab-dip dye lot approvals, contrast panel color blocking, and colorfast fabric dyeing.",
    icon: "Droplets",
    deliverables: [
      "Pantone (TPX/TCX) color matching",
      "Lab-dip sample approvals",
      "High-contrast panel color combinations",
      "Wash & light colorfastness testing",
    ],
  },
  {
    id: "custom-fit-specifications",
    number: "04",
    title: "Custom Fit / Specifications",
    category: "Sizing & Grading",
    description:
      "Bespoke measurement sizing charts, athletic fit grading, custom sleeve/body lengths, and ergonomic sportswear proportions.",
    icon: "Ruler",
    deliverables: [
      "Bespoke brand measurement charts",
      "Athletic & compression fit grading",
      "Custom inseam, body & sleeve lengths",
      "Ergonomic movement paneling",
    ],
  },
  {
    id: "embroidery",
    number: "05",
    title: "Embroidery",
    category: "Stitch Embellishment",
    description:
      "High-density 3D puff embroidery, flat crest stitching, custom direct-to-garment embroidered badges, and sleeve logo placement.",
    icon: "Sparkles",
    deliverables: [
      "High-density 3D puff embroidery",
      "Flat logo & crest stitching",
      "Custom embroidered sleeve & chest badges",
      "Thread color matching to Pantone specs",
    ],
  },
  {
    id: "printing",
    number: "06",
    title: "Printing",
    category: "Graphic Embellishment",
    description:
      "Durable screen printing, heat-transfer silicone and TPU raised logos, all-over sublimation printing, and reflective vinyl branding.",
    icon: "Printer",
    deliverables: [
      "High-density silicone & TPU heat transfers",
      "Durable plastisol & water-based screen printing",
      "All-over digital sublimation graphics",
      "High-visibility reflective print accents",
    ],
  },
  {
    id: "custom-labels",
    number: "07",
    title: "Custom Labels",
    category: "Brand Tagging",
    description:
      "Woven neck labels, satin care & content tags, tagless heat-seal size transfers, and custom hem brand tabs.",
    icon: "Tags",
    deliverables: [
      "High-definition woven neck labels",
      "Printed satin care & content tags",
      "Tagless neck heat-transfer size labels",
      "Custom hem tabs & seam brand labels",
    ],
  },
  {
    id: "hang-tags",
    number: "08",
    title: "Hang Tags",
    category: "Retail Branding",
    description:
      "Embossed cardstock hang tags, custom die-cut tags, barcode sticker placement, and branded string/cord attachments.",
    icon: "FileText",
    deliverables: [
      "Custom cardstock & coated paper hang tags",
      "Embossed, debossed & foil-stamped logos",
      "UPC/EAN barcode & SKU sticker application",
      "Branded cord & plastic lock attachments",
    ],
  },
  {
    id: "packaging",
    number: "09",
    title: "Packaging",
    category: "Product Protection",
    description:
      "Customized printed polybags, size-labeled individual packaging, branded master cartons, and export shipping preparation.",
    icon: "PackageCheck",
    deliverables: [
      "Self-seal individual polybags with size stickers",
      "Custom logo printed polybags",
      "Master carton labeling & weight tagging",
      "Clean fold & protective export packing",
    ],
  },
  {
    id: "private-label-finishing",
    number: "10",
    title: "Private Label Finishing",
    category: "Retail Readiness",
    description:
      "Complete retail-ready garment preparation including thread trimming, industrial steam pressing, quality audits, and final export packing.",
    icon: "ShieldCheck",
    deliverables: [
      "Detailed thread trimming & cleaning",
      "Industrial steam pressing & shape setting",
      "100% final pre-packing quality audit",
      "Retail-ready packaging handover",
    ],
  },
];

export interface BrandingTechnique {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  features: string[];
}

export const BRANDING_TECHNIQUES: BrandingTechnique[] = [
  {
    id: "embroidery-tech",
    title: "EMBROIDERY & 3D PUFF STITCHING",
    subtitle: "Premium Textured Branding",
    description:
      "Precision direct-to-garment embroidery featuring high-density 3D puff stitching and flat detailed crests designed for chest, sleeve, collar, and cap placements.",
    badge: "3D & FLAT STITCHING",
    features: [
      "High-density 3D puff embroidery",
      "Flat crest & logo stitching",
      "Pantone thread color matching",
      "Durable wash-resistant construction",
    ],
  },
  {
    id: "printing-tech",
    title: "HEAT TRANSFER & SILICONE LOGOS",
    subtitle: "Modern Performance Decoration",
    description:
      "Flexible silicone heat transfers, matte TPU raised badges, and high-contrast screen printing engineered for athletic performance fabrics and compression garments.",
    badge: "SILICONE & HEAT SEAL",
    features: [
      "Raised silicone & TPU badges",
      "Tagless neck heat transfers",
      "Screen printing & all-over sublimation",
      "Reflective vinyl safety accents",
    ],
  },
  {
    id: "tagging-tech",
    title: "WOVEN LABELS & CUSTOM TAGS",
    subtitle: "Complete Brand Ownership",
    description:
      "Custom high-definition woven neck labels, care instruction tags, and embossed cardstock hang tags that establish authentic brand ownership across your entire product line.",
    badge: "WOVEN & CARDSTOCK",
    features: [
      "Woven damask neck labels",
      "Satin wash & care instruction tags",
      "Embossed hang tags with cord loops",
      "Barcode & SKU sticker integration",
    ],
  },
];

export const PRIVATE_LABEL_FINISHING = {
  eyebrow: "PRIVATE LABEL FINISHING",
  headline: "RETAIL-READY GARMENT PRESENTATION.",
  supportingText:
    "We provide complete private-label finishing services to ensure your sportswear arrives fully branded, inspected, folded, and packaged for direct retail or distribution.",
  features: [
    {
      title: "Woven Neck & Care Labels",
      description: "Custom woven damask labels and satin care tags sewn cleanly into collar and side seams.",
    },
    {
      title: "Branded Hang Tags & Barcodes",
      description: "Custom die-cut cardstock tags attached with branded cords, complete with barcode stickers.",
    },
    {
      title: "Custom Polybag Packaging",
      description: "Individual clear or printed self-seal polybags labeled with garment size and style numbers.",
    },
    {
      title: "Industrial Steam Pressing",
      description: "Final thread trimming and professional steam pressing for immaculate retail presentation.",
    },
  ],
};

export const CUSTOMIZATION_PROCESS_STEPS = [
  {
    number: "01",
    title: "SPECIFICATION & TECH PACK ALIGNMENT",
    description:
      "Review your design concept, tech pack, fabric composition, color pantones, branding placements, and sizing specs.",
    deliverable: "Tech Pack Sign-Off",
  },
  {
    number: "02",
    title: "PROTOTYPE SAMPLING & FIT APPROVAL",
    description:
      "Develop a physical sample prototype with approved fabric, custom labels, and branding for buyer evaluation.",
    deliverable: "Pre-Production Sample",
  },
  {
    number: "03",
    title: "PRODUCTION & EMBELLISHMENT EXECUTION",
    description:
      "Precision cutting, garment sewing, embroidery, heat-transfer branding, and label insertion across bulk production.",
    deliverable: "Bulk Manufacturing",
  },
  {
    number: "04",
    title: "FINAL FINISHING & RETAIL PACKAGING",
    description:
      "Thread trimming, steam pressing, 100% QC inspection, hang tag attachment, polybag sealing, and export packing.",
    deliverable: "Retail-Ready Export",
  },
];

export const CUSTOMIZATION_CTA_CONTENT = {
  eyebrow: "START YOUR CUSTOM PROJECT",
  headline: "READY TO BUILD YOUR CUSTOM COLLECTION?",
  supportingText:
    "Submit your design concept, tech pack, or customization requirements to receive a detailed quotation and production timeline from our Sialkot manufacturing team.",
  ctaLabel: "DISCUSS YOUR CUSTOM PROJECT",
  ctaHref: "/contact#quote",
  secondaryLabel: "VIEW CATALOGUE",
  secondaryHref: "/slots-catalogue.pdf",
};

export interface CapabilityModel {
  id: string;
  number: string;
  title: string;
  fullTitle: string;
  headline: string;
  description: string;
  benefits: string[];
  icon: "FilePenLine" | "Lightbulb" | "Tags";
  href: string;
  ctaLabel: string;
  published: boolean;
}

export const CAPABILITY_MODELS: CapabilityModel[] = [
  {
    id: "oem",
    number: "01",
    title: "OEM",
    fullTitle: "ORIGINAL EQUIPMENT MANUFACTURING",
    headline: "YOUR DESIGN. OUR MANUFACTURING.",
    description:
      "You provide your approved design, specifications or tech pack. SLOTS SPORTSWEAR manufactures the product according to the agreed requirements.",
    benefits: [
      "Buyer-supplied design",
      "Technical specification support",
      "Custom materials and construction",
      "Bulk production",
      "Quality control",
    ],
    icon: "FilePenLine",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
  {
    id: "odm",
    number: "02",
    title: "ODM",
    fullTitle: "ORIGINAL DESIGN MANUFACTURING",
    headline: "FROM CONCEPT TO PRODUCT.",
    description:
      "Use SLOTS SPORTSWEAR product and development capabilities as a starting point for creating customized sportswear for your brand.",
    benefits: [
      "Product development",
      "Design adaptation",
      "Material selection",
      "Sampling",
      "Production",
    ],
    icon: "Lightbulb",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
  {
    id: "private-label",
    number: "03",
    title: "PRIVATE LABEL",
    fullTitle: "YOUR BRAND. YOUR DETAILS.",
    headline: "BUILT FOR YOUR BRAND.",
    description:
      "Add approved brand elements to your garments and packaging so the finished products represent your own label.",
    benefits: [
      "Custom labels",
      "Hang tags",
      "Branding elements",
      "Packaging",
      "Private-label finishing",
    ],
    icon: "Tags",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
];

export const CAPABILITIES_SECTION_CONTENT = {
  eyebrow: "MANUFACTURING SOLUTIONS",
  headline: "YOUR BRAND. OUR MANUFACTURING.",
  supportingText:
    "Choose the production model that fits your project — OEM, ODM or Private Label.",
};

// ==========================================
// DEDICATED CAPABILITIES PAGE DATA
// ==========================================

export const CAPABILITIES_HERO_CONTENT = {
  eyebrow: "OUR CAPABILITIES",
  headline: "CAPABILITY YOU CAN COUNT ON.",
  supportingText:
    "From initial tech pack review and prototype sampling to high-volume manufacturing, custom private labeling, and global export — discover how SLOTS SPORTSWEAR supports international B2B apparel buyers from concept through customized production.",
  primaryCta: {
    label: "DISCUSS YOUR PROJECT",
    href: "/contact#quote",
  },
  secondaryCta: {
    label: "EXPLORE CAPABILITIES",
    href: "#engagement-models",
  },
  trustHighlights: [
    {
      title: "Direct Factory Execution",
      description: "Dedicated sportswear manufacturing lines in Sialkot",
    },
    {
      title: "5-Stage Product Development",
      description: "Tech pack review to approved pre-production sample",
    },
    {
      title: "Multi-Stage Quality Inspection",
      description: "Systematic inline and pre-shipment QC audits",
    },
  ],
};

export interface DetailedCapabilityModel {
  id: string;
  number: string;
  title: string;
  fullTitle: string;
  headline: string;
  summary: string;
  idealFor: string;
  deliverables: string[];
  icon: "FilePenLine" | "Lightbulb" | "Tags";
  badge: string;
  href: string;
  ctaLabel: string;
}

export const DETAILED_CAPABILITY_MODELS: DetailedCapabilityModel[] = [
  {
    id: "oem",
    number: "01",
    title: "OEM",
    fullTitle: "ORIGINAL EQUIPMENT MANUFACTURING",
    headline: "YOUR DESIGN. OUR MANUFACTURING.",
    summary:
      "You provide your approved design, specifications, or tech pack. SLOTS SPORTSWEAR executes precision manufacturing strictly according to your agreed dimensions, material requirements, and grading standards.",
    idealFor:
      "Established apparel brands, sportswear labels, and corporate buyers with existing CAD designs seeking dependable factory execution and high-capacity production.",
    deliverables: [
      "Buyer-supplied CAD & Tech Pack execution",
      "Technical specification & grading review",
      "Custom materials, performance knits & trims",
      "Bulk production with multi-stage quality control",
      "Strict measurement tolerance verification",
    ],
    icon: "FilePenLine",
    badge: "BUYER-SUPPLIED DESIGN",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
  },
  {
    id: "odm",
    number: "02",
    title: "ODM",
    fullTitle: "ORIGINAL DESIGN MANUFACTURING",
    headline: "FROM CONCEPT TO PRODUCT.",
    summary:
      "Use SLOTS SPORTSWEAR product engineering and garment silhouettes as a foundation to develop customized sportswear collections tailored to your brand's unique market positioning.",
    idealFor:
      "Startup apparel brands, sports teams, and golfwear labels looking for design collaboration, technical fabric selection, and rapid prototype development.",
    deliverables: [
      "Collaborative product development & CAD design",
      "Silhouette & cut adaptation for your brand",
      "Performance fabric & material engineering",
      "Pre-production physical prototype sampling",
      "Scalable bulk manufacturing & export readiness",
    ],
    icon: "Lightbulb",
    badge: "CONCEPT-TO-CREATION",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
  },
  {
    id: "private-label",
    number: "03",
    title: "PRIVATE LABEL",
    fullTitle: "YOUR BRAND. YOUR DETAILS.",
    headline: "YOUR BRAND. YOUR DETAILS.",
    summary:
      "Add approved custom brand elements to your garments and packaging so every finished piece arrives fully customized to represent your brand's distinctive identity.",
    idealFor:
      "Brands wanting custom branding, retail-ready finishing, custom tags, branded polybags, and personalized garment trims across their product lines.",
    deliverables: [
      "Custom woven neck labels & care/content tags",
      "Embossed or printed branded hang tags & barcodes",
      "High-density embroidery & silicone heat transfers",
      "Custom branded polybags & master carton packing",
      "Private-label metal hardware, zippers & drawcords",
    ],
    icon: "Tags",
    badge: "100% BRAND CUSTOMIZATION",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
  },
];

export interface ProductDevelopmentItem {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  icon: "FileSearch" | "Scissors" | "Layers" | "Sliders" | "Sparkles";
  deliverables: string[];
}

export const PRODUCT_DEVELOPMENT_ITEMS: ProductDevelopmentItem[] = [
  {
    id: "tech-pack-review",
    stepNumber: "01",
    title: "Tech Pack Review",
    category: "Specification & Engineering",
    description:
      "In-depth engineering review of buyer CAD sketches, measurement tolerances, grading tables, stitch requirements, and bill of materials (BOM) to ensure factory manufacturing feasibility.",
    icon: "FileSearch",
    deliverables: [
      "CAD & tech pack specification audit",
      "Sizing, grading & measurement verification",
      "Bill of materials (BOM) & trim alignment",
      "Production feasibility & seam guidance",
    ],
  },
  {
    id: "sampling",
    stepNumber: "02",
    title: "Sampling",
    category: "Prototyping & Fit",
    description:
      "Creation of physical pre-production sample prototypes for construction review, athletic fit evaluation, and buyer approval before initiating bulk production.",
    icon: "Scissors",
    deliverables: [
      "Pre-production sample prototype development",
      "Athletic fit, drape & comfort evaluation",
      "Garment construction & stitching review",
      "Sample sign-off prior to bulk release",
    ],
  },
  {
    id: "fabric-selection",
    stepNumber: "03",
    title: "Fabric Selection",
    category: "Material & Composition",
    description:
      "Sourcing and coordination of premium athletic fabrics, performance knits, moisture-wicking blends, GSM weight verification, and custom Pantone dye matching.",
    icon: "Layers",
    deliverables: [
      "Technical performance knits & wovens",
      "GSM weight & density validation",
      "Moisture-wicking & 4-way stretch testing",
      "Custom color & Pantone dye matching",
    ],
  },
  {
    id: "customization",
    stepNumber: "04",
    title: "Customization",
    category: "Tailored Construction",
    description:
      "Tailored garment grading, specialized seam construction (flatlock, overlock, twin-needle), contrast paneling, and sport-specific ergonomic cuts.",
    icon: "Sliders",
    deliverables: [
      "Sport-specific ergonomic tailoring",
      "Flatlock & reinforced seam construction",
      "Contrast paneling & breathable mesh inserts",
      "Custom sizing charts & multi-size grading",
    ],
  },
  {
    id: "branding",
    stepNumber: "05",
    title: "Branding",
    category: "Embellishment & Finishing",
    description:
      "Application of precision branding techniques including screen printing, high-density 3D embroidery, heat-transfer silicone, sublimated graphics, and custom packaging.",
    icon: "Sparkles",
    deliverables: [
      "High-density 3D & flat embroidery",
      "Silicone, rubber & TPU heat transfers",
      "Durable screen printing & all-over sublimation",
      "Woven neck labels, hang tags & custom packaging",
    ],
  },
];

export interface QualityControlStage {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  icon: "ShieldCheck" | "ScanLine" | "CheckCircle2" | "Ruler" | "PackageCheck";
  checkpoint: string;
  points: string[];
}

export const QUALITY_CONTROL_ITEMS: QualityControlStage[] = [
  {
    id: "incoming-qc",
    number: "01",
    title: "INCOMING MATERIAL INSPECTION",
    category: "Raw Materials",
    description:
      "Rigorous testing of raw fabric rolls, GSM verification, elasticity checks, colorfastness testing, and trim quality audits before release to the cutting floor.",
    icon: "ShieldCheck",
    checkpoint: "100% Raw Material Audit",
    points: [
      "Fabric roll visual & flaw inspection",
      "GSM weight & composition verification",
      "Colorfastness & wash-shrinkage checks",
      "Zippers, buttons & trim conformity",
    ],
  },
  {
    id: "cutting-qc",
    number: "02",
    title: "PRECISION CUTTING AUDITS",
    category: "Pattern & Panels",
    description:
      "Verification of multi-layer fabric panel cutting against approved tech pack patterns, marker alignment, and size grading tolerances.",
    icon: "ScanLine",
    checkpoint: "Pattern Marker Verification",
    points: [
      "CAD pattern marker alignment",
      "Multi-size grading tolerance checks",
      "Grainline orientation inspection",
      "Cut panel bundling & labeling",
    ],
  },
  {
    id: "inline-qc",
    number: "03",
    title: "INLINE ASSEMBLY & SEWING CHECKS",
    category: "Production Line",
    description:
      "Continuous inline inspection during garment assembly monitoring stitch density, seam tension, flatlock integrity, and symmetry.",
    icon: "CheckCircle2",
    checkpoint: "Real-time Line Inspection",
    points: [
      "Stitches per inch (SPI) consistency",
      "Flatlock & overlock seam durability",
      "Sleeve, collar & hem symmetry",
      "Immediate defect identification & correction",
    ],
  },
  {
    id: "measurement-qc",
    number: "04",
    title: "MEASUREMENT & TOLERANCE AUDITS",
    category: "Dimensional Quality",
    description:
      "Comprehensive dimensional audit comparing completed garments across all size grades against approved tech pack measurement charts.",
    icon: "Ruler",
    checkpoint: "Grade Chart Verification",
    points: [
      "Critical point-of-measure (POM) inspection",
      "Chest, sleeve, length & collar tolerances",
      "Size label matching verification",
      "Consistency across bulk volume",
    ],
  },
  {
    id: "final-qc",
    number: "05",
    title: "FINAL PRE-PACKING & EXPORT AUDIT",
    category: "Finishing & Packaging",
    description:
      "100% inspection of finished garments for loose threads, clean pressing, correct barcode tagging, polybag packaging, and master carton labeling.",
    icon: "PackageCheck",
    checkpoint: "100% Pre-Shipment Clearance",
    points: [
      "Loose thread trimming & clean steam pressing",
      "Branded neck tag & hang tag placement",
      "Individual polybag sealing & barcode verification",
      "Export carton weight & tagging audit",
    ],
  },
];

export const CAPABILITIES_PAGE_CTA = {
  eyebrow: "START YOUR PROJECT",
  headline: "READY TO START YOUR PRODUCTION?",
  supportingText:
    "Whether you have a completed tech pack ready for OEM manufacturing, need ODM concept development, or want custom private labeling for your sportswear collection, our manufacturing team is ready to assist.",
  ctaLabel: "DISCUSS YOUR PROJECT",
  ctaHref: "/contact#quote",
  secondaryLabel: "VIEW CATALOGUE",
  secondaryHref: "/slots-catalogue.pdf",
};

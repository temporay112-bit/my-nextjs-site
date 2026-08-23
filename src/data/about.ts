/**
 * SLOTS SPORTSWEAR — About Page Data Module
 *
 * Sourced strictly from:
 * 1. 01-project-requirements.md
 * 2. 05-design-system.md
 * 3. 06-memory.md
 * 4. 07-asset-content-checklist.md
 * 5. src/data/site-stats.ts & src/data/trust.ts
 *
 * STRICT CONTENT RULE:
 * Only publish content and metrics explicitly verified in the project documentation.
 * Never invent certifications, statistics, or claims.
 */

export interface AboutHeroData {
  eyebrow: string;
  headline: string;
  supportingText: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  backgroundImage: string;
  alt: string;
}

export interface CompanyOverviewData {
  eyebrow: string;
  headline: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  pillars: Array<{
    number: string;
    title: string;
    description: string;
    icon: "ShieldCheck" | "Cpu" | "Globe" | "Factory";
  }>;
  quickFacts: Array<{
    label: string;
    value: string;
  }>;
}

export interface WhatWeDoItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: "Scissors" | "FileCode" | "Lightbulb" | "Tags" | "Layers" | "Truck";
}

export interface SpecializationItem {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
  href: string;
}

export interface ManufacturingIdentityData {
  eyebrow: string;
  headline: string;
  supportingText: string;
  locationDetails: {
    city: string;
    region: string;
    country: string;
    hubTitle: string;
    hubDescription: string;
  };
  productionCapabilities: Array<{
    title: string;
    description: string;
  }>;
  galleryImages: Array<{
    id: string;
    title: string;
    stage: string;
    image: string;
    alt: string;
    badge: string;
  }>;
}

export interface AboutTrustData {
  eyebrow: string;
  headline: string;
  supportingText: string;
  metrics: Array<{
    id: string;
    value: string;
    label: string;
    description: string;
  }>;
  assurances: Array<{
    title: string;
    description: string;
    icon: "ShieldCheck" | "CheckCircle2" | "BadgeCheck" | "Lock";
  }>;
}

export interface AboutCtaData {
  eyebrow: string;
  headline: string;
  supportingText: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 01_HERO
// ─────────────────────────────────────────────────────────────────────────────
export const ABOUT_HERO_CONTENT: AboutHeroData = {
  eyebrow: "ABOUT SLOTS SPORTSWEAR",
  headline: "ENGINEERED FOR YOUR BRAND.",
  supportingText:
    "SLOTS SPORTSWEAR is a premier B2B custom sportswear manufacturer and global exporter based in Sialkot, Pakistan. We partner with international apparel brands, sourcing managers, sports teams, and private labels to deliver precision-engineered athletic garments with uncompromising quality.",
  primaryCta: {
    label: "START YOUR PROJECT",
    href: "/contact#quote",
  },
  secondaryCta: {
    label: "WHAT WE DO",
    href: "#what-we-do",
  },
  backgroundImage: "/images/factory/facility-main.jpg",
  alt: "SLOTS SPORTSWEAR manufacturing floor and precision sportswear production facility in Sialkot",
};

// ─────────────────────────────────────────────────────────────────────────────
// 02_COMPANY_OVERVIEW (WHO WE ARE)
// ─────────────────────────────────────────────────────────────────────────────
export const COMPANY_OVERVIEW_CONTENT: CompanyOverviewData = {
  eyebrow: "COMPANY OVERVIEW",
  headline: "WHO WE ARE",
  leadParagraph:
    "SLOTS SPORTSWEAR is a specialized B2B apparel manufacturing facility operating from Sialkot, Pakistan — the global epicentre of sports goods and athletic wear production.",
  bodyParagraphs: [
    "We are built from the ground up to solve the core challenges faced by international apparel brands: inconsistent sizing, unreliable lead times, unpredictable quality, and opaque communication. By combining technical pattern-making, modern machinery, rigorous multi-stage quality control, and direct export workflows, we provide our partners with a seamless production bridge from initial design to delivered bulk orders.",
    "Whether you are an established international sports brand scaling high-volume product lines, an emerging fitness label needing agile low-MOQ development, or a commercial buyer sourcing custom golfwear and team uniforms, our engineering team ensures every seam, fabric blend, and branding detail adheres precisely to your technical pack.",
  ],
  pillars: [
    {
      number: "01",
      title: "Precision Engineering",
      description:
        "Every garment is developed with exact grading, ergonomic athletic cuts, and performance-tested stitching methods.",
      icon: "Cpu",
    },
    {
      number: "02",
      title: "Strict Quality Control",
      description:
        "100% inspection protocol covering incoming raw materials, inline sewing assembly, and final pre-dispatch audits.",
      icon: "ShieldCheck",
    },
    {
      number: "03",
      title: "Sialkot Manufacturing Hub",
      description:
        "Direct access to specialized textile ecosystems, skilled garment artisans, and international freight logistics.",
      icon: "Factory",
    },
    {
      number: "04",
      title: "Global Export Standard",
      description:
        "Documented international compliance, reliable customs clearances, and flexible DDP / Express freight options.",
      icon: "Globe",
    },
  ],
  quickFacts: [
    { label: "Headquarters & Factory", value: "Sialkot, Punjab, Pakistan" },
    { label: "Business Model", value: "B2B Custom Sportswear & OEM/ODM" },
    { label: "Primary Markets", value: "USA, Canada, UK, Europe, Worldwide" },
    { label: "Core Specialization", value: "Golfwear, Sportswear, Performance Apparel" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 03_WHAT_WE_DO
// ─────────────────────────────────────────────────────────────────────────────
export const WHAT_WE_DO_ITEMS: WhatWeDoItem[] = [
  {
    id: "custom-sportswear",
    number: "01",
    title: "Custom Sportswear Manufacturing",
    shortTitle: "Custom Sportswear",
    tagline: "Tailored Cut & Sew Performance Apparel",
    description:
      "Full-spectrum custom manufacturing tailored to your exact tech pack specifications, fabric preferences, and custom colorways.",
    deliverables: [
      "Custom sizing & grading charts",
      "Performance fabric selection",
      "Flatlock & ergonomic seam assembly",
      "Full panel sublimation & solid dyeing",
    ],
    icon: "Scissors",
  },
  {
    id: "oem",
    number: "02",
    title: "OEM (Original Equipment Manufacturing)",
    shortTitle: "OEM Production",
    tagline: "Your Design. Our Manufacturing Precision.",
    description:
      "You supply the approved tech pack, CAD patterns, and brand standards; our factory executes precise bulk production to your exact specifications.",
    deliverables: [
      "Tech pack review & material matching",
      "Pre-production counter sample approval",
      "Precision batch cutting & assembly",
      "Strict tolerance measurement audits",
    ],
    icon: "FileCode",
  },
  {
    id: "odm",
    number: "03",
    title: "ODM (Original Design Manufacturing)",
    shortTitle: "ODM Development",
    tagline: "From Initial Concept to Market-Ready Product.",
    description:
      "Leverage our established pattern library, technical fabric know-how, and garment development expertise to bring your apparel ideas to reality.",
    deliverables: [
      "Concept adaptation & tech sketching",
      "Fabric development & trim sourcing",
      "Fit testing & sample refinement",
      "Ready-to-scale production patterns",
    ],
    icon: "Lightbulb",
  },
  {
    id: "private-label",
    number: "04",
    title: "Private Label & Brand Finishing",
    shortTitle: "Private Label",
    tagline: "Complete Brand Identity Integration",
    description:
      "Transform quality athletic garments into your signature branded line with custom trims, labels, tags, and retail-ready packaging.",
    deliverables: [
      "Custom woven neck labels & care tags",
      "Embossed heat-transfer brand logos",
      "Custom branded hang tags & barcoding",
      "Polybag packaging & branded carton boxes",
    ],
    icon: "Tags",
  },
  {
    id: "bulk-production",
    number: "05",
    title: "Bulk Production & Scalability",
    shortTitle: "Bulk Production",
    tagline: "High-Volume Capacity with Reliable Consistency",
    description:
      "Structured production lines capable of scaling from initial low-MOQ runs to 50K+ monthly units without sacrificing quality standards.",
    deliverables: [
      "Dedicated multi-station sewing lines",
      "Systematic inline QC checkpoints",
      "Lot-to-lot color & sizing consistency",
      "Predictable production scheduling",
    ],
    icon: "Layers",
  },
  {
    id: "international-export",
    number: "06",
    title: "International Export & Logistics",
    shortTitle: "International Export",
    tagline: "Worldwide Freight & Customs Compliance",
    description:
      "Comprehensive export coordination delivering finished shipments directly to brand warehouses and distribution centers globally.",
    deliverables: [
      "DDP door-to-door cargo service",
      "DHL Express fast parcel delivery",
      "Commercial invoice & export compliance",
      "Air and ocean freight coordination",
    ],
    icon: "Truck",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 04_SPECIALIZATION (OUR SPECIALIZATION)
// ─────────────────────────────────────────────────────────────────────────────
export const SPECIALIZATION_ITEMS: SpecializationItem[] = [
  {
    id: "golfwear",
    number: "01",
    title: "GOLFWEAR SPECIALIZATION",
    category: "Signature Category",
    badge: "PRIMARY FOCUS",
    description:
      "Engineered for luxury aesthetics, unrestricted athletic swing mobility, and thermal comfort on and off the course. Built using premium pique knits, elastane blends, and breathable UV-protective technical weaves.",
    highlights: [
      "Performance Golf Polos (Classic & Modern collars)",
      "Technical Golf Trousers & Tailored Shorts",
      "Windproof & Water-Repellent Outerwear",
      "Cabretta Leather & Synthetic Golf Gloves",
    ],
    image: "/images/products/Polo/2.png",
    alt: "SLOTS SPORTSWEAR Performance Golfwear and Apparel Manufacturing",
    href: "/products#golfwear",
  },
  {
    id: "sportswear",
    number: "02",
    title: "SPORTSWEAR & ACTIVEWEAR",
    category: "Athletic Performance",
    badge: "HIGH DEMAND",
    description:
      "Versatile, high-durability apparel developed for gym training, fitness labels, running, soccer, and athletic conditioning. Engineered for maximum breathability, 4-way stretch, and moisture management.",
    highlights: [
      "Moisture-Wicking Training Shirts & Tank Tops",
      "Compression Arm Sleeves & Baselayers",
      "Athletic Gym Shorts & Liner Running Shorts",
      "Women's Athletic Training Tops & Leggings",
    ],
    image: "/images/products/Shirts/1.png",
    alt: "SLOTS SPORTSWEAR Custom Activewear and Athletic Apparel",
    href: "/products#activewear",
  },
  {
    id: "performance-apparel",
    number: "03",
    title: "PERFORMANCE APPAREL & TEAMWEAR",
    category: "Coordinated Team & Club Lines",
    badge: "CUSTOM RUNS",
    description:
      "Full team kits, travel tracksuits, and premium streetwear hoodies crafted with heavy-weight fleece, technical interlock fabrics, and durable reinforced seam construction for clubs and collegiate teams.",
    highlights: [
      "Custom Coordinated Tracksuit Sets",
      "Heavyweight & Performance Athletic Hoodies",
      "Sublimated Team Match Jerseys & Uniforms",
      "Warmup Tops & Post-Game Travel Apparel",
    ],
    image: "/images/products/Polo/1.png",
    alt: "SLOTS SPORTSWEAR Teamwear, Tracksuits, and Performance Apparel",
    href: "/products#teamwear",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 05_MANUFACTURING_IDENTITY (MANUFACTURING FROM SIALKOT)
// ─────────────────────────────────────────────────────────────────────────────
export const MANUFACTURING_IDENTITY_CONTENT: ManufacturingIdentityData = {
  eyebrow: "MANUFACTURING FROM SIALKOT",
  headline: "MANUFACTURING FROM SIALKOT",
  supportingText:
    "Our factory is situated in Sialkot, Pakistan — the world's most renowned hub for sports goods and technical apparel manufacturing. This location connects our production lines directly with generational textile craftsmanship, advanced dye houses, and global freight corridors.",
  locationDetails: {
    city: "Sialkot",
    region: "Punjab",
    country: "Pakistan (Postal Code: 51310)",
    hubTitle: "Global Sports Manufacturing Capital",
    hubDescription:
      "Sialkot produces over 70% of the world's hand-stitched athletic goods and is home to a world-class cluster of specialized textile spinning, knitting, sublimation printing, and export logistics infrastructure.",
  },
  productionCapabilities: [
    {
      title: "Complete In-House Garment Cycle",
      description:
        "From raw fabric inspection and precision panel cutting to flatlock assembly, branding, and export packing — all under one managed roof.",
    },
    {
      title: "Advanced Decoration & Customization",
      description:
        "High-density embroidery, digital dye sublimation, heat transfers, screen printing, and private-label woven tag applications.",
    },
    {
      title: "Multi-Tier Quality Inspection",
      description:
        "Dedicated QC officers check fabric tension, seam tensile strength, sizing tolerances, and needle integrity across each production batch.",
    },
    {
      title: "Direct International Logistics",
      description:
        "Seamless connection to international air express carriers (DHL, FedEx) and sea freight cargo routes with documented export compliance.",
    },
  ],
  galleryImages: [
    {
      id: "inspection",
      title: "Raw Material & Fabric Inspection",
      stage: "STAGE 01",
      image: "/images/factory/inspection.jpg",
      alt: "SLOTS SPORTSWEAR fabric roll inspection and GSM quality verification",
      badge: "INCOMING QC",
    },
    {
      id: "cutting",
      title: "Precision Pattern & Panel Cutting",
      stage: "STAGE 02",
      image: "/images/factory/cutting.jpg",
      alt: "SLOTS SPORTSWEAR precision multi-layer fabric cutting",
      badge: "ACCURACY AUDIT",
    },
    {
      id: "sewing",
      title: "Specialized Garment Assembly",
      stage: "STAGE 03",
      image: "/images/factory/sewing.jpg",
      alt: "SLOTS SPORTSWEAR athletic apparel sewing and flatlock assembly",
      badge: "CRAFTSMANSHIP",
    },
    {
      id: "branding",
      title: "Branding & Custom Finishing",
      stage: "STAGE 04",
      image: "/images/factory/branding.jpg",
      alt: "SLOTS SPORTSWEAR custom embroidery and private-label branding",
      badge: "PRIVATE LABEL",
    },
    {
      id: "qc",
      title: "Inline & Pre-Dispatch QC Inspection",
      stage: "STAGE 05",
      image: "/images/factory/qc.jpg",
      alt: "SLOTS SPORTSWEAR quality control inspection and measurement verification",
      badge: "100% AUDITED",
    },
    {
      id: "packing",
      title: "Export Packing & Freight Preparation",
      stage: "STAGE 06",
      image: "/images/factory/packing.jpg",
      alt: "SLOTS SPORTSWEAR garment polybag packing and carton export preparation",
      badge: "GLOBAL EXPORT",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 06_TRUST (BUILT FOR B2B)
// ─────────────────────────────────────────────────────────────────────────────
export const ABOUT_TRUST_CONTENT: AboutTrustData = {
  eyebrow: "VERIFIED CAPABILITIES",
  headline: "BUILT FOR B2B",
  supportingText:
    "We operate as an accountable, transparent manufacturing partner. Our operations, metrics, and business registrations are structured to give international buyers absolute confidence.",
  metrics: [
    {
      id: "years-experience",
      value: "10+",
      label: "YEARS EXPERIENCE",
      description: "Industry expertise in export custom sportswear development and manufacturing.",
    },
    {
      id: "global-clients",
      value: "250+",
      label: "GLOBAL CLIENTS",
      description: "International brands, sports clubs, and private-label buyers served worldwide.",
    },
    {
      id: "monthly-production",
      value: "50K+",
      label: "MONTHLY PRODUCTION",
      description: "Scalable monthly output volume across activewear, golfwear, and teamwear lines.",
    },
    {
      id: "product-options",
      value: "100+",
      label: "PRODUCT OPTIONS",
      description: "Custom cut & sew apparel styles, performance fabrics, and branding configurations.",
    },
  ],
  assurances: [
    {
      title: "Registered Business Entity",
      description:
        "Active member of the Sialkot Chamber of Commerce & Industry (SCCI) and compliant with FBR tax regulations.",
      icon: "ShieldCheck",
    },
    {
      title: "Transparent Tech Pack Execution",
      description:
        "Zero unauthorized design substitutions or material compromises. Samples approved before production begins.",
      icon: "CheckCircle2",
    },
    {
      title: "Strict Commercial Confidentiality",
      description:
        "All client designs, tech packs, brand assets, and proprietary cut patterns are safeguarded under B2B protocols.",
      icon: "Lock",
    },
    {
      title: "Predictable Export Timelines",
      description:
        "Production milestones mapped against confirmed shipping windows with direct DDP / Express tracking.",
      icon: "BadgeCheck",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 07_CTA
// ─────────────────────────────────────────────────────────────────────────────
export const ABOUT_CTA_CONTENT: AboutCtaData = {
  eyebrow: "START YOUR MANUFACTURING PROJECT",
  headline: "ENGINEERED FOR YOUR BRAND.",
  supportingText:
    "Connect directly with our manufacturing specialists in Sialkot. Send us your tech pack, design files, or project requirements for a clear, accurate B2B quotation and sampling schedule.",
  primaryCta: {
    label: "START YOUR PROJECT",
    href: "/contact#quote",
  },
  secondaryCta: {
    label: "VIEW CATALOGUE (PDF)",
    href: "/slots-catalogue.pdf",
  },
};

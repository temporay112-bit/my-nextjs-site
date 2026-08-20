export interface ManufacturingStepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon:
    | "MessageSquareText"
    | "Ruler"
    | "Layers3"
    | "ClipboardList"
    | "Scissors"
    | "Workflow"
    | "Tags"
    | "ShieldCheck"
    | "PackageCheck"
    | "Globe2";
  published: boolean;
}

export const MANUFACTURING_STEPS: ManufacturingStepItem[] = [
  {
    id: "step-01",
    number: "01",
    title: "CONSULTATION & REQUIREMENTS",
    description:
      "Review the buyer's product requirements, category, quantities, technical specifications, branding needs and project objectives.",
    icon: "MessageSquareText",
    published: true,
  },
  {
    id: "step-02",
    number: "02",
    title: "PRODUCT DEVELOPMENT & SAMPLING",
    description:
      "Review technical requirements and develop samples for product construction, fit and specification review.",
    icon: "Ruler",
    published: true,
  },
  {
    id: "step-03",
    number: "03",
    title: "FABRIC & TRIMS",
    description:
      "Coordinate approved fabrics, colors, trims, labels and other product components required for the order.",
    icon: "Layers3",
    published: true,
  },
  {
    id: "step-04",
    number: "04",
    title: "PRODUCTION PREPARATION",
    description:
      "Prepare the production requirements, specifications, materials and workflow before bulk manufacturing begins.",
    icon: "ClipboardList",
    published: true,
  },
  {
    id: "step-05",
    number: "05",
    title: "CUTTING",
    description:
      "Prepare and cut fabric panels according to the approved garment specifications and production requirements.",
    icon: "Scissors",
    published: true,
  },
  {
    id: "step-06",
    number: "06",
    title: "SEWING & ASSEMBLY",
    description:
      "Assemble garment components according to the approved construction, measurements and specifications.",
    icon: "Workflow",
    published: true,
  },
  {
    id: "step-07",
    number: "07",
    title: "CUSTOMIZATION & BRANDING",
    description:
      "Apply approved branding and finishing requirements such as labels, printing, embroidery, hang tags and private-label details where applicable.",
    icon: "Tags",
    published: true,
  },
  {
    id: "step-08",
    number: "08",
    title: "QUALITY CONTROL",
    description:
      "Inspect materials, measurements, workmanship, finishing and order requirements through the quality-control process.",
    icon: "ShieldCheck",
    published: true,
  },
  {
    id: "step-09",
    number: "09",
    title: "FINISHING & PACKING",
    description:
      "Complete finishing, folding, labeling and packing according to the approved order requirements.",
    icon: "PackageCheck",
    published: true,
  },
  {
    id: "step-10",
    number: "10",
    title: "SHIPPING & EXPORT",
    description:
      "Prepare completed orders for international shipment and export handover.",
    icon: "Globe2",
    published: true,
  },
];

export interface ProcessPhaseCard {
  id: string;
  phaseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  stages: string;
}

export const PROCESS_PHASE_CARDS: ProcessPhaseCard[] = [
  {
    id: "phase-01",
    phaseNumber: "01",
    title: "CONSULTATION & TECH PACK",
    subtitle: "Discovery & Sampling",
    description: "Detailed specification alignment, CAD review, and pre-production sample creation for fit and approval.",
    image: "/images/factory/inspection.jpg",
    alt: "SLOTS SPORTSWEAR consultation, tech pack development and sample prototyping",
    stages: "Stages 01 — 02",
  },
  {
    id: "phase-02",
    phaseNumber: "02",
    title: "FABRIC & MATERIAL SOURCING",
    subtitle: "Trims & Preparation",
    description: "Technical fabric testing, custom dye lots, performance trim matching, and production line preparation.",
    image: "/images/factory/facility-main.jpg",
    alt: "SLOTS SPORTSWEAR fabric sourcing, colorfastness inspection, and production planning",
    stages: "Stages 03 — 04",
  },
  {
    id: "phase-03",
    phaseNumber: "03",
    title: "PRODUCTION & QUALITY CONTROL",
    subtitle: "Cutting, Sewing & QC",
    description: "Precision fabric cutting, skilled assembly stitching, branding application, and multi-stage inline inspection.",
    image: "/images/factory/sewing.jpg",
    alt: "SLOTS SPORTSWEAR precision cutting, garment sewing assembly, and quality control",
    stages: "Stages 05 — 08",
  },
  {
    id: "phase-04",
    phaseNumber: "04",
    title: "PACKING & GLOBAL SHIPPING",
    subtitle: "Finishing & Export",
    description: "Individual polybag packaging, carton tagging, and worldwide export handover to trusted logistics carriers.",
    image: "/images/factory/packing.jpg",
    alt: "SLOTS SPORTSWEAR garment finishing, private-label packaging, and international export handover",
    stages: "Stages 09 — 10",
  },
];

export const MANUFACTURING_SECTION_CONTENT = {
  eyebrow: "OUR MANUFACTURING PROCESS",
  headline: "FROM CONCEPT TO PRODUCTION.",
  supportingText:
    "A structured production workflow designed to turn your product requirements into finished sportswear for international B2B orders.",
  cta: {
    label: "START YOUR PROJECT",
    href: "/contact#quote",
  },
};

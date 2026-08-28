/**
 * SLOTS SPORTSWEAR — Product Catalogue Data
 *
 * Official product catalogue metadata, PDF path, and preview highlights.
 */

export interface CatalogueData {
  title: string;
  subtitle: string;
  pdfUrl: string;
  coverImage?: string;
  filename: string;
  fileSize: string;
  year: string;
  highlights: string[];
}

export const OFFICIAL_CATALOGUE: CatalogueData = {
  title: "SLOTS SPORTSWEAR MASTER CATALOGUE",
  subtitle: "Full B2B Product Range & Custom Manufacturing Specifications",
  pdfUrl: "/slots-catalogue.pdf",
  coverImage: "/images/catalogue/catalogue-cover.jpg",
  filename: "slots-catalogue.pdf",
  fileSize: "PDF Document",
  year: "2026 Edition",
  highlights: [
    "Complete Sportswear & Activewear Collections",
    "Custom Cut & Sew Specifications",
    "Fabric Compositions & GSM Options",
    "Sublimation, Embroidery & Branding Methods",
    "B2B Order Quantities & Export Packing Guidelines",
  ],
};

export const CATALOGUE_SECTION_CONTENT = {
  eyebrow: "PRODUCT CATALOGUE",
  headline: "EXPLORE OUR COLLECTION.",
  supportingText:
    "View the official SLOTS SPORTSWEAR catalogue and explore our custom sportswear manufacturing capabilities, garment options, and export specifications.",
};

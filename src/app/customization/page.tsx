import React from "react";
import type { Metadata } from "next";
import { CustomizationHero } from "@/components/customization/CustomizationHero";
import { CustomizationGrid } from "@/components/customization/CustomizationGrid";
import { BrandingSection } from "@/components/customization/BrandingSection";
import { PrivateLabelSection } from "@/components/customization/PrivateLabelSection";
import { CustomizationProcess } from "@/components/customization/CustomizationProcess";
import { CustomizationCta } from "@/components/customization/CustomizationCta";

export const metadata: Metadata = {
  title: "Custom Sportswear & Private Label",
  description:
    "Explore custom sportswear options: bespoke product design, fabric selection, custom fit, embroidery, printing, custom labels, hang tags, and private label finishing.",
  alternates: {
    canonical: "/customization",
  },
  openGraph: {
    title: "Custom Sportswear & Private Label | SLOTS SPORTSWEAR",
    description:
      "Full-service B2B custom sportswear and private-label apparel manufacturing: custom silhouettes, 3D embroidery, silicone heat transfers, woven labels, and retail packaging.",
    url: "https://slotsdesign.vercel.app/customization",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/factory/branding.jpg",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR Custom Embroidery, Branding, and Private Label Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sportswear & Private Label | SLOTS SPORTSWEAR",
    description:
      "Comprehensive sportswear customization: custom design, fabric selection, fit specs, embroidery, printing, labels, and private-label finishing.",
    images: ["/images/factory/branding.jpg"],
  },
};

export default function CustomizationPage() {
  // Schema.org Structured Data for Customization Page
  const customizationPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Custom Sportswear & Private Label | SLOTS SPORTSWEAR",
    url: "https://slotsdesign.vercel.app/customization",
    description:
      "Comprehensive apparel customization options including custom product design, fabric selection, colors, fit specifications, 3D embroidery, printing, custom labels, hang tags, and private-label packaging.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotssportswear.com",
      logo: "https://slotssportswear.com/images/logo.png",
    },
    mainEntity: {
      "@type": "Service",
      name: "Sportswear Customization & Private Label Manufacturing",
      serviceType: "Apparel Customization & Branding",
      provider: {
        "@type": "Organization",
        name: "SLOTS SPORTSWEAR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Customization Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Product Design & Silhouette Development",
              description: "Bespoke apparel silhouettes, CAD pattern drafting, and custom sportswear design.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Performance Fabric & Color Matching",
              description: "Technical knits, wovens, moisture-wicking blends, and Pantone color lot matching.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-Definition Embroidery & Heat Transfer Printing",
              description: "3D puff embroidery, flat stitching, silicone logos, screen printing, and sublimation.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Private Label Finishing & Retail Packaging",
              description: "Woven neck tags, care labels, embossed hang tags, polybagging, and export packing.",
            },
          },
        ],
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://slotssportswear.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Customization",
        item: "https://slotssportswear.com/customization",
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customizationPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full">
        {/* 01 Hero Section (Single H1) */}
        <CustomizationHero />

        {/* 02 Customization Options Grid (10 Core Options) */}
        <CustomizationGrid />

        {/* 03 Branding & Embellishment Deep-Dive */}
        <BrandingSection />

        {/* 04 Private Label Finishing & Retail Packaging */}
        <PrivateLabelSection />

        {/* 05 4-Step Customization Process */}
        <CustomizationProcess />

        {/* 06 Closing Conversion CTA */}
        <CustomizationCta />
      </div>
    </>
  );
}

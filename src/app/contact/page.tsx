import React from "react";
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { QuoteSection } from "@/components/forms/QuoteSection";

export const metadata: Metadata = {
  title: "Contact SLOTS SPORTSWEAR | Get a Quote",
  description:
    "Get in touch with SLOTS SPORTSWEAR. Submit your Tech Pack specifications or sportswear inquiry to receive a manufacturing quotation from our Sialkot factory team.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact SLOTS SPORTSWEAR | Get a Quote",
    description:
      "Connect directly with our Sialkot sportswear manufacturing facility. Submit your technical specifications or request a bulk production quotation.",
    url: "https://slotssportswear.com/contact",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-01.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SLOTS SPORTSWEAR Sialkot Apparel Manufacturing Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SLOTS SPORTSWEAR | Get a Quote",
    description:
      "Submit your Tech Pack specifications or sportswear inquiry to receive a formal manufacturing quotation.",
    images: ["/images/hero/hero-01.jpg"],
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SLOTS SPORTSWEAR | Get a Quote",
    url: "https://slotssportswear.com/contact",
    description:
      "Contact page for SLOTS SPORTSWEAR custom apparel manufacturing inquiries and quote requests.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotssportswear.com",
      logo: "https://slotssportswear.com/images/logo.png",
      email: "shahrangujjar00@gmail.com",
      telephone: "+923157847080",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        postalCode: "51310",
        addressRegion: "Punjab",
        addressCountry: "PK",
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
        name: "Contact",
        item: "https://slotssportswear.com/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="w-full bg-slots-black min-h-screen text-slots-white">
        {/* 01 Hero Section (Eyebrow: GET IN TOUCH, Headline: START YOUR PROJECT., Single H1) */}
        <ContactHero />

        {/* 02 Verified Factory Contact Channels & Location */}
        <ContactInfoCards />

        {/* 03 Main B2B Quote Request Form Section */}
        <QuoteSection />
      </main>
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { QuoteSection } from "@/components/forms/QuoteSection";

export const metadata: Metadata = {
  title: "Request a Quote | SLOTS SPORTSWEAR",
  description:
    "Contact SLOTS SPORTSWEAR for custom sportswear manufacturing, OEM, ODM, private label and bulk production enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Request a Quote | SLOTS SPORTSWEAR",
    description:
      "Contact SLOTS SPORTSWEAR for custom sportswear manufacturing, OEM, ODM, private label and bulk production enquiries.",
    url: "https://slotsdesign.vercel.app/contact",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/new hero images/new hero-01.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SLOTS SPORTSWEAR Sialkot Apparel Manufacturing Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote | SLOTS SPORTSWEAR",
    description:
      "Contact SLOTS SPORTSWEAR for custom sportswear manufacturing, OEM, ODM, private label and bulk production enquiries.",
    images: ["/images/hero/new hero images/new hero-01.jpg"],
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request a Quote | SLOTS SPORTSWEAR",
    url: "https://slotsdesign.vercel.app/contact",
    description:
      "Contact SLOTS SPORTSWEAR for custom sportswear manufacturing, OEM, ODM, private label and bulk production enquiries.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotsdesign.vercel.app",
      logo: "https://slotsdesign.vercel.app/images/logo.png",
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
        item: "https://slotsdesign.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://slotsdesign.vercel.app/contact",
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

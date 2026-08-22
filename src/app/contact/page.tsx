import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Get a Quote | Sialkot Manufacturing Facility",
  description: "Get in touch with SLOTS SPORTSWEAR. Submit your Tech Pack specifications or sportswear inquiry to receive a manufacturing quotation.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="quote">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">Get a Quote & Contact</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        Submit your tech pack or sportswear project inquiry to receive a formal manufacturing quotation from our factory team.
      </p>
    </div>
  );
}

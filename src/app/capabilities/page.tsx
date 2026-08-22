import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities | OEM, ODM & Private Label",
  description: "End-to-end custom apparel manufacturing capabilities: pattern drafting, sample development, fabric sourcing, cut & sew, and bulk export.",
  alternates: {
    canonical: "/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">Manufacturing Capabilities</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        OEM, ODM, Private Label, Pattern Drafting, Sampling, Cutting, Sublimation, Embroidery, and Export Solutions.
      </p>
    </div>
  );
}

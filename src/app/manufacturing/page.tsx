import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Process | 10-Step Apparel Production Workflow",
  description: "Discover our 10-stage manufacturing process from tech pack consultation to fabric sourcing, precision cutting, sewing, QC, and international shipping.",
  alternates: {
    canonical: "/manufacturing",
  },
};

export default function ManufacturingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">Manufacturing Process</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        10-stage end-to-end production workflow from tech pack consultation to quality control and international dispatch.
      </p>
    </div>
  );
}

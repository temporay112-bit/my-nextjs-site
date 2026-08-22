import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customization & Branding | Sublimation, Embroidery, Private Label",
  description: "Comprehensive apparel customization methods: Sublimation printing, 3D embroidery, heat transfer, custom woven labels, and retail packaging.",
  alternates: {
    canonical: "/customization",
  },
};

export default function CustomizationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">Customization & Private Label</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        Bespoke fabrics, custom fit specs, woven hang tags, embossed silicone badges, screen printing, and branded packaging.
      </p>
    </div>
  );
}

/**
 * SLOTS SPORTSWEAR — Shipping Methods Data
 *
 * Sourced directly from verified SHIPPINGS TERMS & CUSTOMS DUTY AGREEMENT (May 21, 2026).
 */

export interface VerifiedShippingOption {
  id: string;
  optionNumber: string;
  title: string;
  headline: string;
  deliveryTime: string;
  dutiesTaxes: string;
  responsibility: string;
  additionalChargesText: string;
  description: string;
  highlight: string;
  badge: string;
  isPublished: boolean;
}

export const VERIFIED_SHIPPING_OPTIONS: VerifiedShippingOption[] = [
  {
    id: "ddp-cargo",
    optionNumber: "01",
    title: "DDP CARGO SERVICE",
    headline: "ALL COSTS INCLUDED",
    deliveryTime: "8 to 10 business days",
    dutiesTaxes: "Included",
    responsibility: "Paid by Exporter",
    additionalChargesText: "No additional charges upon delivery according to the agreement.",
    description: "Recommended for predictable total cost with duties and taxes fully covered by the exporter.",
    highlight: "Predictable Total Cost",
    badge: "ALL COSTS INCLUDED",
    isPublished: true,
  },
  {
    id: "dhl-express",
    optionNumber: "02",
    title: "EXPRESS SHIPPING VIA DHL",
    headline: "FAST INTERNATIONAL DELIVERY",
    deliveryTime: "4 to 6 business days",
    dutiesTaxes: "Not Included",
    responsibility: "Paid by Client at Delivery",
    additionalChargesText: "Import duties, taxes, or customs charges may be applied by U.S. Customs or local authorities and are paid by the client at delivery.",
    description: "Express priority shipping option with customs and duty charges handled directly by the client.",
    highlight: "Fast Express Delivery",
    badge: "EXPRESS DELIVERY",
    isPublished: true,
  },
];

export interface ShippingMarqueeLogoItem {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  altText: string;
}

export const SHIPPING_MARQUEE_LOGOS: ShippingMarqueeLogoItem[] = [
  {
    id: "ddp-service",
    name: "DDP Cargo Service — All Costs Included",
    shortName: "DDP Cargo Service",
    logo: "/images/logos/shipping/ddp.png",
    altText: "DDP Cargo Service (All Costs Included) Logo Mark",
  },
  {
    id: "dhl-express-logo",
    name: "DHL Express Shipping",
    shortName: "DHL Express",
    logo: "/images/logos/shipping/dhl.png",
    altText: "DHL Express Shipping Official Logo",
  },
];


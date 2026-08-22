export interface ProductCategory {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  featured?: boolean;
  badge?: string;
  published: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "golfwear",
    number: "01",
    title: "GOLFWEAR",
    slug: "golfwear",
    description:
      "Performance-focused golf apparel designed for comfort, movement and premium brand presentation.",
    image: "/images/products/golfwear.jpg",
    alt: "SLOTS SPORTSWEAR Performance Golfwear and Apparel Manufacturing",
    href: "/products#golfwear",
    featured: true,
    badge: "FEATURED SPECIALIZATION",
    published: true,
  },
  {
    id: "activewear",
    number: "02",
    title: "ACTIVEWEAR",
    slug: "activewear",
    description:
      "Custom performance apparel for training, fitness and active lifestyle brands.",
    image: "/images/products/activewear.jpg",
    alt: "SLOTS SPORTSWEAR Custom Activewear and Soccer Uniforms",
    href: "/products#activewear",
    featured: false,
    published: true,
  },
  {
    id: "teamwear",
    number: "03",
    title: "TEAMWEAR",
    slug: "teamwear",
    description:
      "Custom team apparel built around performance, identity and coordinated branding.",
    image: "/images/products/teamwear.jpg",
    alt: "SLOTS SPORTSWEAR Teamwear and Athletic Outerwear Manufacturing",
    href: "/products#teamwear",
    featured: false,
    published: true,
  },
  {
    id: "tracksuits",
    number: "04",
    title: "TRACKSUITS",
    slug: "tracksuits",
    description:
      "Custom coordinated performance sets for teams, brands and activewear collections.",
    image: "/images/products/tracksuits.jpg",
    alt: "SLOTS SPORTSWEAR Custom Tracksuits and Streetwear Hoodies",
    href: "/products#tracksuits",
    featured: false,
    published: true,
  },
  {
    id: "basics",
    number: "05",
    title: "BASICS",
    slug: "basics",
    description:
      "Essential custom sportswear styles developed for scalable B2B production.",
    image: "/images/products/basics.jpg",
    alt: "SLOTS SPORTSWEAR Essential Sportswear Basics and Blank Production",
    href: "/products#basics",
    featured: false,
    published: true,
  },
];

export const PRODUCTS_SHOWCASE_CONTENT = {
  eyebrow: "OUR PRODUCTS",
  headline: "BUILT FOR PERFORMANCE.",
  supportingText:
    "Custom sportswear manufactured for brands, teams and international B2B buyers.",
  cta: {
    label: "VIEW ALL PRODUCTS",
    href: "/products",
  },
};

export interface NewArrivalProduct {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  href: string;
  published: boolean;
}

export const NEW_ARRIVALS_PRODUCTS: NewArrivalProduct[] = [
  {
    id: "glove-01",
    title: "Performance Golf Gloves",
    category: "Gloves",
    image: "/images/products/Gloves/1.png",
    alt: "SLOTS SPORTSWEAR Performance Golf Gloves",
    href: "/products#golfwear",
    published: true,
  },
  {
    id: "golf-polo-01",
    title: "Performance Golf Polo",
    category: "Golf Polo",
    image: "/images/products/Polo/2.png",
    alt: "SLOTS SPORTSWEAR Performance Golf Polo",
    href: "/products#golfwear",
    published: true,
  },
  {
    id: "polo-01",
    title: "Classic Athletic Polo",
    category: "Polo",
    image: "/images/products/Polo/1.png",
    alt: "SLOTS SPORTSWEAR Classic Athletic Polo",
    href: "/products#golfwear",
    published: true,
  },
  {
    id: "shirt-01",
    title: "Training Activewear Shirt",
    category: "Shirts",
    image: "/images/products/Shirts/1.png",
    alt: "SLOTS SPORTSWEAR Training Activewear Shirt",
    href: "/products#activewear",
    published: true,
  },
  {
    id: "short-01",
    title: "Performance Training Shorts",
    category: "Short",
    image: "/images/products/Short/1.png",
    alt: "SLOTS SPORTSWEAR Performance Training Shorts",
    href: "/products#activewear",
    published: true,
  },
  {
    id: "sleeves-01",
    title: "Compression Arm Sleeves",
    category: "Sleeves",
    image: "/images/products/Sleeves/1.png",
    alt: "SLOTS SPORTSWEAR Compression Arm Sleeves",
    href: "/products#activewear",
    published: true,
  },
  {
    id: "tank-01",
    title: "Athletic Performance Tank Top",
    category: "Tank Top",
    image: "/images/products/Tank Top/1.png",
    alt: "SLOTS SPORTSWEAR Athletic Performance Tank Top",
    href: "/products#activewear",
    published: true,
  },
  {
    id: "women-shirt-01",
    title: "Women's Athletic Training Shirt",
    category: "Women Shirt",
    image: "/images/products/Women Shirt/1.png",
    alt: "SLOTS SPORTSWEAR Women's Athletic Training Shirt",
    href: "/products#activewear",
    published: true,
  },
];

export const NEW_ARRIVALS_CONTENT = {
  eyebrow: "LATEST PRODUCTS",
  headline: "NEW ARRIVALS",
  supportingText:
    "Explore our newest custom sportswear developments engineered for international B2B brands and teams.",
  cta: {
    label: "VIEW ALL PRODUCTS",
    href: "/products",
  },
};

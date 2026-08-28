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
    image: "/images/products/Polo/2.png",
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
    image: "/images/products/Shirts/1.png",
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
    image: "/images/products/Polo/1.png",
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
    image: "/images/products/Short/1.png",
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
    image: "/images/products/Tank Top/1.png",
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
    id: "na-polo-01",
    title: "Camo Performance Golf Polo",
    category: "Golf Polo",
    image: "/images/products/Polo/2.png",
    alt: "SLOTS SPORTSWEAR Camo Performance Golf Polo",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-polo-02",
    title: "Palm Floral Athletic Polo",
    category: "Golf Polo",
    image: "/images/products/Polo/1.png",
    alt: "SLOTS SPORTSWEAR Palm Floral Athletic Polo",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-shirt-01",
    title: "Activewear Training Shirt",
    category: "Activewear",
    image: "/images/products/Shirts/1.png",
    alt: "SLOTS SPORTSWEAR Activewear Training Shirt",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-shirt-02",
    title: "Performance Crewneck Shirt",
    category: "Activewear",
    image: "/images/products/Shirts/2.png",
    alt: "SLOTS SPORTSWEAR Performance Crewneck Shirt",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-tank-01",
    title: "Athletic Performance Tank Top",
    category: "Activewear",
    image: "/images/products/Tank Top/1.png",
    alt: "SLOTS SPORTSWEAR Athletic Performance Tank Top",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-sleeves-01",
    title: "Camo Tank & Arm Sleeves",
    category: "Accessories",
    image: "/images/products/Sleeves/1.png",
    alt: "SLOTS SPORTSWEAR Camo Tank & Arm Sleeves",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-women-01",
    title: "Women's Athletic Training Shirt",
    category: "Women's Wear",
    image: "/images/products/Women Shirt/1.png",
    alt: "SLOTS SPORTSWEAR Women's Athletic Training Shirt",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-women-02",
    title: "Women's Performance Crop Top",
    category: "Women's Wear",
    image: "/images/products/Women Shirt/2.png",
    alt: "SLOTS SPORTSWEAR Women's Performance Crop Top",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-short-01",
    title: "Performance Training Shorts",
    category: "Activewear",
    image: "/images/products/Short/1.png",
    alt: "SLOTS SPORTSWEAR Performance Training Shorts",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-short-02",
    title: "Camo Running Shorts",
    category: "Activewear",
    image: "/images/products/Short/2.png",
    alt: "SLOTS SPORTSWEAR Camo Running Shorts",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-glove-01",
    title: "Tour Performance Golf Gloves",
    category: "Golf Accessories",
    image: "/images/products/Gloves/1.png",
    alt: "SLOTS SPORTSWEAR Tour Performance Golf Gloves",
    href: "/contact#quote",
    published: true,
  },
  {
    id: "na-glove-02",
    title: "Elite Golf Gloves & Sleeve Set",
    category: "Golf Accessories",
    image: "/images/products/Gloves/2.png",
    alt: "SLOTS SPORTSWEAR Elite Golf Gloves & Sleeve Set",
    href: "/contact#quote",
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

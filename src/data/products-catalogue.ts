/**
 * SLOTS SPORTSWEAR — Products Catalogue Data Module
 *
 * STRICT CONTENT & ASSET RULE:
 * Sourced strictly from verified project data and actual image assets located in:
 * `public/images/products/*`
 *
 * Zero fake placeholders or non-existent file references.
 */

export interface CatalogueProduct {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  alt: string;
  specifications: string[];
  badge?: string;
  published: boolean;
}

export interface ProductCategoryFilter {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export const PRODUCT_CATALOGUE_ITEMS: CatalogueProduct[] = [
  // ── GOLF POLOS ─────────────────────────────────────────────────────────────
  {
    id: "golf-polo-performance",
    title: "Performance Engineered Golf Polo",
    category: "Golf Polos",
    categorySlug: "golfwear",
    description: "Technical dry-fit pique knit with 4-way stretch, anti-curl collar, and UV sun protection for tournament performance.",
    image: "/images/products/Polo/2.png",
    alt: "SLOTS SPORTSWEAR Performance Engineered Golf Polo",
    specifications: ["92% Polyester / 8% Elastane", "Moisture-wicking dry fit", "Sublimated / Solid dyed", "Custom sizing XS–5XL"],
    badge: "PRIMARY FOCUS",
    published: true,
  },
  {
    id: "golf-polo-classic",
    title: "Classic Athletic Pique Polo",
    category: "Golf Polos",
    categorySlug: "golfwear",
    description: "Refined athletic polo featuring structured rib collar, reinforced twin-needle stitching, and custom brand placket buttons.",
    image: "/images/products/Polo/1.png",
    alt: "SLOTS SPORTSWEAR Classic Athletic Pique Polo",
    specifications: ["100% Micro-Pique Cotton/Poly", "Breathable knit construction", "Custom engraved buttons", "Private-label branding"],
    badge: "CORE SPECIALIZATION",
    published: true,
  },
  {
    id: "golf-polo-modern",
    title: "Modern Minimalist Golf Polo",
    category: "Golf Polos",
    categorySlug: "golfwear",
    description: "Streamlined contemporary cut with laser-cut fused collar, heat-sealed hem, and aerodynamic athletic fit.",
    image: "/images/products/Polo/10.png",
    alt: "SLOTS SPORTSWEAR Modern Minimalist Golf Polo",
    specifications: ["Ultralight athletic jersey", "Laser-cut collar & cuffs", "Silicone logo application", "High airflow ventilation"],
    published: true,
  },
  {
    id: "golf-polo-club",
    title: "Tour Edition Technical Polo",
    category: "Golf Polos",
    categorySlug: "golfwear",
    description: "Premium tour-grade fabric blend engineered for maximum flexibility, odor control, and luxurious handfeel.",
    image: "/images/products/Polo/3.png",
    alt: "SLOTS SPORTSWEAR Tour Edition Technical Polo",
    specifications: ["88% Micro-Poly / 12% Spandex", "Anti-microbial treatment", "UPF 50+ UV protection", "Custom woven neck tags"],
    published: true,
  },

  // ── ACTIVEWEAR SHIRTS ──────────────────────────────────────────────────────
  {
    id: "active-training-shirt-01",
    title: "Athletic Training Performance Tee",
    category: "Activewear",
    categorySlug: "activewear",
    description: "Ergonomic multi-panel activewear shirt with flatlock anti-chafing seams and zoned mesh side ventilation.",
    image: "/images/products/Shirts/1.png",
    alt: "SLOTS SPORTSWEAR Athletic Training Performance Tee",
    specifications: ["100% Interlock Polyester", "Flatlock athletic seams", "High-density screen print", "Rapid-dry breathability"],
    badge: "BEST SELLER",
    published: true,
  },
  {
    id: "active-conditioning-tee",
    title: "Breathable Conditioning Tee",
    category: "Activewear",
    categorySlug: "activewear",
    description: "Lightweight workout shirt tailored for high-intensity gym training, fitness labels, and sports conditioning.",
    image: "/images/products/Shirts/5.png",
    alt: "SLOTS SPORTSWEAR Breathable Conditioning Tee",
    specifications: ["140 GSM Featherlight Poly", "4-way flexible movement", "Tagless heat-transfer label", "Durable colorfast dye"],
    published: true,
  },
  {
    id: "active-heavy-duty-tee",
    title: "Heavyweight Performance Training Top",
    category: "Activewear",
    categorySlug: "activewear",
    description: "Durable athletic top designed for rugged sports training, outdoor conditioning, and team warm-up gear.",
    image: "/images/products/Shirts/20.png",
    alt: "SLOTS SPORTSWEAR Heavyweight Performance Training Top",
    specifications: ["180 GSM Technical blend", "Reinforced shoulder tape", "Custom silicone badge", "Shrink-resistant finish"],
    published: true,
  },
  {
    id: "active-gym-tee",
    title: "Custom Cut & Sew Active Tee",
    category: "Activewear",
    categorySlug: "activewear",
    description: "Fully customized color-blocked panels tailored to buyer tech pack specifications and branding guidelines.",
    image: "/images/products/Shirts/2.png",
    alt: "SLOTS SPORTSWEAR Custom Cut & Sew Active Tee",
    specifications: ["Custom panel construction", "Sublimation / Screen print", "Standard & Drop-tail hems", "Bulk production scalable"],
    published: true,
  },

  // ── ATHLETIC SHORTS ────────────────────────────────────────────────────────
  {
    id: "training-shorts-01",
    title: "Performance Athletic Training Shorts",
    category: "Shorts",
    categorySlug: "shorts",
    description: "Multi-functional athletic shorts with elastic waistband, internal drawcord, and reinforced zipper utility pockets.",
    image: "/images/products/Short/1.png",
    alt: "SLOTS SPORTSWEAR Performance Athletic Training Shorts",
    specifications: ["90% Polyester / 10% Spandex", "Concealed zipper pockets", "Elastic waist with drawcord", "7-inch / 5-inch inseam"],
    badge: "HIGH DEMAND",
    published: true,
  },
  {
    id: "gym-liner-shorts",
    title: "Compression 2-in-1 Workout Shorts",
    category: "Shorts",
    categorySlug: "shorts",
    description: "Dual-layer athletic shorts featuring built-in compression liner, phone pouch, and high-mobility split hem.",
    image: "/images/products/Short/7.png",
    alt: "SLOTS SPORTSWEAR Compression 2-in-1 Workout Shorts",
    specifications: ["Woven shell + compression liner", "Internal phone sleeve", "Reflective safety details", "Sweat-wicking liner"],
    published: true,
  },
  {
    id: "running-lightweight-shorts",
    title: "Ultralight Running & Track Shorts",
    category: "Shorts",
    categorySlug: "shorts",
    description: "Featherlight breathable running shorts with side mesh ventilation inserts and quick-dry water-resistant finish.",
    image: "/images/products/Short/15.png",
    alt: "SLOTS SPORTSWEAR Ultralight Running & Track Shorts",
    specifications: ["100% Micro-Stretch Woven Poly", "Side airflow slits", "Custom rubber waist pullers", "Custom brand embroidery"],
    published: true,
  },

  // ── GOLF GLOVES ────────────────────────────────────────────────────────────
  {
    id: "golf-glove-cabretta",
    title: "Cabretta Leather Performance Golf Glove",
    category: "Golf Gloves",
    categorySlug: "golfwear",
    description: "Precision-crafted Cabretta leather golf glove engineered for superior grip, tactile sensitivity, and moisture resistance.",
    image: "/images/products/Gloves/1.png",
    alt: "SLOTS SPORTSWEAR Cabretta Leather Performance Golf Glove",
    specifications: ["100% Premium Cabretta Leather", "Breathable finger perforations", "Custom velcro rubber tab", "Men's & Women's sizing"],
    badge: "EXPORT SPECIALTY",
    published: true,
  },
  {
    id: "golf-glove-all-weather",
    title: "All-Weather Synthetic Golf Glove",
    category: "Golf Gloves",
    categorySlug: "golfwear",
    description: "High-durability synthetic leather composite with reinforced palm patch and flexible spandex knuckle inserts.",
    image: "/images/products/Gloves/2.png",
    alt: "SLOTS SPORTSWEAR All-Weather Synthetic Golf Glove",
    specifications: ["Synthetic leather + Lycra", "Enhanced wet-grip texture", "Embossed custom brand logo", "Multiple colorway trims"],
    published: true,
  },
  {
    id: "golf-glove-tour",
    title: "Tour Pro Breathable Golf Glove",
    category: "Golf Gloves",
    categorySlug: "golfwear",
    description: "Ultra-thin, second-skin fit glove engineered for competitive players and premium golfwear apparel brands.",
    image: "/images/products/Gloves/6.png",
    alt: "SLOTS SPORTSWEAR Tour Pro Breathable Golf Glove",
    specifications: ["AA-Grade Cabretta palm", "Microfiber backhand", "Precision anatomical seams", "Individual packaging ready"],
    published: true,
  },

  // ── TANK TOPS ──────────────────────────────────────────────────────────────
  {
    id: "athletic-tank-top-01",
    title: "Athletic Performance Stringer & Tank",
    category: "Tank Tops",
    categorySlug: "tank-tops",
    description: "Deep cut athletic tank top engineered with wide armholes, racerback ergonomics, and high-stretch mobility.",
    image: "/images/products/Tank Top/1.png",
    alt: "SLOTS SPORTSWEAR Athletic Performance Stringer & Tank",
    specifications: ["Cotton / Spandex athletic blend", "Deep cut racerback", "Reinforced armhole binding", "Custom chest silkscreen"],
    published: true,
  },
  {
    id: "mesh-training-tank",
    title: "Breathable Mesh Workout Tank Top",
    category: "Tank Tops",
    categorySlug: "tank-tops",
    description: "Open-hole technical micro-mesh top delivering maximum cooling airflow during intense cardio and gym sessions.",
    image: "/images/products/Tank Top/11.png",
    alt: "SLOTS SPORTSWEAR Breathable Mesh Workout Tank Top",
    specifications: ["100% Performance Micro-Mesh", "Quick-dry moisture transfer", "Reflective logo accents", "Drop-tail athletic hem"],
    published: true,
  },

  // ── COMPRESSION SLEEVES ────────────────────────────────────────────────────
  {
    id: "compression-sleeves-01",
    title: "Graduated Compression Arm Sleeves",
    category: "Compression Sleeves",
    categorySlug: "sleeves",
    description: "Anatomical graduated compression sleeves for muscle recovery, circulation support, and UV sun protection.",
    image: "/images/products/Sleeves/1.png",
    alt: "SLOTS SPORTSWEAR Graduated Compression Arm Sleeves",
    specifications: ["85% Nylon / 15% Spandex", "Non-slip silicone upper grip", "Seamless circular knit", "UPF 50+ UV blocking"],
    published: true,
  },
  {
    id: "uv-protection-sleeves",
    title: "Athletic Cooling Sun Protection Sleeves",
    category: "Compression Sleeves",
    categorySlug: "sleeves",
    description: "Featherlight cooling yarn fabric that lowers surface skin temperature during outdoor golf and athletic events.",
    image: "/images/products/Sleeves/2.png",
    alt: "SLOTS SPORTSWEAR Athletic Cooling Sun Protection Sleeves",
    specifications: ["Ice-silk cooling polymer yarn", "Flat-seam construction", "Custom sublimated patterns", "Paired retail packaging"],
    published: true,
  },

  // ── WOMEN'S ACTIVEWEAR ─────────────────────────────────────────────────────
  {
    id: "womens-active-shirt-01",
    title: "Women's Fitted Training Active Shirt",
    category: "Women's Activewear",
    categorySlug: "womens-activewear",
    description: "Tailored athletic silhouette with contoured princess seams, 4-way stretch fabric, and feminine crew neckline.",
    image: "/images/products/Women Shirt/1.png",
    alt: "SLOTS SPORTSWEAR Women's Fitted Training Active Shirt",
    specifications: ["88% Micro-Poly / 12% Spandex", "Contoured ergonomic fit", "Anti-odor treatment", "Custom private-label neck print"],
    badge: "POPULAR",
    published: true,
  },
  {
    id: "womens-training-top-02",
    title: "Women's Performance Gym Workout Top",
    category: "Women's Activewear",
    categorySlug: "womens-activewear",
    description: "Lightweight breathable top with scooped hem, raglan mobility sleeves, and ultra-soft brushed microfiber texture.",
    image: "/images/products/Women Shirt/6.png",
    alt: "SLOTS SPORTSWEAR Women's Performance Gym Workout Top",
    specifications: ["150 GSM Soft-touch blend", "Raglan athletic sleeves", "Flatlock comfort stitching", "Available in all custom pantones"],
    published: true,
  },
];

export const PRODUCT_FILTERS: ProductCategoryFilter[] = [
  { id: "all", name: "All Products", slug: "all", count: PRODUCT_CATALOGUE_ITEMS.length },
  { id: "golfwear", name: "Golfwear & Polos", slug: "golfwear", count: 6 },
  { id: "activewear", name: "Activewear & Shirts", slug: "activewear", count: 4 },
  { id: "shorts", name: "Athletic Shorts", slug: "shorts", count: 3 },
  { id: "tank-tops", name: "Tank Tops", slug: "tank-tops", count: 2 },
  { id: "sleeves", name: "Compression Sleeves", slug: "sleeves", count: 2 },
  { id: "womens-activewear", name: "Women's Activewear", slug: "womens-activewear", count: 2 },
];

export const PRODUCTS_PAGE_HERO = {
  eyebrow: "OUR PRODUCTS",
  headline: "BUILT FOR PERFORMANCE.",
  supportingText:
    "Explore our full range of customizable custom sportswear, technical golfwear, athletic activewear, and performance garments engineered for international B2B brands, teams, and private-label buyers in Sialkot, Pakistan.",
  primaryCta: {
    label: "GET A QUOTE",
    href: "/contact#quote",
  },
  secondaryCta: {
    label: "DOWNLOAD CATALOGUE",
    href: "/slots-catalogue.pdf",
  },
};

export const PRODUCTS_SPECS = [
  {
    number: "01",
    title: "Premium Fabric Selection",
    description: "Technical polyester, elastane/spandex blends, pique knits, french terry, compression nylon, and Cabretta leather.",
  },
  {
    number: "02",
    title: "Complete Size Grading",
    description: "Full size curves from XS to 5XL with custom regional grading standards (US, UK, European, and Asian fits).",
  },
  {
    number: "03",
    title: "Custom Branding & Trims",
    description: "Digital dye sublimation, high-density embroidery, screen printing, silicone transfers, custom neck tags, and hang tags.",
  },
  {
    number: "04",
    title: "Low MOQ & Scalable Production",
    description: "Flexible sampling and low minimum order quantities for brand launches, scaling seamlessly to 50K+ units/month.",
  },
];

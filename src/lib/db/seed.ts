import fs from "fs";
import path from "path";
import { scryptSync, randomBytes } from "crypto";
import type { DatabaseSchema, User, Category, Product } from "./types";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function getSeedData(): DatabaseSchema {
  const now = new Date().toISOString();

  // 1. DEFAULT ADMINISTRATOR ACCOUNT
  const defaultAdmin: User = {
    id: "usr_admin_default",
    name: "Slots Administrator",
    email: "admin@slotssportswear.com",
    phone: "+923001234567",
    passwordHash: hashPassword("Admin@Slots2026"),
    role: "ADMIN",
    status: "ACTIVE",
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  };

  // 2. VERIFIED B2B CATEGORIES & SUBCATEGORIES
  const categories: Category[] = [
    {
      id: "cat_golfwear",
      name: "GOLFWEAR",
      slug: "golfwear",
      parentId: null,
      description: "Tour-grade performance golf apparel engineered for comfort, moisture control, and full mobility.",
      image: "/images/products/Polo/2.png",
      sortOrder: 1,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_golf_polos",
      name: "Golf Polo Shirts",
      slug: "golf-polo-shirts",
      parentId: "cat_golfwear",
      description: "Technical dry-fit pique golf polos with anti-curl collars and tailored athletic drape.",
      sortOrder: 1,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_golf_trousers",
      name: "Golf Trousers",
      slug: "golf-trousers",
      parentId: "cat_golfwear",
      description: "Tailored 4-way stretch performance trousers with articulated knees and water-resistant finish.",
      sortOrder: 2,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_golf_shorts",
      name: "Golf Shorts",
      slug: "golf-shorts",
      parentId: "cat_golfwear",
      description: "Breathable stretch athletic shorts engineered for fairway mobility and clubhouse styling.",
      sortOrder: 3,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_activewear",
      name: "ACTIVEWEAR",
      slug: "activewear",
      parentId: null,
      description: "High-performance training, fitness, and gym apparel tailored for active lifestyle brands.",
      image: "/images/products/Shirts/1.png",
      sortOrder: 2,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_training_tshirts",
      name: "Training T-Shirts",
      slug: "training-t-shirts",
      parentId: "cat_activewear",
      description: "Moisture-wicking training shirts with flatlock anti-chafing ergonomic construction.",
      sortOrder: 1,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_tank_tops",
      name: "Tank Tops",
      slug: "tank-tops",
      parentId: "cat_activewear",
      description: "Lightweight athletic tank tops with high airflow ventilation for gym and workout training.",
      sortOrder: 2,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_compression",
      name: "Compression Wear",
      slug: "compression-wear",
      parentId: "cat_activewear",
      description: "Compression arm sleeves and baselayers with graduated muscle recovery support.",
      sortOrder: 3,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_teamwear",
      name: "TEAMWEAR",
      slug: "teamwear",
      parentId: null,
      description: "Sublimated match kits, team training jerseys, and coordinated club uniforms.",
      image: "/images/products/Polo/1.png",
      sortOrder: 3,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cat_team_jerseys",
      name: "Team Jerseys",
      slug: "team-jerseys",
      parentId: "cat_teamwear",
      description: "Full sublimation match jerseys engineered with high-durability interlock polyester.",
      sortOrder: 1,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_tracksuits",
      name: "TRACKSUITS",
      slug: "tracksuits",
      parentId: null,
      description: "Coordinated zippered performance jackets and tapered training pants sets.",
      image: "/images/products/Short/1.png",
      sortOrder: 4,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_polo_shirts",
      name: "POLO SHIRTS",
      slug: "polo-shirts",
      parentId: null,
      description: "Classic and modern athletic pique polos for corporate branding and sportswear lines.",
      image: "/images/products/Polo/1.png",
      sortOrder: 5,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_tshirts",
      name: "T-SHIRTS",
      slug: "t-shirts",
      parentId: null,
      description: "Performance dry-fit, heavy streetwear, and training crewneck t-shirts.",
      image: "/images/products/Shirts/1.png",
      sortOrder: 6,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_shorts",
      name: "SHORTS",
      slug: "shorts",
      parentId: null,
      description: "Performance 2-in-1 training, gym mobility, and running athletic shorts.",
      image: "/images/products/Short/1.png",
      sortOrder: 7,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_women_activewear",
      name: "WOMEN'S ACTIVEWEAR",
      slug: "womens-activewear",
      parentId: null,
      description: "Ergonomic women's athletic tops, training shirts, and seamless fitness apparel.",
      image: "/images/products/Women Shirt/1.png",
      sortOrder: 8,
      published: true,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: "cat_accessories",
      name: "ACCESSORIES",
      slug: "accessories",
      parentId: null,
      description: "Cabretta leather golf gloves, compression sleeves, and athletic performance gear.",
      image: "/images/products/Gloves/1.png",
      sortOrder: 9,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  // 3. VERIFIED B2B PRODUCTS
  const products: Product[] = [
    // GOLFWEAR
    {
      id: "prod_golf_01",
      name: "Performance Engineered Golf Polo",
      slug: "performance-engineered-golf-polo",
      categoryId: "cat_golfwear",
      subcategoryId: "cat_golf_polos",
      description: "Technical dry-fit pique knit with 4-way stretch, anti-curl collar, and UV sun protection.",
      image: "/images/products/Polo/2.png",
      gallery: ["/images/products/Polo/2.png", "/images/products/Polo/1.png"],
      specifications: ["92% Polyester / 8% Elastane", "Moisture-wicking dry fit", "Anti-curl collar", "Custom sizing XS–5XL"],
      published: true,
      featured: true,
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_golf_02",
      name: "Classic Athletic Pique Polo",
      slug: "classic-athletic-pique-polo",
      categoryId: "cat_golfwear",
      subcategoryId: "cat_golf_polos",
      description: "Refined athletic polo featuring structured rib collar and reinforced twin-needle stitching.",
      image: "/images/products/Polo/1.png",
      gallery: ["/images/products/Polo/1.png"],
      specifications: ["100% Micro-Pique Cotton/Poly", "Breathable knit construction", "Custom engraved buttons"],
      published: true,
      featured: false,
      sortOrder: 2,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_golf_03",
      name: "Modern Minimalist Golf Polo",
      slug: "modern-minimalist-golf-polo",
      categoryId: "cat_golfwear",
      subcategoryId: "cat_golf_polos",
      description: "Streamlined contemporary cut with laser-cut fused collar and aerodynamic athletic fit.",
      image: "/images/products/Polo/10.png",
      gallery: ["/images/products/Polo/10.png"],
      specifications: ["Ultralight athletic jersey", "Laser-cut collar & cuffs", "Silicone logo application"],
      published: true,
      featured: false,
      sortOrder: 3,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_golf_04",
      name: "Tour Edition Technical Polo",
      slug: "tour-edition-technical-polo",
      categoryId: "cat_golfwear",
      subcategoryId: "cat_golf_polos",
      description: "Premium tour-grade fabric blend engineered for maximum flexibility and odor control.",
      image: "/images/products/Polo/3.png",
      gallery: ["/images/products/Polo/3.png"],
      specifications: ["88% Micro-Poly / 12% Spandex", "Anti-microbial treatment", "UPF 50+ UV protection"],
      published: true,
      featured: false,
      sortOrder: 4,
      createdAt: now,
      updatedAt: now,
    },

    // ACTIVEWEAR
    {
      id: "prod_act_01",
      name: "Athletic Training Performance Tee",
      slug: "athletic-training-performance-tee",
      categoryId: "cat_activewear",
      subcategoryId: "cat_training_tshirts",
      description: "Ergonomic multi-panel activewear shirt with flatlock anti-chafing seams.",
      image: "/images/products/Shirts/1.png",
      gallery: ["/images/products/Shirts/1.png"],
      specifications: ["100% Interlock Polyester", "Flatlock athletic seams", "Rapid-dry breathability"],
      published: true,
      featured: true,
      sortOrder: 5,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_act_02",
      name: "Breathable Conditioning Workout Tee",
      slug: "breathable-conditioning-workout-tee",
      categoryId: "cat_activewear",
      subcategoryId: "cat_training_tshirts",
      description: "Lightweight workout shirt tailored for high-intensity gym training and fitness labels.",
      image: "/images/products/Shirts/5.png",
      gallery: ["/images/products/Shirts/5.png"],
      specifications: ["Ultralight athletic knit", "Reinforced shoulder tape", "Custom silicone branding"],
      published: true,
      featured: false,
      sortOrder: 6,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_act_03",
      name: "High-Ventilation Athletic Shirt",
      slug: "high-ventilation-athletic-shirt",
      categoryId: "cat_activewear",
      subcategoryId: "cat_training_tshirts",
      description: "Strategic micro-perforated back panel for maximum airflow during intense athletic output.",
      image: "/images/products/Shirts/20.png",
      gallery: ["/images/products/Shirts/20.png"],
      specifications: ["Perforated ventilation zones", "Silky lightweight handfeel", "Reflective heat transfer"],
      published: true,
      featured: false,
      sortOrder: 7,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_act_04",
      name: "Core Athletic Training Tank Top",
      slug: "core-athletic-training-tank-top",
      categoryId: "cat_activewear",
      subcategoryId: "cat_tank_tops",
      description: "Deep armhole performance tank top engineered for bodybuilders, athletes, and fitness clubs.",
      image: "/images/products/Tank Top/1.png",
      gallery: ["/images/products/Tank Top/1.png"],
      specifications: ["Pre-shrunk poly-cotton blend", "Reinforced armholes", "Anti-pilling treatment"],
      published: true,
      featured: false,
      sortOrder: 8,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_act_05",
      name: "Athletic Compression Arm Sleeves",
      slug: "athletic-compression-arm-sleeves",
      categoryId: "cat_activewear",
      subcategoryId: "cat_compression",
      description: "Graduated compression arm sleeves supporting muscle recovery and sun protection.",
      image: "/images/products/Sleeves/1.png",
      gallery: ["/images/products/Sleeves/1.png"],
      specifications: ["80% Nylon / 20% Spandex", "Non-slip silicone upper grip", "Graduated compression"],
      published: true,
      featured: false,
      sortOrder: 9,
      createdAt: now,
      updatedAt: now,
    },

    // SHORTS
    {
      id: "prod_short_01",
      name: "Performance 2-in-1 Training Shorts",
      slug: "performance-2-in-1-training-shorts",
      categoryId: "cat_shorts",
      subcategoryId: null,
      description: "4-way stretch outer shell with built-in compression liner, zippered phone pocket, and towel loop.",
      image: "/images/products/Short/1.png",
      gallery: ["/images/products/Short/1.png"],
      specifications: ["Water-resistant stretch fabric", "Built-in spandex liner", "Laser-cut ventilation"],
      published: true,
      featured: true,
      sortOrder: 10,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_short_02",
      name: "Pro Lightweight Gym Shorts",
      slug: "pro-lightweight-gym-shorts",
      categoryId: "cat_shorts",
      subcategoryId: null,
      description: "Ultra-breathable training shorts engineered for unrestricted mobility and speed.",
      image: "/images/products/Short/7.png",
      gallery: ["/images/products/Short/7.png"],
      specifications: ["Micro-mesh athletic fabric", "Encased elastic waistband", "Interior drawcord"],
      published: true,
      featured: false,
      sortOrder: 11,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_short_03",
      name: "Tailored Performance Athletic Shorts",
      slug: "tailored-performance-athletic-shorts",
      categoryId: "cat_shorts",
      subcategoryId: null,
      description: "Versatile hybrid shorts suitable for golf course rounds, training sessions, and clubhouse casual wear.",
      image: "/images/products/Short/15.png",
      gallery: ["/images/products/Short/15.png"],
      specifications: ["Stretch twill technical blend", "Belt loops & slant pockets", "Hidden zip stash pocket"],
      published: true,
      featured: false,
      sortOrder: 12,
      createdAt: now,
      updatedAt: now,
    },

    // ACCESSORIES
    {
      id: "prod_glove_01",
      name: "Cabretta Leather Performance Golf Glove",
      slug: "cabretta-leather-performance-golf-glove",
      categoryId: "cat_accessories",
      subcategoryId: null,
      description: "AAA Grade Cabretta leather palm with micro-perforated fingers for unmatched grip sensitivity and breathability.",
      image: "/images/products/Gloves/1.png",
      gallery: ["/images/products/Gloves/1.png"],
      specifications: ["100% Premium Cabretta Leather", "Perforated finger ventilation", "Custom rubberized magnetic ball marker"],
      published: true,
      featured: true,
      sortOrder: 13,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_glove_02",
      name: "All-Weather Synthetic Golf Glove",
      slug: "all-weather-synthetic-golf-glove",
      categoryId: "cat_accessories",
      subcategoryId: null,
      description: "Durable microfiber synthetic glove with reinforced palm patches for wet weather grip.",
      image: "/images/products/Gloves/2.png",
      gallery: ["/images/products/Gloves/2.png"],
      specifications: ["Engineered microfiber synthetic", "Reinforced leather palm patch", "Elasticized wrist contoured fit"],
      published: true,
      featured: false,
      sortOrder: 14,
      createdAt: now,
      updatedAt: now,
    },

    // WOMEN'S ACTIVEWEAR
    {
      id: "prod_women_01",
      name: "Women's Athletic Performance Training Shirt",
      slug: "womens-athletic-performance-training-shirt",
      categoryId: "cat_women_activewear",
      subcategoryId: null,
      description: "Contoured ergonomic cut tailored for female athletes, fitness instructors, and activewear labels.",
      image: "/images/products/Women Shirt/1.png",
      gallery: ["/images/products/Women Shirt/1.png"],
      specifications: ["88% Micro-Poly / 12% Spandex", "Curved flattering hemline", "Flatlock non-abrasive seams"],
      published: true,
      featured: true,
      sortOrder: 15,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "prod_women_02",
      name: "Women's Seamless Training Tee",
      slug: "womens-seamless-training-tee",
      categoryId: "cat_women_activewear",
      subcategoryId: null,
      description: "High-mobility seamless circular knit shirt with moisture-wicking technology.",
      image: "/images/products/Women Shirt/6.png",
      gallery: ["/images/products/Women Shirt/6.png"],
      specifications: ["Seamless circular knit", "Four-way high recovery stretch", "Custom heat seal branding"],
      published: true,
      featured: false,
      sortOrder: 16,
      createdAt: now,
      updatedAt: now,
    },
  ];

  return {
    users: [defaultAdmin],
    customerProfiles: [],
    categories,
    products,
    orders: [],
    orderItems: [],
    inquiries: [],
    auditLogs: [
      {
        id: "log_init",
        action: "SYSTEM_INITIALIZED",
        entity: "Database",
        details: "Database successfully seeded with default Administrator and verified SLOTS SPORTSWEAR catalogue.",
        createdAt: now,
      },
    ],
  };
}

export function seedDatabase(targetPath?: string): DatabaseSchema {
  const dbDir = path.join(process.cwd(), "data");
  const dbFile = targetPath || path.join(dbDir, "slots_db.json");

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Load existing database if present for safe idempotent merge
  let existingData: DatabaseSchema | null = null;
  if (fs.existsSync(dbFile)) {
    try {
      const raw = fs.readFileSync(dbFile, "utf-8");
      existingData = JSON.parse(raw);
    } catch {
      existingData = null;
    }
  }

  const seed = getSeedData();

  // Idempotent merge: Preserve existing users, orders, profiles, and inquiries
  let mergedUsers = [...seed.users];
  if (existingData && Array.isArray(existingData.users)) {
    const existingAdmins = existingData.users.filter((u) => u.role === "ADMIN");
    const existingCustomers = existingData.users.filter((u) => u.role === "CUSTOMER");
    
    // If admin already exists in existingData, retain it
    if (existingAdmins.length > 0) {
      mergedUsers = [...existingData.users];
    } else {
      mergedUsers = [...seed.users, ...existingCustomers];
    }
  }

  const finalSchema: DatabaseSchema = {
    users: mergedUsers,
    customerProfiles: existingData?.customerProfiles || seed.customerProfiles,
    categories: seed.categories,
    products: seed.products,
    orders: existingData?.orders || seed.orders,
    orderItems: existingData?.orderItems || seed.orderItems,
    inquiries: existingData?.inquiries || seed.inquiries,
    auditLogs: [
      ...(existingData?.auditLogs || []),
      {
        id: `log_seed_${Date.now()}`,
        action: "DATABASE_SEEDED",
        entity: "System",
        details: "Database seed executed successfully with verified categories and products.",
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const tempFile = `${dbFile}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(finalSchema, null, 2), "utf-8");
  fs.renameSync(tempFile, dbFile);

  console.log("=================================================");
  console.log("  SLOTS SPORTSWEAR DATABASE SEED COMPLETED");
  console.log("=================================================");
  console.log(`✓ Data File: ${dbFile}`);
  console.log(`✓ Default Admin: admin@slotssportswear.com`);
  console.log(`✓ Default Password: Admin@Slots2026`);
  console.log(`✓ Role: ADMIN`);
  console.log(`✓ Total Users: ${finalSchema.users.length}`);
  console.log(`✓ Categories Seeded: ${finalSchema.categories.length}`);
  console.log(`✓ Products Seeded: ${finalSchema.products.length}`);
  console.log("=================================================");

  return finalSchema;
}

// Run only when executed directly via CLI (e.g. npx tsx src/lib/db/seed.ts)
if (
  (typeof require !== "undefined" && require.main === module) ||
  (process.argv && process.argv[1] && (process.argv[1].endsWith("seed.ts") || process.argv[1].endsWith("seed.js")))
) {
  seedDatabase();
}

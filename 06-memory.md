# SLOTS SPORTSWEAR — Project Memory

> This is a living file. Update it regularly.

## Project Status
**Current phase:** Pre-Development / Planning

## Brand
SLOTS SPORTSWEAR

## Tech
- Next.js
- TypeScript
- App Router
- Full-stack Next.js backend
- SEO-first
- GA4-ready
- Search Console-ready

## Current Objective
Build a premium B2B custom sportswear manufacturing website focused on qualified quote generation.

## Approved Navigation
- Home
- About
- Products
- Capabilities
- Manufacturing
- Customization
- Contact

## Homepage Must-Haves
- sticky header
- logo
- prominent Get a Quote CTA
- 4-poster hero slider
- Golfwear poster
- Sportswear / Activewear poster
- Teamwear poster
- Manufacturing / Private Label poster
- 4 trust badges
- product showcase
- OEM / ODM / Private Label
- catalogue download
- manufacturing process
- authentic factory showcase
- business proof/statistics
- quote form
- tech-pack upload
- corporate footer

## Brand Colors
- SLOTS Black `#050505`
- SLOTS White `#FFFFFF`
- Graphite `#171717`
- Carbon Grey `#2A2A2A`
- Technical Grey `#777777`
- Light Grey `#E9E9E9`
- Performance Electric Lime `#B7FF00`

## Typography
- Sora — primary/display
- Inter — body/UI
- Barlow Condensed — optional display/technical use

## Current Open Items
- [ ] Final business address verified
- [ ] Official phone numbers verified
- [ ] Official email verified
- [ ] WhatsApp number verified
- [ ] Catalogue PDF selected/finalized
- [ ] Final 4 hero posters supplied/approved
- [ ] Authentic factory photo set supplied
- [ ] Product photography supplied
- [ ] Verified company metrics approved
- [ ] Upload storage provider chosen
- [ ] Database provider chosen
- [ ] Email notification method chosen
- [ ] GA4 measurement ID available
- [ ] Production domain available
- [ ] Search Console verification method selected

## Last Completed
- Task 01_HEADER: Production-ready Header and Navigation built matching visual reference and design system specs.
- Task 02_HERO: Production-ready Homepage Hero section with 4-poster slider (`hero-01.jpg` through `hero-04.jpg`), autoplay, pause on hover, mobile touch swipe, keyboard navigation, numbered indicators, and Electric Lime CTA accents verified with zero build errors.
- Task 03_TRUST_BADGES & Hero Autoplay Fix: Production-ready 4-item Trust Badges strip (Premium Quality, Low MOQ, On-Time Delivery, Global Export) with Graphite background, responsive grid layout, Lucide line icons, and zero layout shift. Hero autoplay stabilized with functional state updates and page visibility API support.
- Task 04_PRODUCTS: Production-ready Homepage Product Showcase section featuring 5 core categories (Golfwear with 2-col featured visual priority, Activewear, Teamwear, Tracksuits, Basics), 3-col responsive editorial grid, SectionHeading primitive, and View All Products CTA button.
- Task 05_OEM_ODM_PRIVATE_LABEL: Production-ready Homepage OEM / ODM / Private Label section featuring 3 engagement models with Lucide line icons, benefit checklists, and 'DISCUSS YOUR PROJECT' CTAs on Graphite background.
- Task 06_MANUFACTURING_PROCESS: Production-ready Homepage Our Manufacturing Process section featuring the full 10-step sequential timeline workflow, 4-phase photography cards, Lucide icons, technical stage numbering, SectionHeading, and 'START YOUR PROJECT' CTA on SLOTS Black background.
- TASK-07_FACTORY_TRUST: Production-ready Homepage Factory Trust & Manufacturing Proof section featuring cinematic Sialkot facility showcase, 6 authentic manufacturing proof cards (Fabric inspection, cutting, sewing, branding, QC, packing), and verified trust metrics on Graphite background.
- TASK-08_GET_A_QUOTE: Production-ready full-stack Get a Quote section (`QuoteSection.tsx`) at `#quote` with `POST /api/inquiry` and `POST /api/upload`, secure Tech Pack file handling outside web root, field validation, database persistence, and privacy-safe GA4 tracking.
- TASK-09_CERTIFICATES: Production-ready OUR CERTIFICATES section featuring a seamless infinite horizontal logo marquee (`InfiniteLogoMarquee.tsx`) rendering approved certificate logos (Sialkot Chamber of Commerce SCCI, FBR Pakistan, ISO Standards, and GMP Certified). Refactored for clean standalone transparent floating logos without individual container boxes or dark card backgrounds.
- TASK-10_SHIPPING_METHODS: Production-ready International Shipping & Global Logistics section (`ShippingMethods.tsx`) updated with verified terms from the Shipping Terms & Customs Duty Agreement (May 21, 2026). Features Option 01: DDP Cargo Service (All Costs Included / 8-10 business days / Exporter paid) and Option 02: Express Shipping via DHL (Fast Express Delivery / 4-6 business days / Client duties at delivery). Uses the shared `InfiniteLogoMarquee.tsx` moving right-to-left with transparent standalone logos. Mounted on clean brand light theme immediately following Certificates.
- TASK-11_PAYMENT_METHODS: Production-ready Payment Methods section (`PaymentMethods.tsx`) mounted on Graphite background immediately following Shipping Methods. Reuses the shared `InfiniteLogoMarquee.tsx` (moving left-to-right) for seamless continuous linear movement with standalone transparent vector marks (Bank Transfer, Wire Transfer / T/T). Includes 4 security/governance micro-indicators and a clear advisory note stating bank credentials and terms are confirmed per order agreement. Zero unverified banking promises or published account details.
- TASK-12_WHY_CHOOSE: Production-ready Why Choose SLOTS SPORTSWEAR section (`WhyChoose.tsx`) mounted in its correct position — after Trust Badges (#03) and before Products (#04) per 01-project-requirements.md and 08-homepage-section-build-order.md. Editorial two-column layout: left statement column (eyebrow, H2, supporting text, proof micro-list, START YOUR PROJECT CTA with ArrowRight), right 4×2 advantage card grid (`WhyChooseCard.tsx`). 8 approved value points from `src/data/trust.ts`. Graphite background, Electric Lime icon hover accents, pure Server Component, zero invented business claims.
- TASK-13_SOCIAL_PROOF: Production-ready Social Proof / Company Capabilities section (`SocialProof.tsx`) mounted between Payment Methods and Get a Quote. Features a 4-column responsive metrics grid (`MetricCard.tsx`) with accessible viewport-triggered count-up animation, reduced-motion support, verified metrics from MD documentation (10+ Years Experience, 250+ Global Clients, 50K+ Monthly Production, 100+ Product Options), dark graphite aesthetic, and WORK WITH US conversion banner strip.
- TASK-15_CONTACT_EMAIL_DELIVERY: Production-ready transactional email delivery integration for Contact / Get a Quote (`/api/inquiry` and `src/lib/email.ts`). Configured with Resend transactional email API, recipient `shahrangujjar00@gmail.com`, verified sender identity, input sanitation, database persistence, and duplicate submission prevention. Server-side credentials securely stored in `.env.local` with zero client-side exposure.
- TASK-14_CATALOGUE_AND_QUOTE_CONTACT_UPDATE: Production-ready Catalogue Access section (`CatalogueSection.tsx`) mounted between Social Proof (#11) and Get a Quote (#13) using the official `public/slots-catalogue.pdf` with direct VIEW and DOWNLOAD actions and interactive book art preview. Updated Quote Form (`QuoteForm.tsx` & `src/lib/validations.ts`) to support optional Business Email OR Phone/WhatsApp with synchronized frontend/backend validation. Enhanced transactional email (`src/lib/email.ts`) with a direct clickable Tech Pack download button and dynamic Email/WhatsApp reply actions.
- TASK-11_PAYMENT_METHODS_LIGHT_THEME_REDESIGN: Redesigned the Payment Methods section into a light-themed layout (`PaymentMethods.tsx` & `src/data/payments.ts`). Features soft light grey background (`#F5F5F3`), blue top badge (`#2563EB`, "• SECURE B2B TRANSACTIONS •"), dark charcoal heading (`#171717`), four-logo static horizontal row (Bank Transfer, Remitly, Venmo, MoneyGram) with uppercase labels (`#374151`), and four white feature cards (`#FFFFFF`, `#D9DEE7` border) with blue icons (Shield, Globe, Lock, Info in `#2563EB`) preserving exact approved copy verbatim.
- TASK-18_MASTER_VISUAL_CONSISTENCY_AND_NEW_ARRIVALS: Unified homepage sections into 3 coherent theme families (Theme 01: Trust/Logistics/Payment in clean light #F5F5F3/#FFFFFF with #2563EB blue accents; Theme 02: Product/Capability in clean light #FFFFFF/#F5F5F3 with #B7FF00 accents; Theme 03: Manufacturing/Brand Development in dark #050505/#171717 with #B7FF00 accents). Standardized vertical spacing rhythm to 64px desktop default, compacted Trust Badges into a white credibility strip (#FFFFFF, dark text, 28-36px padding), and inserted the new New Arrivals section (`NewArrivals.tsx` & `src/data/products.ts`) featuring 8 authentic products in a 4×2 desktop grid directly under BUILT FOR PERFORMANCE.

## Current File Being Worked On
`src/app/page.tsx`

## Next Action
Production deployment / final handover.

## V2 Homepage Additions
- [x] Why Choose SLOTS SPORTSWEAR section (Task 12)
- [x] Full 10-step Our Manufacturing Process section (Task 06)
- [x] Factory Showcase & Manufacturing Proof section (Task 07)
- [x] Our Certificates & Infinite Logo Marquee (Task 09)
- [x] Chamber of Commerce / company certificate
- [x] FBR Tax / Taxpayer Certificate — 2026
- [x] Other verified certificates
- [x] Shipping Methods section (Task 10)
- [x] Payment Methods section (Task 11)
- [x] Verified social proof section (Task 13)

## V2 Content Verification
- [ ] Certificate documents approved for public display
- [ ] Shipping methods verified
- [ ] Payment methods and terms verified
- [ ] Manufacturing process verified by production team
- [ ] Why Choose claims approved by management
- [ ] All public metrics verified

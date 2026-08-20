export interface HeroSlide {
  id: string;
  number: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    number: '01',
    category: 'GOLFWEAR & BASICS',
    eyebrow: '01 — GOLFWEAR & CASUAL',
    title: 'CASUAL ESSENTIALS',
    description: 'Premium performance golf & casual apparel engineered for your brand.',
    image: '/images/hero/hero-01.jpg',
    alt: 'SLOTS SPORTSWEAR Casual Essentials and Golfwear manufacturing',
  },
  {
    id: 'slide-02',
    number: '02',
    category: 'SPORTSWEAR / ACTIVEWEAR',
    eyebrow: '02 — SPORTSWEAR & ACTIVE',
    title: 'PLAY. PERFORM. WIN.',
    description: 'Custom performance sportswear engineered for athletes and modern apparel brands.',
    image: '/images/hero/hero-02.jpg',
    alt: 'SLOTS SPORTSWEAR Performance Soccer Uniform and Training Activewear',
  },
  {
    id: 'slide-03',
    number: '03',
    category: 'TEAMWEAR & LEATHER',
    eyebrow: '03 — TEAMWEAR & LEATHER',
    title: 'LEATHER & TEAMWEAR',
    description: 'Custom teamwear and leather outerwear crafted to endure and impress.',
    image: '/images/hero/hero-03.jpg',
    alt: 'SLOTS SPORTSWEAR Premium Leather Jacket and Outerwear production',
  },
  {
    id: 'slide-04',
    number: '04',
    category: 'OEM / PRIVATE LABEL',
    eyebrow: '04 — OEM / PRIVATE LABEL',
    title: 'STREETWEAR & OEM',
    description: 'From tech pack development to full-package custom branded apparel production.',
    image: '/images/hero/hero-04.jpg',
    alt: 'SLOTS SPORTSWEAR Custom Streetwear Hoodie and Private Label Manufacturing',
  },
];

export const HERO_CONTENT = {
  headline: 'ENGINEERED FOR YOUR BRAND.',
  subheadline:
    'Premium custom sportswear manufacturing for international B2B brands, teams and private-label buyers.',
  primaryCta: {
    label: 'GET A QUOTE',
    href: '/contact#quote',
  },
  secondaryCta: {
    label: 'VIEW PRODUCTS',
    href: '/products',
  },
};

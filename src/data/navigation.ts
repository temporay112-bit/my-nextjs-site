export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Customization", href: "/customization" },
  { label: "Contact", href: "/contact" },
];

export const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  ...NAV_ITEMS,
];

export const PRIMARY_CTA = {
  label: "GET A QUOTE",
  href: "/contact#quote",
};

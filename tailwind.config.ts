import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "slots-black": "#050505",
        "slots-white": "#FFFFFF",
        graphite: "#171717",
        "carbon-grey": "#2A2A2A",
        "technical-grey": "#777777",
        "light-grey": "#E9E9E9",
        "electric-lime": "#B7FF00",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        barlow: ["var(--font-barlow)", "sans-serif"],
      },
      boxShadow: {
        header: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        "header-scrolled": "0 4px 20px -2px rgba(5, 5, 5, 0.08), 0 2px 6px -2px rgba(5, 5, 5, 0.04)",
        "cta-glow": "0 0 20px -3px rgba(183, 255, 0, 0.45)",
      },
      letterSpacing: {
        "widest-brand": "0.18em",
        technical: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;

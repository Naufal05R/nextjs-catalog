import type { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        display: ["var(--font-playfair-display)"],
        body: ["var(--font-outfit)"],
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [
    twAnimate,
    plugin(({ addBase, addUtilities }) => {
      addBase({
        ":root": {
          "@apply text-slate-800": {},
        },
        "html, body": {
          scrollBehavior: "smooth",
          fontFamily: "var(--font-outfit)",
        },
        "h1, h2, h3": {
          fontFamily: "var(--font-playfair-display)",
        },
        "img, a": {
          "user-drag": "none",
          "-webkit-user-drag": "none",
        },
      });
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "hidden",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".card-shadow": {
          "@apply shadow-[0_0_24px_2px_theme(colors.slate.200/0.5)] hover:shadow-[0_4px_24px_2px_theme(colors.slate.300/0.5)]":
            {},
        },
      });
    }),
  ],
};
export default config;

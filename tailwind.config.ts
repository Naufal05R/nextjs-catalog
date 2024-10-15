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
      fontFamily: {
        display: ["var(--font-playfair-display)"],
        body: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [
    twAnimate,
    plugin(({ addBase }) => {
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
      });
    }),
  ],
};
export default config;

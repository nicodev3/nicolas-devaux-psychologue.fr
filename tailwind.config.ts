import type { Config } from "tailwindcss";

/**
 * Tailwind v4 : chargé via `@config` dans `src/styles/global.css`.
 * Palette (surfaces, encre, marque terracotta, info, danger) : variables OKLCH dans `@theme` du même fichier.
 */
export default {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        display: [
          '"Source Serif 4 Variable"',
          "ui-serif",
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        sans: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        ui: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;

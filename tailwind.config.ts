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
          '"Playfair Display"',
          "ui-serif",
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        ui: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;

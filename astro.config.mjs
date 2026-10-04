// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import remarkAutolinkKeywords from "./src/remark/remark-autolink-keywords.js";
import remarkFaqHeadingId from "./src/remark/remark-faq-heading-id.js";
import remarkFrenchPunctuationSpacing from "./src/remark/remark-french-punctuation-spacing.js";
import keywordMap from "./src/remark/keyword-map.js";
import rehypeExternalLinks from "./src/remark/rehype-external-links.js";
import rehypeCiteUrls from "./src/remark/rehype-cite-urls.js";
import llmsMd, {
  SITE_LLMS_DESCRIPTION,
  SITE_LLMS_NAME,
} from "./src/integrations/llms-md.mjs";

const redirectedPaths = new Set([
  "/blog/emdr-mosaic/",
  "/blog/therapie-couple/",
  "/blog/therapie-fondee-compassion/",
  "/blog/techniques-activation-conscience/",
  "/approches/",
  "/psychotherapies/",
  "/qui-suis-je/",
  "/mosaic/",
  "/act/",
  "/mbct/",
  "/cft/",
  "/tcc-3e-vague/",
  "/tac/",
  "/tarifs",
]);

// https://astro.build/config
export default defineConfig({
  site: "https://nicolas-devaux-psychologue.fr",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        return !url.searchParams.has("s") && !redirectedPaths.has(url.pathname);
      },
    }),
    // Parcours fs local : ne pas utiliser llms() (glob Windows → llms.txt vides).
    llmsMd({
      siteUrl: "https://nicolas-devaux-psychologue.fr",
      name: SITE_LLMS_NAME,
      description: SITE_LLMS_DESCRIPTION,
    }),
    alpinejs(),
    react(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        [remarkFrenchPunctuationSpacing, {}],
        [remarkFaqHeadingId, {}],
        [remarkAutolinkKeywords, { keywordMap, perPageLimit: 6 }],
      ],
      rehypePlugins: [
        [rehypeCiteUrls, {}],
        [rehypeExternalLinks, {}],
      ],
    }),
  },
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});

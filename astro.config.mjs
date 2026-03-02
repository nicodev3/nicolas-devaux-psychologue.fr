// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import alpinejs from '@astrojs/alpinejs';


import tailwindcss from '@tailwindcss/vite';
import remarkAutolinkKeywords from './src/remark/remark-autolink-keywords.js';
import remarkFrenchPunctuationSpacing from './src/remark/remark-french-punctuation-spacing.js';
import keywordMap from './src/remark/keyword-map.js';
import rehypeExternalLinks from './src/remark/rehype-external-links.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolas-devaux-psychologue.fr',
    integrations: [mdx(), sitemap(), alpinejs()],
    markdown: {
        remarkPlugins: [
            [remarkFrenchPunctuationSpacing, {}],
            [remarkAutolinkKeywords, { keywordMap, perPageLimit: 6 }],
        ],
        rehypePlugins: [
            [rehypeExternalLinks, {}],
        ],
    },
    vite: {
        plugins: [ /** @type {any} */ (tailwindcss())],
    },
});

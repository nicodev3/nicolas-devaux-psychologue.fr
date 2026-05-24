// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import alpinejs from '@astrojs/alpinejs';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import remarkAutolinkKeywords from './src/remark/remark-autolink-keywords.js';
import remarkFrenchPunctuationSpacing from './src/remark/remark-french-punctuation-spacing.js';
import keywordMap from './src/remark/keyword-map.js';
import rehypeExternalLinks from './src/remark/rehype-external-links.js';

const redirectedPaths = new Set([
    '/blog/emdr-mosaic/',
    '/blog/therapie-fondee-compassion/',
    '/approches/',
    '/psychotherapies/',
    '/qui-suis-je/',
    '/mosaic/',
    '/act/',
    '/mbct/',
    '/cft/',
    '/tcc-3e-vague/',
    '/tarifs',
]);

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolas-devaux-psychologue.fr',
    integrations: [
        mdx(),
        sitemap({
            filter: (page) => {
                const url = new URL(page);
                return !url.searchParams.has('s') && !redirectedPaths.has(url.pathname);
            },
        }),
        alpinejs(),
        react(),
    ],
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

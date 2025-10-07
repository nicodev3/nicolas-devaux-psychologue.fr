// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import alpinejs from '@astrojs/alpinejs';

import robotsTxt from 'astro-robots-txt';

import tailwindcss from '@tailwindcss/vite';
import remarkAutolinkKeywords from './src/remark/remark-autolink-keywords.js';
import keywordMap from './src/remark/keyword-map.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolas-devaux-psychologue.fr',
    integrations: [mdx(), sitemap(), alpinejs(), robotsTxt()],
    markdown: {
        remarkPlugins: [
            [remarkAutolinkKeywords, { keywordMap, perPageLimit: 6 }],
        ],
    },

    image: {
        service: passthroughImageService(),
    },

    vite: {
        plugins: [ /** @type {any} */ (tailwindcss())],
    },
});
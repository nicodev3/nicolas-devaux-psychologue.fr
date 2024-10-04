// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import alpinejs from '@astrojs/alpinejs';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://nicolas-devaux-psychologue.fr',
    integrations: [mdx(), sitemap(), alpinejs(), tailwind()],
    image: {
        service: passthroughImageService(),
    },
});

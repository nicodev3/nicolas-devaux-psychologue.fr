// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import alpinejs from '@astrojs/alpinejs';

import robotsTxt from 'astro-robots-txt';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nicolas-devaux-psychologue.fr',
  integrations: [mdx(), sitemap(), alpinejs(), robotsTxt()],

  image: {
      service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
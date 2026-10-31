// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  site: 'https://unsw-data-soc.github.io',
  base: '/',

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400', '500', '700'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Syne',
      cssVariable: '--font-syne',
      weights: ['400', '700', '800'],
      styles: ['normal'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Astro builds with target 'esnext', so the CSS minifier drops the -webkit- prefixes Safari 16-17 need; this is
      // Vite 8's baseline-widely-available list.
      cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4'],
    },
    resolve: {
      alias: import.meta.env.PROD ? { 'react-dom/server': 'react-dom/server.edge' } : undefined,
    },
  },

  integrations: [alpinejs(), react()],
});

// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import alpinejs from "@astrojs/alpinejs";


// https://astro.build/config
export default defineConfig({
  output: "static",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [alpinejs()],
});
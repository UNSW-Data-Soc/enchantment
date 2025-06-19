// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react"


// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  site: 'https://unsw-data-soc.github.io',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: import.meta.env.PROD ? { "react-dom/server": "react-dom/server.edge" } : undefined,
    }
  },

  integrations: [alpinejs(),react()],
});

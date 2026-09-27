// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  output: "static",

  site: 'https://unsw-data-soc.github.io',
  base: '/',

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400", "500", "700"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Syne",
      cssVariable: "--font-syne",
      weights: ["400", "700", "800"],
      styles: ["normal"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: import.meta.env.PROD ? { "react-dom/server": "react-dom/server.edge" } : undefined,
    }
  },

  integrations: [alpinejs(),react()],
});

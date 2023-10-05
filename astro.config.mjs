import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    tailwind(),
    preact({
      compat: true,
    }),
    mdx(),
  ],
});

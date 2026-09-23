import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://adegavistaalegre.com.br',
  server: {
    port: 4321,
    host: true
  }
});

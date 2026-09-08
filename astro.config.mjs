import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// Para rodar build local SSR sem Vercel, use:
// import node from '@astrojs/node';
// adapter: node({ mode: 'standalone' }),

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://adegavistaalegre.com.br',
  output: 'server',
  adapter: vercel(),
  server: {
    port: 4321,
    host: true
  }
});

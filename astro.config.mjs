import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// Para deploy na Vercel, substitua o adapter acima por:
// import vercel from '@astrojs/vercel/serverless';
// Lembre-se também de instalar: npm install @astrojs/vercel

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://adegavistaalegre.com.br',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    port: 4321,
    host: true
  }
});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.terrerov.com',
  integrations: [sitemap()],
  server: {
    allowedHosts: true
  },
  vite: {
    preview: {
      allowedHosts: true
    }
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'
import { hotelJsonLd } from './vite-plugins/hotel-jsonld'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    hotelJsonLd(),
    sitemap({
      hostname: 'https://astoriahotels.ro',
      generateRobotsTxt: false,
      dynamicRoutes: [
        '/camere',
        '/camere/apartament',
        '/camere/standard',
        '/camere/standard-balcon',
        '/restaurant',
        '/restaurant/meniu',
        '/pool-park',
        '/pool-park/meniu',
        '/evenimente',
        '/evenimente/nunta',
        '/evenimente/botez',
        '/evenimente/pool-party',
        '/evenimente/majorat',
        '/evenimente/petrecere-copii',
        '/sustenabilitate',
        '/welcome-to-alba',
        '/blog',
        '/blog/ce-pot-vizita-in-alba-iulia-in-24-de-ore',
        '/contact',
        '/politica-confidentialitate',
        '/termeni-conditii',
        '/cookies',
      ],
      outDir: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/lucide-react')) return 'icons'
          if (id.includes('node_modules/embla-carousel')) return 'embla'
          if (id.includes('node_modules/lenis') && !id.includes('embla')) return 'lenis'
          if (id.includes('node_modules/react-helmet-async')) return 'helmet'
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform') || id.includes('node_modules/zod')) return 'forms'
        },
      },
    },
  },
})

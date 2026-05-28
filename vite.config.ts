import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://astoriahotels.ro',
      routes: [
        '/',
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
        '/sustenabilitate',
        '/welcome-to-alba',
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
          if (id.includes('node_modules/@studio-freight/lenis')) return 'lenis'
          if (id.includes('node_modules/react-helmet-async')) return 'helmet'
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform') || id.includes('node_modules/zod')) return 'forms'
        },
      },
    },
  },
})

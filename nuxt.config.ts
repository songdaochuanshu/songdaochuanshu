// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  
  css: ['~/assets/css/main.css'],
  
  ssr: true,
  
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  
  nitro: {
    compressPublicAssets: true
  },
  
  typescript: {
    strict: false
  },
  
  routeRules: {
    '/p/**': { spaReload: false }
  }
})

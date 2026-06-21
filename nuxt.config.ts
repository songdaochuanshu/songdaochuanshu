// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  
  ssr: true,
  
  nitro: {
    compressPublicAssets: true
  },
  
  typescript: {
    strict: false
  },
  
  routeRules: {
    '/p/**': { spaReload: false }
  },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  tailwindcss: {
    cssPath: ['~/assets/css/main.css', { respectPrefix: false, config: './tailwind.config.js' }],
    config: {},
    viewer: false,
  }
})

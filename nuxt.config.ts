// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  ssr: true,
  
  runtimeConfig: {
    public: {
      baseUrl: 'https://blog-static.openserve.cloud'
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

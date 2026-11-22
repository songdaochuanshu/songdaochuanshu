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

  runtimeConfig: {
    // TURNSTILE_SECRET_KEY：Cloudflare Pages 环境变量 / 密钥，仅服务端可见
    turnstileSecretKey: '',
    public: {
      // NUXT_PUBLIC_TURNSTILE_SITE_KEY：构建时注入，前端渲染 Turnstile 组件用
      turnstileSiteKey: ''
    }
  },
  

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'author', content: '松岛川树' },
        { property: 'og:site_name', content: '松岛川树' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'alternate', type: 'application/rss+xml', title: '松岛川树 RSS', href: '/rss.xml' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        { innerHTML: "if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}" }
      ]
    }
  }
})

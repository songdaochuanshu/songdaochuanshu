// nuxt.config.ts
import { siteConfig } from './site.config'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/stylelint-module',
  ],

  app: {
    rootId: 'nuxt-root',
    head: {
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'author', content: siteConfig.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'google-site-verification', content: 'cq8NtNqiDFl3jaKDI9eQp6zEwJnwQ6aGRzjGMLEdAd4' },
        { name: 'google-site-verification', content: 'FaH6gbHuSvjyz1Y-uGqyJ06ooDRPMdEpBDDCCnf0GhI' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { content: 'IE=edge', 'http-equiv': 'X-UA-Compatible' },
      ],
      noscript: [{ innerHTML: 'JavaScript is required' }],
      htmlAttrs: { lang: siteConfig.lang },
      bodyAttrs: { class: 'font-sans' },
    },
  },

  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
        sepia: 'monokai',
      },
      preload: ['c', 'cpp', 'java'],
    },
    // 禁用 content API 缓存，避免生成超大文件（712篇文章导致 35MB+）
    // Cloudflare Pages 单文件限制 25MB
    // 使用 directory 驱动替代内存缓存
    driver: 'fs',
    baseURL: '/api/_content',
  },

  nitro: {
    // 禁用 Nitro 的 API 路由生成，避免生成 api/_content/cache.json
    prerender: {
      routes: [],
      crawlLinks: false,
    },
    // 限制单个输出文件大小
    compressPublicAssets: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/global.scss',
    '@/assets/styles/theme.css',
    '@/assets/styles/transition.css',
    '@/assets/styles/markdown.scss',
  ],

  stylelint: {
    lintOnStart: false,
  },

  compatibilityDate: '2024-12-31',
})

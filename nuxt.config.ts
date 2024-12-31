// nuxt.config.ts
import { siteConfig } from './site.config'

// 假设存在一个类型定义文件

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
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      ],
      noscript: [{ children: 'JavaScript is required' }],
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

  // 可选地添加更多配置项，比如 i18n, seo, security headers 等
})

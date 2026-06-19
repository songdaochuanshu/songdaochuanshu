// nuxt.config.ts
import { siteConfig } from "./site.config";

export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    // @nuxt/content 已移除，文章改存 R2
    "@nuxtjs/stylelint-module",
  ],

  app: {
    rootId: "nuxt-root",
    head: {
      meta: [
        { name: "description", content: siteConfig.description },
        { name: "author", content: siteConfig.author },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "google-site-verification",
          content: "cq8NtNqiDFl3jaKDI9eQp6zEwJnwQ6aGRzjGMLEdAd4",
        },
        {
          name: "google-site-verification",
          content: "FaH6gbHuSvj1Y-uGqyJ06ooDRPMdEpBDDCCnf0GhI",
        },
        { name: "revisit-after", content: "7 days" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { charset: "UTF-8" },
        { content: "IE=edge", "http-equiv": "X-UA-Compatible" },
      ],
      noscript: [{ innerHTML: "JavaScript is required" }],
      htmlAttrs: { lang: siteConfig.lang },
      bodyAttrs: { class: "font-sans" },
    },
  },

  runtimeConfig: {
    public: {
      // Cloudflare Pages 后台设置环境变量 NUXT_PUBLIC_R2_BASE 覆盖
      r2Base: process.env.NUXT_PUBLIC_R2_BASE || "https://blog-static.openserve.cloud",
    },
  },

  nitro: {
    // SSR 模式，部署到 Cloudflare Pages
    preset: "cloudflare-pages",
    output: {
      publicDir: "dist",
    },
    prerender: {
      // 只预渲染索引页，文章 /p/** 走 SSR 从 R2 拉
      routes: [
        "/",
        "/blog",
        "/life",
        "/record",
        "/tags",
        "/search",
        "/projects",
        "/me",
      ],
      crawlLinks: false,
      failOnError: false,
    },
  },

  css: [
    "@unocss/reset/tailwind.css",
    "@/assets/styles/global.scss",
    "@/assets/styles/theme.css",
    "@/assets/styles/transition.css",
    "@/assets/styles/markdown.scss",
  ],

  stylelint: {
    lintOnStart: false,
  },

  compatibilityDate: "2024-12-31",
});
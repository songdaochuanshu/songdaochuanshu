// nuxt.config.ts
import { siteConfig } from "./site.config";

export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/content",
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
          content: "FaH6gbHuSvjyz1Y-uGqyJ06ooDRPMdEpBDDCCnf0GhI",
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

  content: {
    highlight: {
      theme: {
        default: "vitesse-light",
        dark: "vitesse-dark",
        sepia: "monokai",
      },
      preload: ["c", "cpp", "java"],
    },
  },

  nitro: {
    prerender: {
      routes: [
        "/",
        "/blog",
        "/life",
        "/record",
        "/tags",
        "/search",
        "/projects",
        "/me",
      ], // 确保基本页面被预渲染
      crawlLinks: true,
    },
  },

  hooks: {
    // 构建完成后删除 /api/_content 目录
    "build:manifest": (manifest) => {
      // 在 Nitro 构建时移除 content API 路由
    },
    "content:file:afterParse": async (file) => {
      // 动态生成所有文章的路由
      if (file._id.endsWith(".md")) {
        const path = file._path;
        if (path && !nitro.prerender.routes.includes(path)) {
          nitro.prerender.routes.push(path);
        }
      }
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

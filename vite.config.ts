import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Prism from 'markdown-it-prism'
import viteSSR from 'vite-ssr/plugin'
import getPageProps from './serverless/api/get-page-props'
import AutoImport from 'unplugin-auto-import/vite'
import generateSitemap from 'vite-ssg-sitemap'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            'useStorage',
            'usePreferredDark',
            'useToggle',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          // 'axios': [
          //   // default imports
          //   ['default', 'axios'] // import { default as axios } from 'axios',
          // ],
          '[package-name]': [
            '[import-names]',
            // alias
            ['[from]', '[alias]']
          ]
        },
      ],
    }),
    viteSSR(),

    {
      // API mock-up
      configureServer({ middlewares }) {
        middlewares.use('/api/get-page-props', getPageProps)
      },
    },

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route: any, parent) {
        if (route.path.startsWith("/_posts")) {
          route.alias = route.path.replace("/_posts", "/articles")
          route.meta = {
            title: 'bn'
          }
          return route;
        }

        return {
          ...route,
        };
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperComponent: 'Md',
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true, // This relies on useHead
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: id => id.endsWith('.md'),

      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto',
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      runtimeCaching,
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, 'src/i18n/translations/**')],
    }),

  ],

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  ssgOptions: {
    onFinished() { generateSitemap() },
  },
})

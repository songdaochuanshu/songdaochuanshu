<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 13:39:49
 * @FilePath: \vite-blog\src\components\Header.vue
-->
<script setup lang="ts">
import { DEFAULT_LOCALE, SUPPORTED_LOCALES as locales } from '~/i18n'

const colorSchema = useStorage('color-schema', 'auto')

const preferredDark = usePreferredDark()

const isDark = computed({
  get() {
    return colorSchema.value === 'auto'
      ? preferredDark.value
      : colorSchema.value === 'dark'
  },
  set(v: boolean) {
    if (v === preferredDark.value) colorSchema.value = 'auto'
    else colorSchema.value = v ? 'dark' : 'light'
  },
})

const toggleDark = useToggle(isDark)

watch(
  isDark,
  (v) =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.toggle('dark', v),
  { immediate: true }
)

const { t, locale } = useI18n()

const route = useRoute()

const toggleLocales = () => {
  // change to some real logic
  const nextLocale =
    locales[(locales.indexOf(locale.value) + 1) % locales.length]

  const base = nextLocale === DEFAULT_LOCALE ? '' : `/${nextLocale}`

  window.location.pathname = base + route.fullPath
}
</script>

<template>
  <nav class="text-xl space-x-4 flex justify-end mt-5 mr-5">
    <router-link class="icon-btn" to="/" :title="t('button.home')">
      <carbon-campsite />
    </router-link>

    <a class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>

    <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>

    <router-link class="icon-btn" to="/about" :title="t('button.about')">
      <carbon-dicom-overlay />
    </router-link>

    <a
      class="icon-btn"
      rel="noreferrer"
      href="https://github.com/songdaochuanshu"
      target="_blank"
      :title="t('button.github')"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>

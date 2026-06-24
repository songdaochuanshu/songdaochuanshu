<template>
  <div class="giscus-container mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
    <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">评论</p>
    <div ref="giscusRef"></div>
  </div>
</template>

<script setup lang="ts">
const { isDark } = useDarkMode()
const giscusRef = ref<HTMLElement | null>(null)

const theme = computed(() => isDark.value ? 'dark' : 'light')

onMounted(() => {
  if (!giscusRef.value) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'songdaochuanshu/songdaochuanshu')
  script.setAttribute('data-repo-id', 'R_kgDOGPohWg')
  script.setAttribute('data-category', 'Ideas')
  script.setAttribute('data-category-id', 'DIC_kwDOGPohWs4CloQJ')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', theme.value)
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true
  giscusRef.value.appendChild(script)
})

watch(theme, (newTheme) => {
  const iframe = giscusRef.value?.querySelector('iframe.giscus-frame') as HTMLIFrameElement
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: newTheme } } },
    'https://giscus.app'
  )
})
</script>

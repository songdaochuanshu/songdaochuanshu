<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

// 定义是否为深色模式的响应式变量
const isDark = ref(false)

// 在组件挂载时检测当前主题
onMounted(() => {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDark.value)
})

// 切换主题的函数
function toggleTheme(event: MouseEvent) {
  if (isViewTransitionSupported())
    performViewTransition(event)
  else
    toggleDark()
}

// 执行视图转换动画
async function performViewTransition(event: MouseEvent) {
  const transition = document.startViewTransition(async () => {
    toggleDark()
    await nextTick()
  })

  transition.ready.then(() => animateClipPath(event))
}

// 检查浏览器是否支持视图转换API
function isViewTransitionSupported(): boolean {
  return typeof document.startViewTransition === 'function'
         && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 切换根元素的dark类
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 动画剪辑路径
function animateClipPath(event: MouseEvent) {
  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`,
  ]

  document.documentElement.animate(
    {
      clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
    },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)',
    },
  )
}
</script>

<template>
  <div
    title="Toggle Color Scheme"
    class="hover" :class="[isDark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun']"
    @click="toggleTheme"
  />
</template>

<style scoped>
.hover {
  cursor: pointer;
  transition: transform 0.1s ease;
}

.hover:hover {
  transform: scale(1.1);
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 定义是否为暗黑模式的响应式变量
const isDark = ref(false)

// 在组件挂载时检测当前主题
onMounted(() => {
  // 检测系统偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = prefersDark
  updateTheme(prefersDark)
})

// 切换主题的函数
function toggleTheme(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked
  isDark.value = isChecked
  updateTheme(isChecked)
}

// 更新主题
function updateTheme(isDark: boolean) {
  if (isDark)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')
}
</script>

<template>
  <label class="label" title="Toggle Dark Mode">
    <div class="toggle">
      <input
        class="toggle-state"
        type="checkbox"
        :checked="isDark"
        @change="toggleTheme"
      >
      <div class="indicator" />
    </div>
  </label>
</template>

<style scoped>
.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}

.toggle {
  isolation: isolate;
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow:
    -8px -4px 8px 0 #fff,
    8px 4px 12px 0 #d1d9e6,
    4px 4px 4px 0 #d1d9e6 inset,
    -4px -4px 4px 0 #fff inset;
}

.toggle-state {
  display: none;
}

.indicator {
  height: 100%;
  width: 200%;
  background: #ecf0f3;
  border-radius: 15px;
  transform: translate3d(-75%, 0, 0);
  transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
  box-shadow:
    -8px -4px 8px 0 #fff,
    8px 4px 12px 0 #d1d9e6;
}

.toggle-state:checked ~ .indicator {
  transform: translate3d(25%, 0, 0);
}
</style>

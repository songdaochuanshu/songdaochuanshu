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
  <label class="theme-toggle" title="Toggle Dark Mode">
    <div class="toggle-container">
      <input
        class="toggle-input"
        type="checkbox"
        :checked="isDark"
        @change="toggleTheme"
      >
      <div class="toggle-track">
        <div class="toggle-thumb">
          <span v-if="!isDark" class="icon-sun i-icon-park-outline-sunrise"></span>
          <span v-else class="icon-moon i-icon-park-outline-moon"></span>
        </div>
      </div>
    </div>
  </label>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toggle-container {
  position: relative;
  width: 56px;
  height: 28px;
}

.toggle-input {
  display: none;
}

.toggle-track {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, #e8f0ec 0%, #d4e0d8 100%);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.dark) .toggle-track {
  background: linear-gradient(135deg, #2a3a32 0%, #1a2520 100%);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(255, 255, 255, 0.05);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.dark) .toggle-thumb {
  left: 30px;
  background: linear-gradient(145deg, #3d6358, #4a7c6f);
}

.icon-sun,
.icon-moon {
  font-size: 14px;
  color: #4a7c6f;
  transition: all 0.3s ease;
}

:deep(.dark) .icon-sun,
:deep(.dark) .icon-moon {
  color: #8fc4ab;
}

.toggle-input:checked ~ .toggle-track .toggle-thumb {
  left: 30px;
}

:deep(.dark) .toggle-input:not(:checked) ~ .toggle-track .toggle-thumb {
  left: 2px;
}
</style>
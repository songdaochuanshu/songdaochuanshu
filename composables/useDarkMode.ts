import { useState } from '#imports'

export function useDarkMode() {
  const isDark = useState<boolean>('theme', () => false)
  const initialized = useState<boolean>('theme-initialized', () => false)

  function applyDark(val: boolean) {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', val)
      localStorage.setItem('theme', val ? 'dark' : 'light')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    applyDark(isDark.value)
  }

  function init() {
    if (!import.meta.client || initialized.value) return
    const saved = localStorage.getItem('theme')
    isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    applyDark(isDark.value)
    initialized.value = true
  }

  return { isDark, toggle, init }
}

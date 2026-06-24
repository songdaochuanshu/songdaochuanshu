export function useDarkMode() {
  const isDark = ref(false)

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
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyDark(isDark.value)
  }

  return { isDark, toggle, init }
}

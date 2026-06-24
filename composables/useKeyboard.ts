export function useKeyboard() {
  function onKey(handler: (e: KeyboardEvent) => void) {
    if (!import.meta.client) return
    const fn = (e: KeyboardEvent) => handler(e)
    document.addEventListener('keydown', fn)
    onUnmounted(() => document.removeEventListener('keydown', fn))
  }

  function focusSearch() {
    const input = document.querySelector<HTMLInputElement>('input[type="text"], input[placeholder*="搜索"]')
    if (input) {
      input.focus()
      input.select()
    }
  }

  return { onKey, focusSearch }
}

/**
 * 检测 hero 图片导航区域像素亮度，返回动态文字颜色 class。
 *
 * 直接用 imageUrl ref 加载图片采样，不查 DOM。
 * 采样区域：图片右上角 X 82%~98%, Y 4%~10%（导航文字位置）
 */
export function useNavTextColor(imageUrl: Ref<string>, ready: Ref<boolean>) {
  const isLight = ref(true)
  let sampledUrl = ''

  function sample(url: string) {
    if (typeof document === 'undefined' || !url || url === sampledUrl) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const w = img.naturalWidth
        const h = img.naturalHeight
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(img, 0, 0)

        const sx = Math.floor(w * 0.82)
        const sy = Math.floor(h * 0.04)
        const sw = Math.floor(w * 0.16)
        const sh = Math.floor(h * 0.06)

        const data = ctx.getImageData(sx, sy, sw, sh).data
        let total = 0
        const count = data.length / 4
        for (let i = 0; i < data.length; i += 4) {
          total += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
        }

        isLight.value = total / count > 128
        sampledUrl = url
      } catch (e) {
        console.warn('[NavColor] 采样失败:', e)
      }
    }
    img.onerror = () => {
      console.warn('[NavColor] 图片加载失败:', url)
    }
    img.src = url
  }

  watch(ready, (val) => {
    if (val && imageUrl.value) sample(imageUrl.value)
  }, { immediate: true })

  watch(imageUrl, (val) => {
    if (val && ready.value) sample(val)
  })

  const navTextClass = computed(() => {
    return isLight.value
      ? 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
      : 'text-white/80 hover:text-white dark:text-gray-200 dark:hover:text-white'
  })

  return { navTextClass, isLight }
}

/**
 * 自动检测 hero 图片导航区域的像素亮度，
 * 返回适合的文字颜色 class（亮背景用深色文字，暗背景用浅色文字）。
 *
 * 原理：不重复加载图片，等 hero <img> DOM 渲染后直接用 Canvas 采样。
 * 导航栏位置：absolute top-6 right-4~right-8
 * 采样区域：hero 图片右上角 X 82%~98%, Y 4%~10%
 */
export function useNavTextColor(imageUrl: Ref<string>, ready: Ref<boolean>) {
  const isLight = ref(true) // 默认浅色背景 → 深色文字
  let sampled = false

  function sampleFromDom() {
    if (typeof document === 'undefined' || sampled) return

    // 找到 hero 区域的背景图 div
    const heroDiv = document.querySelector('header div[class*="bg-cover"]') as HTMLElement | null
    if (!heroDiv) return

    const bgImage = getComputedStyle(heroDiv).backgroundImage
    if (!bgImage || bgImage === 'none') return

    const urlMatch = bgImage.match(/url\(["']?(.+?)["']?\)/)
    if (!urlMatch) return

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

        // 采样区域：导航文字所在的精确位置
        const startX = Math.floor(w * 0.82)
        const startY = Math.floor(h * 0.04)
        const sampleW = Math.floor(w * 0.16)
        const sampleH = Math.floor(h * 0.06)

        const data = ctx.getImageData(startX, startY, sampleW, sampleH).data
        let totalLuminance = 0
        let pixelCount = 0

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
          totalLuminance += luminance
          pixelCount++
        }

        const avgLuminance = totalLuminance / pixelCount
        isLight.value = avgLuminance > 128
        sampled = true
      } catch {
        // CORS 或其他错误，保持默认
      }
    }
    img.onerror = () => {
      // 加载失败，保持默认
    }
    img.src = urlMatch[1]
  }

  // ready 变 true 时采样
  watch(ready, (val) => {
    if (val) {
      // 延迟一帧等 DOM 渲染完
      nextTick(() => {
        setTimeout(sampleFromDom, 100)
      })
    }
  }, { immediate: true })

  // URL 变化时重新采样
  watch(imageUrl, () => {
    sampled = false
    if (ready.value) {
      nextTick(() => {
        setTimeout(sampleFromDom, 100)
      })
    }
  })

  const navTextClass = computed(() => {
    if (isLight.value) {
      return 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
    } else {
      return 'text-white/80 hover:text-white dark:text-gray-200 dark:hover:text-white'
    }
  })

  return { navTextClass, isLight }
}

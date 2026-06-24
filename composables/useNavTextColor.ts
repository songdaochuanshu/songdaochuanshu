/**
 * 自动检测 hero 图片导航区域的像素亮度，
 * 返回适合的文字颜色 class（亮背景用深色文字，暗背景用浅色文字）。
 *
 * 导航栏位置：absolute top-6 right-4~right-8
 * 图片区域：relative h-72 sm:h-96，导航在 absolute 定位
 * 
 * 采样区域计算（以 hero 图片为基准）：
 *   X: 82% ~ 98%（右上角导航文字水平范围）
 *   Y: 4% ~ 10%（top-6 = 24px，约 6%~7% 高度）
 */
export function useNavTextColor(imageUrl: Ref<string>, ready: Ref<boolean>) {
  const isLight = ref(true) // 默认浅色背景 → 深色文字

  function samplePixels(imgUrl: string) {
    if (typeof document === 'undefined') return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const w = img.naturalWidth
      const h = img.naturalHeight
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      // 采样区域：导航文字所在的精确位置
      // 导航栏在 absolute top-6 right-4~8，文字是 text-xs (12px)
      // 以图片右上角为基准：X 82%~98%, Y 4%~10%
      const startX = Math.floor(w * 0.82)
      const startY = Math.floor(h * 0.04)
      const sampleW = Math.floor(w * 0.16)
      const sampleH = Math.floor(h * 0.06)

      try {
        const data = ctx.getImageData(startX, startY, sampleW, sampleH).data
        let totalLuminance = 0
        let pixelCount = 0

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          // ITU-R BT.709 亮度公式
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
          totalLuminance += luminance
          pixelCount++
        }

        const avgLuminance = totalLuminance / pixelCount
        // 阈值 128：高于则为亮背景，用深色文字
        isLight.value = avgLuminance > 128
      } catch {
        // Canvas 被污染等错误，保持默认
      }
    }
    img.src = imgUrl
  }

  watch(ready, (val) => {
    if (val && imageUrl.value) {
      samplePixels(imageUrl.value)
    }
  }, { immediate: true })

  watch(imageUrl, (val) => {
    if (val && ready.value) {
      samplePixels(val)
    }
  })

  // 返回动态 class：深色模式始终用浅色文字，由暗色模式处理
  const navTextClass = computed(() => {
    if (isLight.value) {
      return 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
    } else {
      return 'text-white/80 hover:text-white dark:text-gray-200 dark:hover:text-white'
    }
  })

  return { navTextClass, isLight }
}

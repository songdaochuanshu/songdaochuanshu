const IMG_BASE = 'https://img-homepage.openserve.cloud'

interface ImageInfo {
  pid: number
  filename: string
  url: string
  ext: string
  size_kb: number
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = url
  })
}

export function useRandomImages() {
  const heroImage = ref(`${IMG_BASE}/82646886.jpg`)
  const bgImage = ref(`${IMG_BASE}/91365699.png`)
  const bgReady = ref(false)
  const heroReady = ref(false)

  if (import.meta.client) {
    // Default images are already set, mark ready after preload
    preloadImage(heroImage.value).then(() => { heroReady.value = true })
    preloadImage(bgImage.value).then(() => { bgReady.value = true })

    $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
      .then(async (images) => {
        if (!images?.length) return
        const shuffled = [...images].sort(() => Math.random() - 0.5)
        // Preload before showing
        await Promise.all([
          preloadImage(shuffled[0].url),
          preloadImage((shuffled[1] || shuffled[0]).url),
        ])
        heroImage.value = shuffled[0].url
        bgImage.value = (shuffled[1] || shuffled[0]).url
      })
      .catch(() => {})
  }

  return { heroImage, bgImage, bgReady, heroReady }
}

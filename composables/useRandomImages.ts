const IMG_BASE = 'https://img-homepage.openserve.cloud'

interface ImageInfo {
  pid: number
  filename: string
  url: string
  ext: string
  size_kb: number
}

export function useRandomImages() {
  const heroImage = ref(`${IMG_BASE}/82646886.jpg`)
  const bgImage = ref(`${IMG_BASE}/91365699.png`)

  if (import.meta.client) {
    $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
      .then(images => {
        if (!images?.length) return
        const shuffled = [...images].sort(() => Math.random() - 0.5)
        heroImage.value = shuffled[0].url
        bgImage.value = (shuffled[1] || shuffled[0]).url
      })
      .catch(() => {})
  }

  return { heroImage, bgImage }
}

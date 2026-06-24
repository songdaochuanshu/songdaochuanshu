const IMG_BASE = 'https://img-homepage.openserve.cloud'

interface ImageInfo {
  pid: number
  filename: string
  url: string
  ext: string
  size_kb: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

let cachedImages: ImageInfo[] | null = null

async function getImages(): Promise<ImageInfo[]> {
  if (cachedImages) return cachedImages
  try {
    const images = await $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
    if (images?.length) {
      cachedImages = images
      return images
    }
  } catch {}
  return []
}

export async function useRandomImages() {
  const heroImage = ref(`${IMG_BASE}/82646886.jpg`)
  const bgImage = ref(`${IMG_BASE}/91365699.png`)
  const bgReady = ref(false)
  const heroReady = ref(false)

  const images = await getImages()
  if (images.length === 0) {
    heroReady.value = true
    bgReady.value = true
    return { heroImage, bgImage, bgReady, heroReady }
  }

  const shuffled = shuffle(images)
  const heroTarget = shuffled[0]
  const bgTarget = shuffled[1] || shuffled[0]

  // SSR: 直接设 URL，客户端再预加载确保渐显
  if (import.meta.server) {
    heroImage.value = heroTarget.url
    bgImage.value = bgTarget.url
    heroReady.value = true
    bgReady.value = true
  } else {
    // 客户端：预加载后替换并渐显
    const heroImg = new Image()
    heroImg.onload = () => {
      heroImage.value = heroTarget.url
      heroReady.value = true
    }
    heroImg.src = heroTarget.url

    const bgImg = new Image()
    bgImg.onload = () => {
      bgImage.value = bgTarget.url
      bgReady.value = true
    }
    bgImg.src = bgTarget.url
  }

  return { heroImage, bgImage, bgReady, heroReady }
}

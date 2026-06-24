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
  const bgReady = ref(false)
  const heroReady = ref(false)

  // SSR 和客户端都执行
  $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
    .then((images) => {
      if (!images?.length) return
      const shuffled = [...images].sort(() => Math.random() - 0.5)

      // hero 图加载完就替换并渐显
      const hero = new Image()
      hero.onload = () => {
        heroImage.value = shuffled[0].url
        heroReady.value = true
      }
      hero.src = shuffled[0].url

      // bg 图加载完就替换并渐显，不等 hero
      const bgTarget = shuffled[1] || shuffled[0]
      const bg = new Image()
      bg.onload = () => {
        bgImage.value = bgTarget.url
        bgReady.value = true
      }
      bg.src = bgTarget.url
    })
    .catch(() => {})

  return { heroImage, bgImage, bgReady, heroReady }
}

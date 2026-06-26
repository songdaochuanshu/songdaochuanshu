const IMG_BASE = 'https://img-homepage.openserve.cloud'
const LOCAL_HERO = '/fallback/hero.jpg'
const LOCAL_BG = '/fallback/bg.png'

interface ImageInfo {
  pid: number
  filename: string
  url: string
  ext: string
  size_kb: number
}

interface RandomImagesState {
  heroImage: string
  bgImage: string
  heroReady: boolean
  bgReady: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandomImages(images: ImageInfo[]): { hero: string; bg: string } {
  const shuffled = shuffle(images)
  return {
    hero: shuffled[0]?.url || LOCAL_HERO,
    bg: (shuffled[1] || shuffled[0])?.url || LOCAL_BG,
  }
}

function loadUntilReady(state: RandomImagesState) {
  const heroImg = new Image()
  heroImg.onload = () => {
    state.heroReady = true
  }
  heroImg.onerror = () => {
    // CDN 图加载失败，回退到本地兜底图
    state.heroImage = LOCAL_HERO
    const fallback = new Image()
    fallback.onload = () => { state.heroReady = true }
    fallback.onerror = () => { state.heroReady = true }
    fallback.src = LOCAL_HERO
  }
  heroImg.src = state.heroImage

  const bgImg = new Image()
  bgImg.onload = () => {
    state.bgReady = true
  }
  bgImg.onerror = () => {
    state.bgImage = LOCAL_BG
    const fallback = new Image()
    fallback.onload = () => { state.bgReady = true }
    fallback.onerror = () => { state.bgReady = true }
    fallback.src = LOCAL_BG
  }
  bgImg.src = state.bgImage
}

// 只初始化一次
let initialized = false

export function useRandomImages() {
  const state = useState<RandomImagesState>('random-images', () => ({
    heroImage: LOCAL_HERO,
    bgImage: LOCAL_BG,
    heroReady: false,
    bgReady: false,
  }))

  if (!initialized) {
    initialized = true

    if (import.meta.server) {
      $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
        .then((images) => {
          if (!images?.length) {
            state.value.heroReady = true
            state.value.bgReady = true
            return
          }
          const { hero, bg } = pickRandomImages(images)
          state.value.heroImage = hero
          state.value.bgImage = bg
          state.value.heroReady = true
          state.value.bgReady = true
        })
        .catch(() => {
          state.value.heroReady = true
          state.value.bgReady = true
        })
    } else if (!state.value.heroReady) {
      $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
        .then((images) => {
          if (!images?.length) {
            state.value.heroReady = true
            state.value.bgReady = true
            return
          }
          const { hero, bg } = pickRandomImages(images)
          state.value.heroImage = hero
          state.value.bgImage = bg
          loadUntilReady(state.value)
        })
        .catch(() => {
          state.value.heroReady = true
          state.value.bgReady = true
        })
    }
  }

  return {
    heroImage: computed(() => state.value.heroImage),
    bgImage: computed(() => state.value.bgImage),
    heroReady: computed(() => state.value.heroReady),
    bgReady: computed(() => state.value.bgReady),
  }
}

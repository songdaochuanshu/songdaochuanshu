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

export function useRandomImages() {
  const heroImage = ref(`${IMG_BASE}/82646886.jpg`)
  const bgImage = ref(`${IMG_BASE}/91365699.png`)
  const bgReady = ref(false)
  const heroReady = ref(false)

  $fetch<ImageInfo[]>('https://img-homepage.openserve.cloud/images-info.json')
    .then((images) => {
      if (!images?.length) return
      const shuffled = shuffle(images)
      const heroTarget = shuffled[0]
      const bgTarget = shuffled[1] || shuffled[0]

      if (import.meta.server) {
        heroImage.value = heroTarget.url
        bgImage.value = bgTarget.url
        heroReady.value = true
        bgReady.value = true
      } else {
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
    })
    .catch(() => {})

  return { heroImage, bgImage, bgReady, heroReady }
}

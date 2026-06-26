<template>
  <div class="bg-layer">
    <div ref="bgRef" class="bg-illustration"></div>
  </div>
  <canvas ref="colorCanvasRef" class="color-sampler"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bgRef = ref<HTMLDivElement>()
const colorCanvasRef = ref<HTMLCanvasElement>()
const BG_URL = 'https://img-homepage.openserve.cloud/backgrounds/104001051.jpg'

let scrollY = 0
let targetScrollY = 0
let animId = 0
let loaded = false

// --- 主题色提取 ---
function extractThemeColors(img: HTMLImageElement) {
  const canvas = colorCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = 64
  const h = 64
  canvas.width = w
  canvas.height = h
  ctx.drawImage(img, 0, 0, w, h)
  const data = ctx.getImageData(0, 0, w, h).data

  // 采样 9 个区域取平均色
  const samples: [number, number, number][] = []
  const zones = [
    [0.25, 0.25], [0.5, 0.25], [0.75, 0.25],
    [0.25, 0.5],  [0.5, 0.5],  [0.75, 0.5],
    [0.25, 0.75], [0.5, 0.75], [0.75, 0.75]
  ]

  for (const [fx, fy] of zones) {
    const x = Math.floor(fx * w)
    const y = Math.floor(fy * h)
    const i = (y * w + x) * 4
    samples.push([data[i], data[i + 1], data[i + 2]])
  }

  // 去掉最亮和最暗的各一个，取剩余平均
  samples.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]))
  const trimmed = samples.slice(1, -1)
  const avg = trimmed.reduce((s, c) => [s[0] + c[0], s[1] + c[1], s[2] + c[2]], [0, 0, 0])
  const r = Math.round(avg[0] / trimmed.length)
  const g = Math.round(avg[1] / trimmed.length)
  const b = Math.round(avg[2] / trimmed.length)

  document.documentElement.style.setProperty('--theme-bg-r', String(r))
  document.documentElement.style.setProperty('--theme-bg-g', String(g))
  document.documentElement.style.setProperty('--theme-bg-b', String(b))
  document.documentElement.style.setProperty('--theme-bg', `rgb(${r},${g},${b})`)
}

// --- 视差 + 加载渐显 ---
function onScroll() {
  targetScrollY = window.scrollY
}

function loop() {
  // 平滑视差
  scrollY += (targetScrollY - scrollY) * 0.08
  if (bgRef.value) {
    bgRef.value.style.transform = `translateY(${scrollY * 0.15}px)`
  }
  animId = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!import.meta.client) return

  // 预加载图片并提取主题色
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = BG_URL
  img.onload = () => {
    extractThemeColors(img)
  }

  // 加载渐显
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (bgRef.value) {
        bgRef.value.classList.add('bg-ready')
        loaded = true
      }
    })
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  animId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-illustration {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  background: url('https://img-homepage.openserve.cloud/backgrounds/104001051.jpg') center center / cover no-repeat;
  opacity: 0;
  filter: blur(20px) saturate(0.9);
  transition: opacity 1.8s ease, filter 2.2s ease;
  will-change: transform, opacity, filter;
  animation: bg-breathe 20s ease-in-out infinite;
}

.bg-illustration.bg-ready {
  opacity: 0.12;
  filter: blur(0) saturate(0.9);
}

/* 呼吸动画：scale 在 1.0 ~ 1.03 之间循环 */
@keyframes bg-breathe {
  0%, 100% { transform: scale(1.0); }
  50% { transform: scale(1.03); }
}

/* 隐藏的主题色采样 canvas */
.color-sampler {
  position: fixed;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}
</style>

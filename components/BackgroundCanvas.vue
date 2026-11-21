<template>
  <div class="bg-layer">
    <div ref="parallaxRef" class="bg-parallax">
      <div ref="bgRef" class="bg-illustration"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const bgRef = ref<HTMLDivElement>()
const parallaxRef = ref<HTMLDivElement>()
let scrollY = 0
let targetScrollY = 0
let animId = 0
function onScroll() { targetScrollY = window.scrollY }
function loop() {
  scrollY += (targetScrollY - scrollY) * 0.08
  if (parallaxRef.value) parallaxRef.value.style.transform = `translateY(${scrollY * 0.15}px)`
  animId = requestAnimationFrame(loop)
}
onMounted(() => {
  if (!import.meta.client) return
  requestAnimationFrame(() => requestAnimationFrame(() => bgRef.value?.classList.add('bg-ready')))
  window.addEventListener('scroll', onScroll, { passive: true })
  animId = requestAnimationFrame(loop)
})
onUnmounted(() => { cancelAnimationFrame(animId); window.removeEventListener('scroll', onScroll) })
</script>
<style scoped>
.bg-layer { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; overflow: hidden; }
.bg-parallax { position: absolute; top: -10%; left: 0; width: 100%; height: 120%; will-change: transform; }
.bg-illustration { width: 100%; height: 100%; background: url('https://img-homepage.openserve.cloud/normal/104001051.jpg') center center / cover no-repeat; opacity: 0; filter: blur(20px) saturate(0.9); transition: opacity 1.8s ease, filter 2.2s ease; animation: bg-breathe 20s ease-in-out infinite; }
.bg-illustration.bg-ready { opacity: 0.12; filter: blur(0) saturate(0.9); }
@keyframes bg-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
</style>

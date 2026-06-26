<template>
  <canvas ref="canvasRef" class="shader-bg"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement>()

const NOISE_FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uScroll;
uniform vec2 uMouse;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = p * 2.1 + shift;
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = uv * 4.0;
  float t = uTime * 0.03;
  float scroll = uScroll * 0.0002;

  float n1 = fbm(p + vec2(t*0.2, t*0.08) + scroll);
  float n2 = fbm(p * 1.3 + vec2(-t*0.1, t*0.06) + n1 * 0.4);

  vec2 mP = uMouse / uResolution;
  float mDist = length(uv - mP);
  n2 += smoothstep(0.3, 0.0, mDist) * 0.08;

  float val = smoothstep(0.25, 0.75, n2 * 0.5 + 0.5);

  // 暖灰纸张质感
  vec3 dark = vec3(0.78, 0.76, 0.73);
  vec3 light = vec3(0.92, 0.91, 0.89);
  vec3 color = mix(dark, light, val);

  // 极低透明度，若隐若现
  float alpha = 0.06 + val * 0.09;

  gl_FragColor = vec4(color, alpha);
}
`

onMounted(() => {
  if (!import.meta.client || !canvasRef.value) return

  const canvas = canvasRef.value
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(1)

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(-999, -999) },
  }

  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: NOISE_FRAG,
    transparent: true,
    depthWrite: false,
  })

  const geo = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)

  let dirty = true
  let scrollY = 0
  let lastScrollY = 0
  let mouseX = -999, mouseY = -999
  let lastMouseX = -999, lastMouseY = -999

  const onScroll = () => {
    scrollY = window.scrollY
    if (Math.abs(scrollY - lastScrollY) > 1) dirty = true
  }

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (Math.abs(mouseX - lastMouseX) > 2 || Math.abs(mouseY - lastMouseY) > 2) dirty = true
  }

  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    dirty = true
  }

  window.addEventListener('scroll', onScroll)
  document.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)

  const clock = new THREE.Clock()
  let animId = 0

  function loop() {
    const t = clock.getElapsedTime()
    uniforms.uTime.value = t
    uniforms.uScroll.value = scrollY
    uniforms.uMouse.value.set(mouseX, window.innerHeight - mouseY)

    if (dirty || Math.floor(t * 10) !== Math.floor((t - 0.016) * 10)) {
      renderer.render(scene, camera)
      dirty = false
      lastScrollY = scrollY
      lastMouseX = mouseX
      lastMouseY = mouseY
    }
    animId = requestAnimationFrame(loop)
  }
  loop()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    geo.dispose()
    mat.dispose()
  })
})
</script>

<style scoped>
.shader-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}
</style>

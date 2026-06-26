<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div class="h-full bg-gray-900 dark:bg-white transition-[width] duration-100 ease-out" :style="{ width: `${readingProgress}%` }"></div>
    </div>
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.12] dark:opacity-[0.06]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    </div>
    <div class="relative z-10">
      <div class="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            松岛川树
          </NuxtLink>
          <ThemeToggle />
        </div>
      </div>
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div v-if="post" class="flex gap-8">
          <aside v-if="tocItems.length > 0" class="hidden lg:block w-56 flex-shrink-0">
            <nav class="sticky top-20">
              <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">目录</p>
              <ul class="space-y-1.5">
                <li v-for="item in tocItems" :key="item.id" :class="['block text-xs leading-relaxed transition-colors cursor-pointer hover:text-gray-900 dark:hover:text-white', item.level === 3 ? 'pl-3' : '', activeTocId === item.id ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400 dark:text-gray-500']" @click="scrollToHeading(item.id)">{{ item.text }}</li>
              </ul>
            </nav>
          </aside>
          <article class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex-1 min-w-0">
            <header class="px-8 pt-10 pb-8 border-b border-gray-50 dark:border-gray-800">
              <div class="flex items-center gap-3 mb-4">
                <CategoryBadge :category="post.category" class="tracking-wide" />
                <span v-if="post.date" class="text-xs text-gray-400 dark:text-gray-500">{{ formatDate(post.date) }}</span>
                <span class="text-xs text-gray-300 dark:text-gray-600">· {{ readingTime }}</span>
                <span v-if="viewCount > 0" class="text-xs text-gray-300 dark:text-gray-600">· {{ viewCount }} 次阅读</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{{ post.title }}</h1>
              <p v-if="post.description" class="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ post.description }}</p>
              <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mt-4">
                <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-full">#{{ tag }}</span>
              </div>
              <div class="mt-4"><ShareButtons :title="post.title" :url="`https://songdaochuanshu.dev/posts/${key}`" /></div>
            </header>
            <div v-if="loading" class="px-8 py-10">
              <div class="skeleton w-3/4 h-6 rounded mb-4"></div>
              <div class="skeleton w-full h-4 rounded mb-2"></div>
              <div class="skeleton w-full h-4 rounded mb-2"></div>
              <div class="skeleton w-5/6 h-4 rounded mb-6"></div>
              <div class="skeleton w-full h-32 rounded mb-4"></div>
              <div class="skeleton w-2/3 h-4 rounded"></div>
            </div>
            <div v-else class="px-8 py-10 prose max-w-none"><div v-html="renderedContent"></div></div>
            <div v-if="prevPost || nextPost" class="px-8 py-8 border-t border-gray-50 dark:border-gray-800">
              <div class="grid gap-3 sm:grid-cols-2">
                <NuxtLink v-if="prevPost" :to="`/posts/${prevPost.key}`" class="group flex items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                  <div class="min-w-0"><p class="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">上一篇</p><p class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">{{ prevPost.title }}</p></div>
                </NuxtLink>
                <div v-else></div>
                <NuxtLink v-if="nextPost" :to="`/posts/${nextPost.key}`" class="group flex items-center justify-end gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-right">
                  <div class="min-w-0"><p class="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">下一篇</p><p class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">{{ nextPost.title }}</p></div>
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </NuxtLink>
              </div>
            </div>
            <div v-if="relatedPosts.length > 0" class="px-8 py-8 border-t border-gray-50 dark:border-gray-800">
              <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">相关文章</p>
              <div class="grid gap-3 sm:grid-cols-2">
                <NuxtLink v-for="rp in relatedPosts" :key="rp.key" :to="`/posts/${rp.key}`" class="group block p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                  <div class="flex items-center gap-2 mb-1"><CategoryBadge :category="rp.category" /></div>
                  <p class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-1">{{ rp.title }}</p>
                </NuxtLink>
              </div>
            </div>
            <div class="px-8"><TipButton /></div>
            <div class="px-8 pb-8"><Giscus /></div>
          </article>
        </div>
        <div v-else class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500 text-sm">文章未找到</p>
          <NuxtLink to="/" class="mt-3 inline-block text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">返回首页</NuxtLink>
        </div>
      </main>
      <PageFooter />
    </div>
    <BackToTop />
    <MobileToc :items="tocItems" :active-id="activeTocId" />
  </div>
</template>

<script setup lang="ts">
import { marked, Renderer } from 'marked'

const { highlightCode } = useHighlight()
const renderer = new Renderer()
renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  return `<pre><code class="language-${lang || 'text'}">${highlightCode(text, lang || '')}</code></pre>`
}
marked.setOptions({ renderer })

const BASE_URL = 'https://blog-static.openserve.cloud'
const route = useRoute()
const slugParts = route.params.slug as string[]
const key = slugParts.join('/')
const { bgImage, bgReady } = useRandomImages()
const { addCopyButtons } = useCodeCopy()
const { bindLightbox } = useImageLightbox()
const { onKey } = useKeyboard()

onKey((e) => {
  if (e.key === 'ArrowLeft' && prevPost.value) navigateTo(`/posts/${prevPost.value.key}`)
  else if (e.key === 'ArrowRight' && nextPost.value) navigateTo(`/posts/${nextPost.value.key}`)
})

interface PostMeta { path: string; key: string; category: string; title: string; date: string | null; description: string; tags: string[]; layout: string; cover?: string }

const post = ref<PostMeta | null>(null)
const allPosts = ref<PostMeta[]>([])
const loading = ref(true)
const renderedContent = ref('')
const tocItems = ref<{ id: string; text: string; level: number }[]>([])
const activeTocId = ref('')
const readingProgress = ref(0)
const viewCount = ref(0)

const sortedPosts = computed(() => [...allPosts.value].filter(p => p.date).sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()))
const prevPost = computed(() => { if (!post.value) return null; const idx = sortedPosts.value.findIndex(p => p.key === post.value!.key); return idx >= 0 && idx < sortedPosts.value.length - 1 ? sortedPosts.value[idx + 1] : null })
const nextPost = computed(() => { if (!post.value) return null; const idx = sortedPosts.value.findIndex(p => p.key === post.value!.key); return idx > 0 ? sortedPosts.value[idx - 1] : null })

const relatedPosts = computed(() => {
  if (!post.value) return []
  const current = post.value
  return allPosts.value.filter(p => p.key !== current.key)
    .map(p => { let score = 0; if (p.category === current.category) score += 2; if (p.tags && current.tags) score += p.tags.filter(t => current.tags.includes(t)).length; return { post: p, score } })
    .filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).map(s => s.post)
})

function formatDate(dateStr: string): string { if (!dateStr) return ''; try { return new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) } catch { return dateStr } }

const readingTime = computed(() => { const text = renderedContent.value.replace(/<[^>]*>/g, ''); return `约 ${Math.max(1, Math.round(text.length / 500))} 分钟` })

function extractToc(html: string) {
  const items: { id: string; text: string; level: number }[] = []
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const rawText = match[2].replace(/<[^>]*>/g, '').trim()
    items.push({ id: rawText.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, ''), text: rawText, level: parseInt(match[1]) })
  }
  return items
}

function scrollToHeading(id: string) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

let scrollHandler: (() => void) | null = null
function setupScrollTracking() {
  if (!import.meta.client || tocItems.value.length === 0) return
  scrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    readingProgress.value = scrollHeight > 0 ? Math.min(100, (window.scrollY / scrollHeight) * 100) : 0
    const headings = tocItems.value.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    let current = ''
    for (const el of headings) { if (el.getBoundingClientRect().top <= 100) current = el.id }
    activeTocId.value = current
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
}

async function loadPost() {
  try {
    const manifestResp = await $fetch<{ posts: PostMeta[] }>(`${BASE_URL}/manifest.json`, { retry: 3, retryDelay: 1000 })
    allPosts.value = manifestResp.posts || []
    const found = allPosts.value.find((p: PostMeta) => p.key === key)
    if (found) {
      post.value = found
      const contentResp = await $fetch<string>(`${BASE_URL}/${key}`, { retry: 3, retryDelay: 1000 })
      let markdown = contentResp
      const yamlMatch = contentResp.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (yamlMatch) {
        const [, yamlBlock, md] = yamlMatch
        markdown = md
        yamlBlock.split('\n').forEach(line => { const ci = line.indexOf(':'); if (ci > 0) { const k = line.slice(0, ci).trim(), v = line.slice(ci + 1).trim(); if (k === 'title') found.title = v; if (k === 'date') found.date = v; if (k === 'description') found.description = v } })
      }
      let html = marked(markdown)
      html = html.replace(/<img /g, '<img loading="lazy" decoding="async" ')
      renderedContent.value = html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (match, level, attrs, text) => {
        const id = text.replace(/<[^>]*>/g, '').trim().toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '')
        return `<h${level}${attrs} id="${id}">${text}<a class="heading-anchor" href="#${id}" onclick="event.preventDefault();navigator.clipboard.writeText(window.location.origin+window.location.pathname+'#${id}');this.classList.add('copied');setTimeout(()=>this.classList.remove('copied'),1500)" aria-label="复制链接">#</a></h${level}>`
      })
      tocItems.value = extractToc(html)
      nextTick(() => setupScrollTracking())
    }
  } catch (error) { console.error('Failed to load post:', error) } finally { loading.value = false }
}

await loadPost()
addCopyButtons(renderedContent)
bindLightbox()

const { markAsRead } = useReadHistory()
if (post.value) markAsRead(key)
if (post.value && import.meta.client) { $fetch('/api/views.post', { method: 'POST', body: { key } }).then((data: any) => { viewCount.value = data.views }).catch(() => {}) }

if (post.value) {
  const postUrl = `https://songdaochuanshu.dev/posts/${key}`
  const coverUrl = post.value.cover ? (post.value.cover.startsWith('http') ? post.value.cover : `${BASE_URL}/${post.value.cover}`) : undefined
  useSeoMeta({ title: post.value.title, ogTitle: post.value.title, description: post.value.description, ogDescription: post.value.description, ogImage: coverUrl, ogUrl: postUrl, ogType: 'article', articlePublishedTime: post.value.date || undefined, articleAuthor: '松岛川树', articleTag: post.value.tags, twitterTitle: post.value.title, twitterDescription: post.value.description, twitterImage: coverUrl })
  useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.value.title, description: post.value.description, datePublished: post.value.date, author: { '@type': 'Person', name: '松岛川树' }, image: coverUrl, url: postUrl }) }] })
}

onUnmounted(() => { if (scrollHandler) window.removeEventListener('scroll', scrollHandler) })
</script>
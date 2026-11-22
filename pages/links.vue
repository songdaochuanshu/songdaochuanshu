<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0"><div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div></div>
    <div class="relative z-10">
      <PageNav />
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">友情链接</h1>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
              @click="openRules"
            >
              交换规则
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
              @click="openApply"
            >
              <span class="text-sm leading-none">+</span> 申请友链
            </button>
          </div>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-10">感谢这些优秀的博主和朋友</p>
        <div v-if="categories.length > 0" class="flex flex-wrap gap-2 mb-8">
          <button @click="activeCategory = ''" :class="['px-3 py-1 text-xs rounded-full font-medium transition-colors', activeCategory === '' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700']">全部 ({{ links.length }})</button>
          <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :class="['px-3 py-1 text-xs rounded-full font-medium transition-colors', activeCategory === cat ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700']">{{ cat }} ({{ getLinksByCategory(cat).length }})</button>
        </div>
        <div v-if="loading" class="text-center py-20"><div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div></div>
        <div v-else-if="error" class="text-center py-20"><p class="text-gray-500 dark:text-gray-400 text-sm">{{ error }}</p><button @click="fetchLinks" class="mt-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">重试</button></div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a v-for="link in filteredLinks" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer" class="group flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
            <img :src="link.avatar" :alt="link.name" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0" @error="handleAvatarError" />
            <div class="flex-1 min-w-0"><h3 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors truncate">{{ link.name }}</h3><p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">{{ link.description }}</p><CategoryBadge v-if="link.category" :category="link.category" class="mt-1.5" /></div>
          </a>
        </div>
        <div v-if="!loading && !error && filteredLinks.length === 0" class="text-center py-20"><p class="text-gray-400 dark:text-gray-500 text-sm">暂无友链</p><button type="button" class="mt-3 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" @click="openApply">成为第一个</button></div>
        <p v-if="!loading && !error && links.length > 1" class="mt-8 text-center text-[11px] text-gray-400 dark:text-gray-500">
          顺序不分前后，每次刷新随机排列
          <span class="mx-1 text-gray-300 dark:text-gray-600">·</span>
          <button type="button" class="underline decoration-gray-200 dark:decoration-gray-700 underline-offset-2 transition-colors hover:text-gray-700 dark:hover:text-gray-300" @click="openRules">交换规则</button>
        </p>
      </main>
      <PageFooter />
    </div>
    <BackToTop />

    <!-- 申请友链弹窗 -->
    <Teleport to="body">
      <Transition name="apply-fade">
        <div v-if="showApply" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="apply-title">
          <div class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" @click="closeApply"></div>
          <div class="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <div class="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 id="apply-title" class="text-base font-semibold text-gray-900 dark:text-white">申请友链</h2>
              <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">填好后我会收到邮件确认，通过后就会出现在这一页。</p>
            </div>

            <form v-if="!submitted" class="px-6 py-5 space-y-4" novalidate @submit.prevent="submitApply">
              <div>
                <label for="apply-name" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">站点名称 <span class="text-rose-400">*</span></label>
                <input id="apply-name" v-model="form.name" type="text" maxlength="40" autocomplete="off" placeholder="比如：某某的博客" class="apply-input" />
              </div>
              <div>
                <label for="apply-url" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">站点网址 <span class="text-rose-400">*</span></label>
                <input id="apply-url" v-model="form.url" type="url" maxlength="200" autocomplete="off" placeholder="https://example.com" class="apply-input" />
              </div>
              <div>
                <label for="apply-avatar" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">头像链接 <span class="text-gray-400 dark:text-gray-500 font-normal">选填</span></label>
                <input id="apply-avatar" v-model="form.avatar" type="url" maxlength="300" autocomplete="off" placeholder="不填就用默认头像" class="apply-input" />
              </div>
              <div>
                <label for="apply-description" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">一句话简介 <span class="text-rose-400">*</span></label>
                <input id="apply-description" v-model="form.description" type="text" maxlength="80" autocomplete="off" placeholder="用一句话介绍你的站点" class="apply-input" />
              </div>
              <div>
                <label for="apply-category" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">分类 <span class="text-gray-400 dark:text-gray-500 font-normal">选填</span></label>
                <input id="apply-category" v-model="form.category" type="text" maxlength="20" autocomplete="off" placeholder="比如：博主朋友" class="apply-input" />
              </div>

              <!-- 人机验证：只在配置了 Site Key 时渲染，未配置时后端也不校验 -->
              <div v-if="turnstileSiteKey" class="pt-1">
                <div ref="turnstileContainer" class="min-h-[65px]"></div>
                <p v-if="turnstileError" class="mt-1 text-xs text-rose-500 dark:text-rose-400">{{ turnstileError }}</p>
              </div>

              <!-- 蜜罐：真人看不见也不会填 -->
              <div class="apply-honeypot" aria-hidden="true">
                <label for="apply-website">网址</label>
                <input id="apply-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
              </div>

              <p v-if="formError" class="text-xs text-rose-500 dark:text-rose-400">{{ formError }}</p>

              <div class="flex items-center gap-2 pt-1">
                <button type="submit" :disabled="submitting" class="flex-1 px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                  {{ submitting ? '提交中…' : '提交申请' }}
                </button>
                <button type="button" class="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" @click="closeApply">取消</button>
              </div>
            </form>

            <div v-else class="px-6 py-8 text-center">
              <div class="w-11 h-11 mx-auto rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xl">✓</div>
              <p class="mt-4 text-sm font-medium text-gray-900 dark:text-white">{{ submittedMessage }}</p>
              <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">不着急的话，过一会儿再来刷新看看。</p>
              <button type="button" class="mt-5 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium" @click="closeApply">好的</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 友链交换规则弹窗 -->
    <Teleport to="body">
      <Transition name="apply-fade">
        <div v-if="showRules" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="rules-title">
          <div class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" @click="closeRules"></div>
          <div class="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <div class="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 id="rules-title" class="text-base font-semibold text-gray-900 dark:text-white">友链交换规则</h2>
                <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">先看这几条，再决定要不要换。</p>
              </div>
              <button type="button" aria-label="关闭规则" class="rounded-full p-1 text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200" @click="closeRules">✕</button>
            </div>

            <div class="px-6 py-5 space-y-5">
              <section>
                <h3 class="text-xs font-semibold text-gray-900 dark:text-white">申请须知</h3>
                <ul class="mt-3 space-y-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  <li class="flex gap-2.5">
                    <span class="mt-px font-mono text-[10px] text-gray-300 dark:text-gray-600">01</span>
                    <span><span class="font-medium text-gray-700 dark:text-gray-200">先友后链</span>：申请前请先在贵站添加本站友链。</span>
                  </li>
                  <li class="flex gap-2.5">
                    <span class="mt-px font-mono text-[10px] text-gray-300 dark:text-gray-600">02</span>
                    <span><span class="font-medium text-gray-700 dark:text-gray-200">站点要求</span>：个人博客或技术类独立站点，内容健康合规、可正常访问（HTTPS）。</span>
                  </li>
                </ul>
              </section>

              <section class="rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-xs font-semibold text-gray-900 dark:text-white">本站友链信息</h3>
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 rounded-full bg-gray-900 dark:bg-white px-3 py-1 text-[11px] font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    @click="copySiteInfo('text')"
                  >{{ copiedField === 'text' ? '已复制 ✓' : '复制全部' }}</button>
                </div>
                <dl class="mt-2.5 divide-y divide-gray-100 dark:divide-gray-800">
                  <div v-for="item in siteInfoRows" :key="item.key" class="flex items-start gap-2 py-2">
                    <dt class="w-[4.5rem] shrink-0 pt-px text-[11px] text-gray-400 dark:text-gray-500">{{ item.label }}</dt>
                    <dd class="min-w-0 flex-1 break-all text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">{{ item.value }}</dd>
                    <button
                      type="button"
                      class="shrink-0 -m-0.5 rounded p-1 text-[11px] text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
                      :aria-label="`复制${item.label}`"
                      @click="copySiteInfo(item.key)"
                    >{{ copiedField === item.key ? '✓' : '复制' }}</button>
                  </div>
                </dl>
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <button type="button" class="rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[11px] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors" @click="copySiteInfo('markdown')">{{ copiedField === 'markdown' ? '已复制 ✓' : 'Markdown 表格' }}</button>
                  <button type="button" class="rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[11px] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors" @click="copySiteInfo('json')">{{ copiedField === 'json' ? '已复制 ✓' : 'JSON' }}</button>
                  <span class="text-[11px] text-emerald-600 dark:text-emerald-400" aria-live="polite">{{ copyHint }}</span>
                </div>
              </section>

              <div class="flex items-center gap-2">
                <button type="button" class="flex-1 px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors" @click="goApplyFromRules">我已了解，去申请</button>
                <button type="button" class="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" @click="closeRules">再看看</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface FriendLink { name: string; url: string; avatar: string; description: string; category?: string }

const { bgImage, bgReady } = useRandomImages()
const links = ref<FriendLink[]>([])
const loading = ref(true)
const error = ref('')
const activeCategory = ref('')
const avatarFallbackUsed = new WeakSet<HTMLImageElement>()

const fetchLinks = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await $fetch<{ links?: FriendLink[] }>('/api/content/friends.json')
    if (!data || !Array.isArray(data.links)) throw new Error('数据格式错误')
    links.value = shuffle(data.links.filter(link => link && typeof link.name === 'string' && typeof link.url === 'string' && typeof link.avatar === 'string' && typeof link.description === 'string'))
  } catch (cause) {
    console.error('获取友链失败:', cause)
    error.value = '加载友链失败，请稍后重试'
  } finally { loading.value = false }
}

/** 友链每次刷新随机排列，避免按提交先后形成“排位” */
const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}
const categories = computed(() => Array.from(new Set(links.value.map(link => link.category).filter((category): category is string => Boolean(category)))).sort())
const getLinksByCategory = (category: string) => links.value.filter(link => link.category === category)
const filteredLinks = computed(() => activeCategory.value ? links.value.filter(link => link.category === activeCategory.value) : links.value)
const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (avatarFallbackUsed.has(img)) return
  avatarFallbackUsed.add(img)
  img.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
}

/* ---------------- 申请友链 ---------------- */
const showApply = ref(false)
const showRules = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const submittedMessage = ref('')
const formError = ref('')
const form = reactive({ name: '', url: '', avatar: '', description: '', category: '', website: '' })

/* ---------------- 友链交换规则 & 本站信息 ---------------- */
const siteInfo = {
  name: '松岛川树',
  url: 'https://blog.openserve.cloud',
  avatar: 'https://github.com/songdaochuanshu.png',
  rss: 'https://blog.openserve.cloud/rss.xml',
  description: '一个喜欢写代码也喜欢写文字的人。',
}
const siteInfoRows = [
  { key: 'name', label: '站点名称', value: siteInfo.name },
  { key: 'url', label: '站点地址', value: siteInfo.url },
  { key: 'avatar', label: '站点头像', value: siteInfo.avatar },
  { key: 'rss', label: 'RSS 订阅', value: siteInfo.rss },
  { key: 'description', label: '站点简介', value: siteInfo.description },
]
const copiedField = ref('')
const copyHint = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null

const siteInfoText = () =>
  `站点名称：${siteInfo.name}\n站点地址：${siteInfo.url}\n站点头像：${siteInfo.avatar}\nRSS 订阅：${siteInfo.rss}\n站点简介：${siteInfo.description}`
const siteInfoMarkdown = () =>
  [
    `| 站点名称 | ${siteInfo.name} |`,
    '| --- | --- |',
    `| 站点地址 | ${siteInfo.url} |`,
    `| 站点头像 | ${siteInfo.avatar} |`,
    `| RSS 订阅 | ${siteInfo.rss} |`,
    `| 站点简介 | ${siteInfo.description} |`,
  ].join('\n')
const siteInfoJson = () => JSON.stringify(siteInfo, null, 2)

const writeClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* 走下面的兼容路径 */
  }
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '-1000px'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

const copySiteInfo = async (field: string) => {
  const row = siteInfoRows.find((item) => item.key === field)
  const payload =
    field === 'json'
      ? siteInfoJson()
      : field === 'markdown'
        ? siteInfoMarkdown()
        : field === 'text'
          ? siteInfoText()
          : row?.value || ''
  if (!payload) return

  if (copyTimer) clearTimeout(copyTimer)
  const ok = await writeClipboard(payload)
  copiedField.value = ok ? field : ''
  copyHint.value = ok ? '已复制到剪贴板' : '复制失败，请手动选中文字'
  copyTimer = setTimeout(() => {
    copiedField.value = ''
    copyHint.value = ''
  }, 2000)
}

/* ---------------- Turnstile 人机验证 ---------------- */
const turnstileSiteKey = String(((useRuntimeConfig().public as any)?.turnstileSiteKey) || '')
const turnstileContainer = ref<HTMLElement | null>(null)
const turnstileToken = ref('')
const turnstileError = ref('')
let turnstileWidgetId: string | null = null
let turnstileScriptPromise: Promise<void> | null = null

const loadTurnstileScript = (): Promise<void> => {
  if (!import.meta.client) return Promise.resolve()
  if ((window as any).turnstile) return Promise.resolve()
  if (turnstileScriptPromise) return turnstileScriptPromise

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const markLoaded = () => resolve()
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]')
    if (existing) {
      existing.addEventListener('load', markLoaded, { once: true })
      existing.addEventListener('error', () => reject(new Error('turnstile script error')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.dataset.turnstile = 'true'
    script.addEventListener('load', markLoaded, { once: true })
    script.addEventListener('error', () => reject(new Error('turnstile script error')), { once: true })
    document.head.appendChild(script)
  }).catch((error) => {
    turnstileScriptPromise = null
    throw error
  })

  return turnstileScriptPromise
}

const removeTurnstileWidget = () => {
  if (!import.meta.client) return
  if (turnstileWidgetId && (window as any).turnstile) {
    try {
      ;(window as any).turnstile.remove(turnstileWidgetId)
    } catch {
      /* widget 可能已随弹窗销毁 */
    }
  }
  turnstileWidgetId = null
  turnstileToken.value = ''
}

const renderTurnstileWidget = async () => {
  if (!import.meta.client || !turnstileSiteKey) return
  try {
    await loadTurnstileScript()
  } catch {
    turnstileError.value = '人机验证加载失败，请刷新页面重试'
    return
  }

  await nextTick()
  const container = turnstileContainer.value
  const turnstile = (window as any).turnstile
  if (!container || !turnstile) return

  removeTurnstileWidget()
  turnstileError.value = ''
  try {
    turnstileWidgetId = turnstile.render(container, {
      sitekey: turnstileSiteKey,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      language: 'zh-cn',
      callback: (token: string) => {
        turnstileToken.value = token
        turnstileError.value = ''
      },
      'expired-callback': () => {
        turnstileToken.value = ''
      },
      'error-callback': () => {
        turnstileToken.value = ''
        turnstileError.value = '人机验证失败，请刷新页面重试'
      },
    })
  } catch (error) {
    console.error('Turnstile 渲染失败:', error)
    turnstileError.value = '人机验证加载失败，请刷新页面重试'
  }
}

const resetForm = () => {
  form.name = ''
  form.url = ''
  form.avatar = ''
  form.description = ''
  form.category = ''
  form.website = ''
  formError.value = ''
}

const openApply = () => {
  resetForm()
  submitted.value = false
  submittedMessage.value = ''
  showApply.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
  nextTick(() => {
    void renderTurnstileWidget()
  })
}

const closeApply = () => {
  showApply.value = false
  removeTurnstileWidget()
  if (import.meta.client) document.body.style.overflow = ''
}

/* ---------------- 交换规则弹窗 ---------------- */
const openRules = () => {
  showRules.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}

const closeRules = () => {
  showRules.value = false
  if (import.meta.client && !showApply.value) document.body.style.overflow = ''
}

const goApplyFromRules = () => {
  showRules.value = false
  openApply()
}

const validateClient = (): string => {
  if (!form.name.trim()) return '请填写站点名称'
  if (form.name.trim().length > 40) return '站点名称不超过 40 个字符'
  const url = form.url.trim()
  if (!url) return '请填写站点网址'
  if (!/^https?:\/\//i.test(url)) return '站点网址需要以 http:// 或 https:// 开头'
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('.')) return '站点网址格式不正确'
  } catch {
    return '站点网址格式不正确'
  }
  if (!form.description.trim()) return '请写一句站点简介'
  if (form.description.trim().length > 80) return '一句话简介不超过 80 个字符'
  if (form.avatar.trim() && !/^https?:\/\//i.test(form.avatar.trim())) return '头像链接需要是完整的 http(s) 地址'
  return ''
}

const submitApply = async () => {
  const message = validateClient()
  if (message) { formError.value = message; return }
  if (turnstileSiteKey && !turnstileToken.value) {
    formError.value = turnstileError.value || '请先完成人机验证'
    return
  }

  submitting.value = true
  formError.value = ''
  try {
    const result = await $fetch<{ ok: boolean; duplicated?: boolean; message?: string }>('/api/links/apply', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        url: form.url.trim(),
        avatar: form.avatar.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        website: form.website,
        turnstileToken: turnstileToken.value,
      },
    })
    submitted.value = true
    submittedMessage.value = result?.message || '申请已提交'
  } catch (cause: any) {
    formError.value = cause?.data?.statusMessage || cause?.statusMessage || '提交失败，请稍后再试'
    // token 一次性：失败后重置，方便直接重试
    if (turnstileWidgetId) {
      try { (window as any).turnstile?.reset(turnstileWidgetId) } catch { /* 忽略 */ }
    }
    turnstileToken.value = ''
  } finally {
    submitting.value = false
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  if (showApply.value) closeApply()
  else if (showRules.value) closeRules()
}

onMounted(() => {
  fetchLinks()
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
    if (copyTimer) clearTimeout(copyTimer)
  }
  removeTurnstileWidget()
})
</script>

<style scoped>
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.apply-input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: #111827;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.apply-input::placeholder { color: #9ca3af; }
.apply-input:focus { border-color: #9ca3af; box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.15); }
.apply-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.apply-fade-enter-active, .apply-fade-leave-active { transition: opacity 0.2s ease; }
.apply-fade-enter-from, .apply-fade-leave-to { opacity: 0; }

:global(.dark) .apply-input {
  color: #f3f4f6;
  background: #111827;
  border-color: #1f2937;
}
:global(.dark) .apply-input::placeholder { color: #6b7280; }
:global(.dark) .apply-input:focus { border-color: #4b5563; box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.25); }
</style>

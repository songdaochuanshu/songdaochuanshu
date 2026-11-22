<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0"><div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div></div>
    <div class="relative z-10">
      <PageNav />
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">友情链接</h1>
          <button
            type="button"
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
            @click="openApply"
          >
            <span class="text-sm leading-none">+</span> 申请友链
          </button>
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
    links.value = data.links.filter(link => link && typeof link.name === 'string' && typeof link.url === 'string' && typeof link.avatar === 'string' && typeof link.description === 'string')
  } catch (cause) {
    console.error('获取友链失败:', cause)
    error.value = '加载友链失败，请稍后重试'
  } finally { loading.value = false }
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
const submitting = ref(false)
const submitted = ref(false)
const submittedMessage = ref('')
const formError = ref('')
const form = reactive({ name: '', url: '', avatar: '', description: '', category: '', website: '' })

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
}

const closeApply = () => {
  showApply.value = false
  if (import.meta.client) document.body.style.overflow = ''
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
      },
    })
    submitted.value = true
    submittedMessage.value = result?.message || '申请已提交'
  } catch (cause: any) {
    formError.value = cause?.data?.statusMessage || cause?.statusMessage || '提交失败，请稍后再试'
  } finally {
    submitting.value = false
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showApply.value) closeApply()
}

onMounted(() => {
  fetchLinks()
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
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

<script setup lang="ts">
// 环境变量在 Nuxt 3 中通常通过 runtimeConfig 访问，
// 但为了保持逻辑一致性，我们这里直接使用 import.meta.env
const gistId = '你的Gist ID' // 这里需要用户手动配置或我根据之前的记录填充
const token = '你的GitHub Token' // 这里也需要配置

const name = ref('')
const message = ref('')
const comments = ref<any[]>([])
const localComments = ref<any[]>([])
const isSubmitting = ref(false)
const isLoading = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const currentPage = ref(1)
const pageSize = 6
const cooldownDuration = 5000
const cooldownTime = ref(0)
const isCoolingDown = ref(false)

let etag: string | null = null

function validateInput() {
  if (!name.value.trim() || !message.value.trim()) {
    showNotification('提示', '请留下您的姓名和留言内容。')
    return false
  }
  return true
}

async function fetchComments() {
  if (!gistId || gistId === '你的Gist ID') return
  isLoading.value = true
  try {
    const headers: any = etag ? { 'If-None-Match': etag } : {}
    const response = await fetch(`https://api.github.com/gists/${gistId}`, { headers })

    if (response.status === 200) {
      const data = await response.json()
      const content = data.files['comments.json'].content
      const commentsData = JSON.parse(content).comments || []
      comments.value = [...commentsData].reverse()
      etag = response.headers.get('etag')
    }
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    isLoading.value = false
  }
}

async function submitComment() {
  if (!validateInput()) return
  if (!gistId || !token || token === '你的GitHub Token') {
    showNotification('配置缺失', '请先在代码中配置 Gist ID 和 Token。')
    return
  }
  
  isSubmitting.value = true

  try {
    const newComment = {
      id: Date.now(),
      name: name.value.trim(),
      message: message.value.trim(),
      timestamp: new Date().toISOString()
    }

    localComments.value.unshift(newComment)

    const response = await fetch(`https://api.github.com/gists/${gistId}`)
    const data = await response.json()
    let existingComments = JSON.parse(data.files['comments.json'].content).comments || []
    existingComments.push(newComment)

    await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          'comments.json': {
            content: JSON.stringify({ comments: existingComments }, null, 2)
          }
        }
      })
    })

    name.value = ''
    message.value = ''
    etag = null
    await fetchComments()
  } catch (error) {
    showNotification('提交失败', '留言未能成功发布，请检查网络或配置。')
  } finally {
    startCooldown()
    isSubmitting.value = false
  }
}

const displayedComments = computed(() => {
  const allComments = [...localComments.value, ...comments.value]
  return allComments.filter((comment, index, self) =>
    index === self.findIndex((c) => c.id === comment.id)
  )
})

const totalPages = computed(() => Math.ceil(displayedComments.value.length / pageSize))
const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return displayedComments.value.slice(start, end)
})

function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

function startCooldown() {
  isCoolingDown.value = true
  cooldownTime.value = cooldownDuration / 1000
  const interval = setInterval(() => {
    cooldownTime.value--
    if (cooldownTime.value <= 0) {
      clearInterval(interval)
      isCoolingDown.value = false
    }
  }, 1000)
}

function showNotification(title: string, message: string) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

function hideModal() { showModal.value = false }

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

onMounted(fetchComments)
</script>

<template>
  <div class="guestbook-page slide-enter-content">
    <h1 class="text-title mb-8 font-bold text-center gradient-text">
      Guestbook
    </h1>

    <div class="glass-card p-6 sm:p-8 rounded-2xl mb-12">
      <form @submit.prevent="submitComment" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-[var(--text-secondary)] ml-1">您的称呼</label>
          <input 
            v-model="name" 
            placeholder="如何称呼您？" 
            maxlength="20" 
            required 
            class="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] transition-all"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-[var(--text-secondary)] ml-1">留言内容</label>
          <textarea 
            v-model="message" 
            placeholder="在这里留下您想说的话..." 
            maxlength="200" 
            required 
            class="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] min-h-32 resize-none transition-all"
          ></textarea>
        </div>
        <div class="flex items-center gap-4">
          <button 
            type="submit" 
            :disabled="isSubmitting || isCoolingDown" 
            class="px-8 py-3 rounded-xl bg-[var(--accent-gradient)] text-white font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            <div v-if="isSubmitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {{ isSubmitting ? '发送中...' : '发布留言' }}
          </button>
          <transition name="fade">
            <span v-if="isCoolingDown" class="text-xs text-[var(--text-secondary)]">
              请在 {{ cooldownTime }}s 后再次提交
            </span>
          </transition>
        </div>
      </form>
    </div>

    <div class="divider h-px bg-gradient-to-r from-transparent via-[var(--common-bd)] to-transparent my-12"></div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12 gap-4">
      <div class="w-10 h-10 border-4 border-[var(--common-bd)] border-t-[#4a7c6f] rounded-full animate-spin"></div>
      <p class="text-[var(--text-secondary)] text-sm">正在加载留言...</p>
    </div>

    <div v-else class="space-y-6">
      <transition-group name="list">
        <div v-for="comment in paginatedComments" :key="comment.id" class="comment-item glass-card p-5 rounded-xl hover:translate-x-2 transition-all duration-300 border-l-4 border-l-[#4a7c6f]">
          <div class="flex justify-between items-start mb-2">
            <span class="font-bold text-[#4a7c6f]">{{ comment.name }}</span>
            <span class="text-xs text-[var(--text-secondary)]">{{ formatDate(comment.timestamp) }}</span>
          </div>
          <p class="text-[var(--primary)] leading-relaxed">{{ comment.message }}</p>
        </div>
      </transition-group>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-6 mt-12">
        <button @click="prevPage" :disabled="currentPage === 1" class="w-10 h-10 flex items-center justify-center rounded-full glass-card disabled:opacity-30 hover:bg-[#4a7c6f] hover:text-white transition-all">
          <div class="i-icon-park-outline-left"></div>
        </button>
        <span class="text-sm font-medium text-[var(--text-secondary)]">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="w-10 h-10 flex items-center justify-center rounded-full glass-card disabled:opacity-30 hover:bg-[#4a7c6f] hover:text-white transition-all">
          <div class="i-icon-park-outline-right"></div>
        </button>
      </div>

      <div v-if="!isLoading && displayedComments.length === 0" class="text-center py-12 opacity-50">
        <div class="i-icon-park-outline-message-one text-5xl mx-auto mb-4"></div>
        <p>还没有留言，快来抢沙发吧！</p>
      </div>
    </div>

    <GuestbookModal v-if="showModal" :title="modalTitle" :message="modalMessage" @close="hideModal" />
  </div>
</template>

<style scoped>
.gradient-text {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

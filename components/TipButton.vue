<template>
  <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
    <button
      @click="showTip = true"
      class="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all"
    >
      <span>☕</span>
      <span>请作者喝杯咖啡</span>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showTip" class="tip-modal" @click.self="showTip = false">
        <div class="tip-dialog">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">赞赏支持</h3>
            <button @click="showTip = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">如果这篇文章对你有帮助，可以请作者喝杯咖啡 ☕</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <span class="text-4xl">💚</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">微信支付</p>
            </div>
            <div class="text-center">
              <div class="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <span class="text-4xl">💙</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">支付宝</p>
            </div>
          </div>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-4">将收款码图片放到 R2 并替换上方占位符即可使用</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const showTip = ref(false)
</script>

<style scoped>
.tip-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.tip-dialog {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 20rem;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}
.dark .tip-dialog {
  background: #1f2937;
}
</style>

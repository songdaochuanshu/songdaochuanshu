<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true }
});

const emit = defineEmits(['close']);
const visible = ref(true);

function close() {
  visible.value = false;
  setTimeout(() => {
    emit('close');
  }, 400);
}
</script>

<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-window glass-card">
        <div class="modal-icon">
          <div class="i-icon-park-outline-info text-2xl"></div>
        </div>
        <div class="modal-content">
          <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
          <p class="text-[var(--text-secondary)]">{{ message }}</p>
        </div>
        <footer class="modal-footer mt-6">
          <button @click="close" class="confirm-btn w-full py-3 rounded-xl font-bold text-white transition-all duration-300">
            确定
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-window {
  padding: 2.5rem;
  border-radius: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  transform-origin: center;
}

.modal-icon {
  width: 56px;
  height: 56px;
  background: rgba(74, 124, 111, 0.1);
  color: #4a7c6f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.confirm-btn {
  background: var(--accent-gradient);
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 124, 111, 0.3);
}

/* 过渡动画 */
.modal-fade-enter-active {
  animation: modal-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-leave-active {
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) reverse;
}

@keyframes modal-in {
  0% { opacity: 0; transform: scale(0.8) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>

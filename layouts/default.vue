<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Social from './components/Social.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 glass-card mx-4 mt-4 rounded-2xl p-4 transition-all duration-300">
      <NavBar />
    </header>
    <aside class="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <Social />
    </aside>
    <main class="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="max-w-70ch mx-auto">
        <Transition name="page" mode="out-in">
          <slot />
        </Transition>
        <Footer />
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>

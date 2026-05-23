<script setup lang="ts">
import { siteConfig } from '@/site.config'
</script>

<template>
  <footer class="pt-12 mt-12 border-t border-[var(--border-subtle)]">
    <div class="flex items-center justify-center md:justify-between flex-col md:flex-row gap-4 text-sm text-[var(--text-secondary)]">
      <span class="flex items-center gap-2">
        <span class="i-icon-park-outline-copyright mr-1"></span>
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" class="link-accent font-medium hover:opacity-80 transition-opacity">
          CC BY-NC-SA 4.0
        </a>
        2023-PRESENT © {{ siteConfig.author }}
      </span>
      <span class="flex items-center gap-2 opacity-60">
        <span class="i-icon-park-outline-heart text-[#4a7c6f]"></span>
        Built with passion
      </span>
    </div>
  </footer>
</template>
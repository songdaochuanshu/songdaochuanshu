<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{ toc: { links: TocLink[] } | TocLink[] }>()

// 兼容两种传参：直接传 links 数组 或 { links: [...] }
const links = computed<TocLink[]>(() => {
  if (Array.isArray(props.toc)) return props.toc
  return props.toc?.links || []
})

const currentId = ref<string>('')

onMounted(() => {
  function handleScroll() {
    const headings = document.querySelectorAll<HTMLElement>('h2[id], h3[id]')
    let activeId = ''
    for (const h of headings) {
      const top = h.getBoundingClientRect().top
      if (top <= 100) activeId = h.id
    }
    currentId.value = activeId
  }
  handleScroll()
  useEventListener(document, 'scroll', handleScroll, { passive: true })
})
</script>

<template>
  <nav v-if="links.length" class="toc-nav hidden xl:block">
    <ul>
      <li
        v-for="link in links"
        :key="link.id"
        class="list-none relative"
        :class="{ 'toc-h3': link.depth === 3 }"
      >
        <span class="flex items-center">
          <span v-if="link.id === currentId" class="toc-arrow i-icon-park-outline-right-small" />
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-nav {
  position: fixed;
  top: 100px;
  right: 2rem;
  width: 14em;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  font-size: 0.85rem;
  line-height: 1.6;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-nav li {
  margin: 0.3em 0;
}

.toc-nav .toc-h3 {
  padding-left: 1em;
  font-size: 0.8em;
  opacity: 0.85;
}

.toc-nav a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}

.toc-nav a:hover {
  color: #4a7c6f;
}

.toc-arrow {
  position: absolute;
  left: -1em;
  top: 50%;
  transform: translateY(-50%);
  color: #4a7c6f;
}
</style>
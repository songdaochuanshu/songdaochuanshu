<script setup lang="ts">
import { formattedDate } from '@/utils'

interface Article {
  _path: string
  title: string
  date: string
  description?: string
  tags?: string[]
}

const { article } = defineProps<{ article: Article }>()
</script>

<template>
  <NuxtLink
    :to="`/p${article._path}`"
    class="cell-link"
  >
    <div class="cell-inner">
      <!-- 左侧日期标记 -->
      <div class="cell-date">
        <span class="date-year">{{ new Date(article.date).getFullYear().toString().slice(-2) }}</span>
        <span class="date-month">{{ formattedDate(article.date).slice(5) }}</span>
      </div>

      <!-- 右侧内容 -->
      <div class="cell-content">
        <h3 class="cell-title">{{ article.title }}</h3>
        <p v-if="article.description" class="cell-desc">{{ article.description }}</p>
        <div v-if="article.tags && article.tags.length" class="cell-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- 右侧箭头 -->
      <div class="cell-arrow">
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.cell-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.cell-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s ease;
  cursor: pointer;
}

.cell-inner:hover {
  background: var(--common-bg);
  border-color: var(--common-bd);
  transform: translateX(4px);
  box-shadow: var(--shadow-soft);
}

.cell-date {
  flex-shrink: 0;
  text-align: center;
  min-width: 52px;
  padding: 0.4rem 0.3rem;
  border-radius: 8px;
  background: var(--common-bg);
  border: 1px solid var(--border-subtle);
}

.date-year {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.date-month {
  display: block;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

.cell-content {
  flex: 1;
  min-width: 0;
}

.cell-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.3rem 0;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.cell-link:hover .cell-title {
  color: #4a7c6f;
}

.cell-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cell-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--common-bg);
  color: #4a7c6f;
  border: 1px solid var(--common-bd);
}

.cell-arrow {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cell-link:hover .cell-arrow {
  opacity: 0.6;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: var(--primary);
  transform: rotate(-90deg);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .cell-inner {
    padding: 1rem;
    gap: 0.75rem;
  }

  .cell-date {
    min-width: 44px;
  }

  .date-year {
    font-size: 1rem;
  }

  .date-month {
    font-size: 0.7rem;
  }

  .cell-title {
    font-size: 0.95rem;
  }

  .cell-desc {
    font-size: 0.8rem;
    -webkit-line-clamp: 1;
  }

  .cell-arrow {
    display: none;
  }
}
</style>

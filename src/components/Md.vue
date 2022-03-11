<template>
    <div v-if="frontmatter.display ?? frontmatter.title" class="text-center prose m-auto mb-8">
        <h1 class="mb-0">{{ frontmatter.display ?? frontmatter.title }}</h1>
        <p v-if="frontmatter.date" class="opacity-50 !-mt-2">
            {{ formatDate(frontmatter.date ?? new Date()) }}
            <span>· {{ author }}</span>
        </p>
        <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic">{{ frontmatter.subtitle }}</p>
    </div>
    <article ref="content">
        <slot />
    </article>
    <div class="mt-10 mb-6 prose m-auto opacity-50 flex">
        <span class="text-sm m-auto">
            <a
                target="_blank"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                style="color:inherit"
            >CC BY-NC-SA 4.0</a>
            <span class="px-1">by 松岛川树</span>
        </span>
        
    </div>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from "vue";
import { formatDate } from '~/composables/index'

const author = '松岛川树'

const props = defineProps({
    frontmatter: {
        type: Object,
        default: () => ({

        }),
    },
})
const emit = defineEmit({
    onClick: (e: MouseEvent) => {
        console.log(e)
    }
})

onMounted(() => {
    emit
})

const route = useRoute();

useHead({
    title: `${props.frontmatter?.title ?? route.name } | 松岛川树'`,
    meta: [
        {
            hid: "description",
            name: "description",
            content: props.frontmatter.description ?? '',
        },
        {
            hid: "keywords",
            name: "keywords",
            content: props.frontmatter.categories ?? '' + "," + props.frontmatter.tags ?? '',
        },
        // 作者
        {
            hid: "author",
            name: "author",
            content: author
        }
    ],
})

</script>

<style scoped>
</style>
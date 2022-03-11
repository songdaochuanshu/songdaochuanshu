<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-09 17:13:04
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 13:58:24
 * @FilePath: \songdaochuanshu\src\components\ListPosts.vue
-->
<script setup lang="ts">
import list from '~/maps/list.json'
import { formatDate } from '~/composables/index'

</script>

<template>
    <article class="flex">
        <ul class="m-auto" >
            <li
                v-for="(item) in list"
                :key="item.path"
                class="item block font-normal mb-6 mt-2 no-underline"
            >
                    <router-link :to="`/articles${item.path}`">
                        <span class="text-lg">{{ item.title }}</span>
                        <span
                            class="time opacity-50 text-sm mt-1 pl-2"
                        >{{ formatDate(item.date ?? new Date()) }}</span>
                    </router-link>
            </li>
        </ul>
    </article>
</template> 
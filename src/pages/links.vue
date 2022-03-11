<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-11 13:58:11
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 14:07:07
 * @FilePath: \songdaochuanshu\src\pages\links.vue
-->
<script setup lang="ts">
import links from '~/maps/links.json'
useHead({
    title: '友情链接 | 松岛川树',
    meta:[
        {
            hid: "description",
            name: "description",
            content: '松岛川树的友情链接',
        },
        {
            hid: "keywords",
            name: "keywords",
            content: '松岛川树,松岛川树的友情链接',
        },
        {
            hid: "author",
            name: "author",
            content: '松岛川树'
        },
    ]
})
</script>

<template>
    <article class="flex">
        <ul class="m-auto">
            <li
                v-for="item in links"
                :key="item.name"
                class="item block font-normal mb-6 mt-2 no-underline"
            >
                <a :href="item.url" target="_blank">
                    <div class="flex">
                        <img :src="item.avatar" width="40" height="40" />
                        <span class="opacity-50 hover:opacity-100 px-10">{{ item.name }}</span>
                    </div>
                </a>
            </li>
        </ul>
    </article>
</template> 
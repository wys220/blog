<!-- 首页 详情页-->
<template>
    <div class="home-details w100 margin-b20">
        <template v-if="currentBlog?.url">
            <MarkdownRenderer :blogInfo="currentBlog"
                              :rawUrl="currentBlog?.url" />
        </template>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onMounted, nextTick } from "vue"
import store from "@/store"
import { useRoute } from "vue-router";
import MarkdownRenderer from '@c/components/MarkdownRenderer';

const { proxy } = getCurrentInstance();

const route = useRoute()

const blogList = computed(() => store.state.sites?.blogList) //获取缓存里面的全部博客
// 当前文章信息
const currentBlog = computed(() => {
    let info = blogList.value?.find((f) => f.name === currentKey.value)
    return info
})

const currentKey = ref('')

onMounted(() => {
    currentKey.value = route.params?.name || ''
    nextTick(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
})

</script>

<style lang="scss" scoped>
</style>
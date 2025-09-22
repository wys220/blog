<!-- 设置-背景图 -->
<template>
    <div class="bg-image padding10 h100 ofa">
        <div class="image-box"
             v-for="(item,index) in bgLists"
             :key="index">
            <img :title="`背景图${getImgUrl(item)?.number}`"
                 :src="getImgUrl(item)?.url"
                 @click="clickImg(getImgUrl(item)?.number)" />
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, computed } from "vue"
import store from "@/store"

const emit = defineEmits([''])
const { proxy } = getCurrentInstance();

const bgLists = computed(() => store.state.app.bgLists) //vuex状态管理里面的全部背景图列表

// 获取图片
const getImgUrl = (str) => {
    const parts = str.split('/');
    const number = parts[parts.length - 1].replace('.jpg', '');
    let url = new URL(`../../assets/images/bg/${number}.jpg`, import.meta.url).href
    return { url: url, number: number }
}

// 设置背景图
const clickImg = (num = null) => {
    if (!num) return
    store.dispatch('app/updateBgUrl', num)
}

</script>

<style lang="scss" scoped>
.bg-image {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px;
    .image-box {
        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
}
</style>
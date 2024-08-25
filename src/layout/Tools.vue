<template>
    <div class="tools font25 padding5 pf">
        <div class="item"
             @click="toggleTheme()">
            <g-svg-icon v-if="theme === 'light'"
                        name="nightIcon"
                        size="28">
            </g-svg-icon>
            <g-svg-icon v-else
                        name="dayIcon"
                        size="28">
            </g-svg-icon>
        </div>
        <div class="item"
             @click="refreshBg()">
            <g-svg-icon name="refreshIcon"
                        size="28">
            </g-svg-icon>
        </div>
        <div class="item"
             v-if="currentScrollTop > 0"
             @click="gotoTop()">
            <g-svg-icon name="topIcon"
                        size="28">
            </g-svg-icon>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import defeultImageUrl from "@/common/assets/images/bg.jpeg"
import { useTheme } from '../common/hooks/useTheme.js'

const { theme, toggleTheme } = useTheme()
const emit = defineEmits(['getBgUrl'])
const props = defineProps({
    currentScrollTop: {
        typeo: Number,
    }
})

// 置顶
const gotoTop = () => {
    window.scrollTo(0, 0)
}

let bgurlList = ref([])
let imageUrl = ref('')
let count = ref(1)

// 获取所以图片
const allImages = () => {
    const files = import.meta.globEager("@c/assets/images/bg/*.jpg");
    bgurlList.value = Object.keys(files)
    getBgUrl(1)
    // console.log(bgurlList.value, 'bgurlList.value');
}

// 获取图片
const getBgUrl = (index) => {
    // console.log(index, 'index');
    let url = new URL(`../common/assets/images/bg/${index}.jpg`, import.meta.url).href
    imageUrl.value = url || defeultImageUrl

    // console.log(imageUrl.value, 'imageUrl.valueimageUrl.value');
    emit('getBgUrl', imageUrl.value)
}

// 刷新背景
const refreshBg = () => {
    if (count.value > bgurlList.value.length - 1) {
        count.value = 1
    } else {
        count.value++
    }
    getBgUrl(count.value)
}

onBeforeMount(() => {
    allImages()
})
</script>

<style lang="scss" scoped>
.tools {
    bottom: 30px;
    right: 10px;
    background: transparent;
    color: #fff;
    z-index: 999;
    .item {
        display: flex;
        margin: 10px;
        padding: 5px;
        background: var(--bg-color);
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background: #c1c3d2;
        }
    }
}
</style>
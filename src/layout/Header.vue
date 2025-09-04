<!-- 页面头部 -->
<template>
    <header :class="['header','pr',{'header-light':!isDarkTheme}]"
            :style="{'--hieght':isHome?'100vh':'50vh'}">
        <Nav v-if="currentScrollTop === 0 || isUpScroll"
             :currentScrollTop="currentScrollTop"
             :isUpScroll="isUpScroll">
        </Nav>
        <div class="pa w100 t-center info-group padding40">
            <h1 style='font-family: "仓耳渔阳体 W02"'>吾顺博客</h1>
            <div class="margin-t10">
                <TypeWriter :text="text"
                            :typing-speed="150"
                            :deleting-speed="50"
                            :pause-duration="3000"
                            :loop="true" />
            </div>
        </div>
        <div class="more pa w100 font30 t-center">
            <g-icons @click="jump('main-area')"
                     iconName="icon-zhidi"
                     className="cp"
                     size="30">
            </g-icons>
        </div>
    </header>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import Nav from './Nav.vue'
import Search from './Search.vue'
import { useTheme } from '../common/hooks/useTheme.js'
import router from "@/router";
import store from "@/store"
import TypeWriter from "@c/components/TypeWriter"

const props = defineProps({
    currentScrollTop: {
        typeo: Number,
    },
    isUpScroll: {
        typeo: Boolean,
        default: false
    }
})

const { theme } = useTheme()

let isDarkTheme = computed(() => theme.value === 'dark')
const isHome = ref(true)
let text = "生活，有所为，有所爱，有所期待！"

// 跳转置顶id位置
const jump = (id) => {
    document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" })
}

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
    // console.log('watch', newValue);
    if (['/', '/home'].includes(newValue)) {
        isHome.value = true
    } else {
        isHome.value = false
    }
}, { immediate: true })


</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: var(--hieght);
    z-index: 1;
    // background: #e96969;
    background: transparent !important;
    .search {
        top: 28%;
        color: #fff;
    }
    .info-group {
        top: 40%;
        color: #fff;
    }
    .more {
        bottom: 3px;
        animation: move-up-down 2s infinite;
    }

    /* 定义动画规则 */
    @keyframes move-up-down {
        0% {
            bottom: 0;
            transform: translateY(0);
            color: #6b6b6b;
        }
        50% {
            bottom: 8px;
            transform: translateY(-5px);
            color: #fff;
        }
        100% {
            bottom: 0;
            transform: translateY(0);
            color: #6b6b6b;
        }
    }
}
.header-light::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
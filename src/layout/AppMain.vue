<template>
    <Astral v-if="isDarkTheme"></Astral>
    <div :class="['bg',{'dark-bg':isDarkTheme}]"
         :style="{'--bgUrl':`url(${imageUrl})`}"></div>
    <div class="container  text-center">
        <Header :currentScrollTop="currentScrollTop"
                :isUpScroll="isUpScroll">
        </Header>
        <main class="main padding-tb40 padding-lr25"
              id="main">
            <div class="main-area pr margin-r20"
                 ref="fullScreenRef">
                <g-svg-icon v-if="isShowBack"
                            name="back"
                            class="back"
                            color="#ffffff"
                            @click="$router.go(-1)"
                            size="18">
                </g-svg-icon>
                <g-svg-icon :name="isFullscreen ? 'cancelFullScreen' : 'fullScreen'"
                            @click="toggleFullscreen($refs.fullScreenRef)"
                            class="full-screen"
                            size="20">
                </g-svg-icon>
                <router-view />
            </div>
            <div class="f1">
                <Sidebar></Sidebar>
            </div>
        </main>
        <footer class="footer">@copyright 20240501 吾顺日记</footer>
    </div>
    <!-- 工具栏 -->
    <Tools :currentScrollTop="currentScrollTop"
           @getBgUrl="(val) =>imageUrl = val"></Tools>
    <!-- 播放器 -->
    <g-aplayer></g-aplayer>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, getCurrentInstance, watch } from 'vue'
import { useTheme } from '../common/hooks/useTheme.js'
import Astral from './Astral.vue'
import Tools from './Tools.vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import { useFullscreen } from "@c/tools/FullScreen.js"
import { useRoute } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRoute()

const { isFullscreen, toggleFullscreen } = useFullscreen()

const { theme } = useTheme()

const imageUrl = ref('')

let isDarkTheme = computed(() => theme.value === 'dark')

let currentScrollTop = ref(0)
let isUpScroll = ref(false)
// 鼠标滚动事件
const doScroll = () => {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollStep = scroll - currentScrollTop.value;
    currentScrollTop.value = scroll
    // console.log(currentScrollTop.value, 'currentScrollTop.value')

    if (scrollStep < 0) {
        isUpScroll.value = true
    } else {
        isUpScroll.value = false

    }
}

const isShowBack = ref(false)

watch(() => route, (v) => {
    if (v?.meta?.isBackIcon) {
        isShowBack.value = true
    } else {
        isShowBack.value = false
    }
}, { deep: true })

onMounted(() => {
    window.addEventListener('scroll', doScroll)
})
onBeforeMount(() => {
    window.removeEventListener('scroll', doScroll)
})
</script>

<style lang="scss" scoped>
.bg {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -999;
    background: var(--bgUrl);
    background-attachment: local;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    background-repeat: no-repeat;
}
.dark-bg::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: -1;
}
.container {
    .main {
        display: flex;
        width: 100%;
        max-width: 1200px;
        // min-height: 50vh;
        background: transparent;
        margin: 0 auto;
        .main-area {
            width: 75%;
            background: var(--bg-color);
            color: var(--text-color);
            padding: 40px 10px 10px 10px;
            border-radius: 8px;
            .full-screen {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }
            .back {
                position: absolute;
                left: 10px;
                top: 10px;
                cursor: pointer;
            }
        }
    }
    .footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: transparent;
        color: #fff;
        margin: 0 auto;
        border-radius: 10px;
        padding: 20px;
    }
}
</style>
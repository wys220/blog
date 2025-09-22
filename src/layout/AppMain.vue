<!-- 入口文件：//images.weserv.nl/?url= -->
<template>
    <Astral v-if="isDarkTheme"></Astral>
    <div :class="['bg',{'dark-bg':isDarkTheme}]"
         :style="{'--bgUrl':`url(${currentBgUrl})`}"></div>
    <div class="container">
        <Header :currentScrollTop="currentScrollTop"
                :isUpScroll="isUpScroll">
        </Header>
        <main class="main-area padding-tb40 padding-lr25"
              id="main-area"
              data-expanded="true">
            <div class="main-inner f1 pr ofa padding-b20"
                 id="main-inner"
                 ref="fullScreenRef">
                <g-icons v-if="isShowBack"
                         iconName="icon-fanhui"
                         className="back"
                         size="25"
                         @click="backPage()">
                </g-icons>
                <g-icons :iconName="isFullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
                         className="full-screen"
                         size="23"
                         @click="toggleFullscreen($refs.fullScreenRef)">
                </g-icons>
                <router-view />
                <div class="box-arrow pa cp"
                     title="展开/收起"
                     @click="handleSidebar()">
                    <g-icons iconName="icon-lanmu1"
                             className="icon-zuoyou"
                             size="22">
                    </g-icons>
                </div>
            </div>
            <div class="sidebar-box">
                <Sidebar></Sidebar>
            </div>
        </main>
        <footer class="footer t-center">{{ userInfo?.copyright }}</footer>
    </div>
    <!-- 工具栏 -->
    <Tools :currentScrollTop="currentScrollTop"></Tools>
    <!-- 播放器 -->
    <g-aplayer></g-aplayer>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, getCurrentInstance, watch, nextTick } from 'vue'
import { useTheme } from '../common/hooks/useTheme.js'
import Astral from './Astral.vue'
import Tools from './Tools.vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import store from "@/store"
import router from "@/router"

import { useFullscreen } from "@c/tools/FullScreen.js"
import { useRoute } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRoute()

const { isFullscreen, toggleFullscreen } = useFullscreen()

const { theme } = useTheme()

const currentBgUrl = computed(() => store.state.app.currentBgUrl)

let isDarkTheme = computed(() => theme.value === 'dark')
const userInfo = computed(() => store.state.app?.userInfo) // 用户信息
let currentScrollTop = ref(0)
let isUpScroll = ref(false)
// 鼠标滚动事件
const doScroll = () => {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollStep = scroll - currentScrollTop.value;
    currentScrollTop.value = scroll

    if (scrollStep < 0) {
        isUpScroll.value = true
    } else {
        isUpScroll.value = false
    }
}
// 返回
const backPage = () => {
    router.go(-1)
}
// 侧边栏展开收起
const handleSidebar = (falg = true) => {
    let con = document.querySelector(".main-area")
    let isExpanded = sessionStorage.getItem("isExpanded") ? sessionStorage.getItem("isExpanded") === 'true' : true
    if (!falg) {
        con.dataset.expanded = isExpanded
    } else {
        sessionStorage.setItem('isExpanded', !isExpanded)
        con.dataset.expanded = !isExpanded
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
    handleSidebar(false)
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
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    z-index: -1;
}
.container {
    /* 当屏幕宽度小于等于 600px 时应用的样式 */
    @media only screen and (max-width: 670px) {
        .main-area {
            flex-direction: column;

            .box-arrow {
                display: none;
            }
        }
        .main-area[data-expanded="true"] .sidebar-box {
            width: 100% !important;
            margin-top: 20px;

            .siderbar {
                margin-left: 0;
            }
        }
    }
    .main-area {
        display: flex;
        width: 100%;
        max-width: 1250px;
        // min-height: 50vh;
        background: transparent !important;
        margin: 0 auto;
        .main-inner {
            background: var(--bg-color);
            color: var(--text-color);
            padding: 40px 30px 10px 10px;
            border-radius: 8px;
            .full-screen {
                position: absolute;
                right: 30px;
                top: 11px;
                cursor: pointer;
            }
            .back {
                position: absolute;
                left: 10px;
                top: 10px;
                cursor: pointer;
            }
            .box-arrow {
                top: 0;
                right: 0;
                height: 100%;
                width: 22px;
                background-color: transparent;
                &:hover {
                    background-color: var(--bg-color);
                }
                .icon-zuoyou {
                    top: 11px;
                    right: 0;
                }
            }
        }
        .sidebar-box {
            width: 0;
            transition: all 0.3s;
        }
    }
    .main-area[data-expanded="true"] .sidebar-box {
        width: 250px;
    }
    .footer {
        width: 100%;
        height: 50px;
        line-height: 28px;
        background: transparent;
        color: #fff;
        margin: 0 auto;
        border-radius: 10px;
        padding: 20px;
    }
}
</style>
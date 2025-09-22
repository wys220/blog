<!-- 页面头部 -->
<template>
    <header :class="['header','pr','flex',{'header-light':!isDarkTheme}]"
            :style="{'--hieght':isHome?'100vh':'50vh'}">
        <Nav v-if="currentScrollTop === 0 || isUpScroll"
             :currentScrollTop="currentScrollTop"
             :isUpScroll="isUpScroll">
        </Nav>
        <div class="pa w100 t-center info-group padding40 flex-col-c">
            <div class="avatar">
                <img :src="userAvatar"
                     alt=""
                     srcset="">
            </div>
            <div class="margin-t10">
                <TypeWriter :text="userInfo?.motto || defaultText"
                            fontSize="22px"
                            :typing-speed="150"
                            :deleting-speed="50"
                            :pause-duration="3000"
                            :loop="true" />
            </div>
        </div>
        <div class="more pa w100 font30 t-center">
            <g-icons @click="jumpElement()"
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
import userAvatar from "@/assets/images/user_avatar.png"
import { useTheme } from '../common/hooks/useTheme.js'
import router from "@/router";
import store from "@/store"
import TypeWriter from "@c/components/TypeWriter"
import { jumpElement } from "@c/tools/common"

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

const userInfo = computed(() => store.state.app?.userInfo) // 用户信息

const isHome = ref(true)
let defaultText = "生活，有所为，有所爱，有所期待！"

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
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
        color: #fff;
        .avatar {
            width: 80px;
            height: 80px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid var(--text-color);
            }
        }
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
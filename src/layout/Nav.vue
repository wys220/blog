<template>
    <div class="nav pf w100 flex-sb padding-l10 padding-r10"
         :style="navStyleObj">
        <div class="font40 logo flex">
            <img :src="logoUrl"
                 alt="logo"
                 srcset="">
        </div>
        <div class="f1 flex-e h100">
            <div class="margin-r10 margin-l10 f1"
                 v-if="props.isUpScroll && props.currentScrollTop > 0">
                <Search></Search>
            </div>
            <div class="flex-e menus margin-l20">
                <div class="menus-item"
                     @click="goPage('')">
                    <a href="javascript:void(0);"> 首页</a>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">发现
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li>日记</li>
                        <li>文章</li>
                        <li>标签</li>
                    </ul>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">娱乐
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li @click="goPage('picture')">相册</li>
                        <li @click="goPage('video')">视频</li>
                    </ul>
                </div>
                <div class="menus-item"
                     @click="goPage('tools')">
                    <a href="javascript:void(0);">工具</a>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">关于</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import Search from './Search.vue'
import logoUrl from "@/common/assets/images/logo.png"

const { proxy } = getCurrentInstance();

const props = defineProps({
    currentScrollTop: {
        type: Number,
        default: 0
    },
    isUpScroll: {
        type: Boolean,
        default: false
    }
})

let navStyleObj = computed(() => {
    if (props.isUpScroll && props.currentScrollTop > 0) {
        return { '--bgColor': 'rgba(255, 255, 255, 0.75)', '--color': '#000' }
    } else {
        return { '--bgColor': 'rgba(0, 0, 0, 0)', '--color': '#fff' }
    }
})

// 跳转
const goPage = (url) => {
    proxy.$router.push(`/${url}`)
}

</script>

<style lang="scss" scoped>
.nav {
    height: 60px;
    background: var(--bgColor);
    transition: all 0.5s;
    z-index: 999;
    .logo {
        width: 180px;
        height: 50px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .menus {
        .menus-item {
            position: relative;
            margin-right: 20px;
            font-size: 16px;
            a {
                color: var(--color);
                position: relative;
                padding-bottom: 20px;
                transition: all 0.2s;
                overflow-wrap: break-word;
                text-decoration: none !important;
                .icon {
                    top: 3px;
                }
            }
        }
        .menus-item:hover {
            & a::after {
                position: absolute;
                content: "";
                width: 100%;
                height: 2px;
                bottom: 10px;
                right: 0;
                background: var(--color);
                transition: all 0.5s;
            }
            .icon {
                transform: rotate(180deg);
            }
            & > ul {
                display: block;
            }
        }
    }

    ul {
        display: none;
        position: absolute;
        width: max-content;
        background: #f6f8fa;
        color: #000;
        top: 40px;
        right: 0;
        // border-radius: 8px;
        box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
        animation: sub_menus 0.2s 0.1s ease both;
        li {
            cursor: pointer;
            list-style-type: none;
            padding: 10px 20px;
            font-size: 14px;
            &:hover {
                background: #9da4e9;
                color: #fff;
            }
        }

        @keyframes sub_menus {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }
}
</style>
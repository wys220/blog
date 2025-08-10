<!-- 顶部导航栏 -->
<template>
    <div class="nav pf w100 flex-sb padding-l10 padding-r10"
         :style="navStyleObj">
        <div class="font40 flex-s">
            <div class="logo">
                <img :src="currenLogoUrl"
                     alt="logo"
                     srcset="" />
            </div>
            <div class="flex-s f1 menus margin-l20">
                <div class="menus-item"
                     @click="goPage('home')">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-shouye"
                                 size="20"></g-icons>首页
                    </a>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-faxian"
                                 size="20"></g-icons>发现
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li @click="goPage('')"><g-icons iconName="icon-riji"></g-icons>日记</li>
                        <li @click="goPage('')"><g-icons iconName="icon-wenzhang"></g-icons>文章</li>
                        <li @click="goPage('')"><g-icons iconName="icon-biaoqian"></g-icons>标签</li>
                    </ul>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-yule"
                                 size="20"></g-icons>娱乐
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li @click="goPage('picture')"><g-icons iconName="icon-tupian"></g-icons>相册</li>
                        <li @click="goPage('video')"><g-icons iconName="icon-shipin"></g-icons>视频</li>
                    </ul>
                </div>
                <div class="menus-item"
                     @click="goPage('tools')">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-gongjuxiang"
                                 size="20"></g-icons>工具
                    </a>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-youqinglianjie"
                                 size="20"></g-icons>友情链接
                    </a>
                </div>
                <div class="menus-item">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-guanyu-active"
                                 size="20"></g-icons>关于
                    </a>
                </div>
            </div>
        </div>
        <div class="flex-e h100">
            <div class="margin-r10 margin-l10 f1">
                <Search></Search>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref } from 'vue'
import Search from './Search.vue'
import logoUrl from "@/assets/images/logo/logo.png"
import logoWhiteUrl from "@/assets/images/logo/logo_white.png"

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

const currenLogoUrl = ref(logoWhiteUrl)

let navStyleObj = computed(() => {
    if (props.isUpScroll && props.currentScrollTop > 0) {
        currenLogoUrl.value = logoUrl
        return { '--bgColor': 'rgba(255, 255, 255, 0.75)', '--color': '#000' }
    } else {
        currenLogoUrl.value = logoWhiteUrl
        return { '--bgColor': 'rgba(0, 0, 0, 0)', '--color': '#fff' }
    }
})

// 跳转
const goPage = (url) => {
    if (!url) return
    proxy.$router.push(`/${url}`)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
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

                svg {
                    margin-right: 2px;
                }
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
        background: #000000;
        color: #fff;
        top: 40px;
        right: 0;
        border-radius: 4px;
        box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
        animation: sub_menus 0.2s 0.1s ease both;
        li {
            cursor: pointer;
            list-style-type: none;
            padding: 10px 20px;
            font-size: 14px;
            svg {
                margin-right: 2px;
            }
            &:hover {
                background: #2b2b2b;
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
<!-- 顶部导航栏 -->
<template>
    <div class="nav pf w100 flex-sb padding-l10 padding-r10"
         :style="navStyleObj">
        <div class="font40 flex-s">
            <div class="logo-box cp"
                 @click="goPage('home')">
                <img :src="defaultLogo"
                     alt="logo"
                     srcset="" />
            </div>
            <div class="flex-s f1 menus margin-l20">
                <div class="menus-item big-screen"
                     @click="goPage('home')">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-shouye"
                                 size="20"></g-icons>首页
                    </a>
                </div>
                <div class="menus-item big-screen"
                     @click="goPage('blog')">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-faxian"
                                 size="20"></g-icons>随记
                    </a>
                </div>
                <div class="menus-item big-screen"
                     @click="goPage('tools')">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-gongjuxiang"
                                 size="20"></g-icons>工具
                    </a>
                </div>
                <div class="menus-item big-screen">
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
                <div class="menus-item big-screen">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-shezhi"
                                 size="20"></g-icons>设置
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li @click="goPage('about')"><g-icons iconName="icon-guanyu"></g-icons>关于</li>
                        <li @click="goPage('bgImage')"><g-icons iconName="icon-bizhi"></g-icons>壁纸</li>
                    </ul>
                </div>

                <!-- 简易版移动端 -->
                <div class="menus-item small-screen">
                    <a href="javascript:void(0);">
                        <g-icons iconName="icon-lanmushezhi"
                                 size="18"></g-icons>菜单
                        <el-icon class="icon">
                            <ArrowDown />
                        </el-icon>
                    </a>
                    <ul class="ul">
                        <li @click="goPage('home')"><g-icons iconName="icon-shouye"></g-icons>首页</li>
                        <li @click="goPage('blog')"><g-icons iconName="icon-faxian"></g-icons>随记</li>
                        <li @click="goPage('tools')"><g-icons iconName="icon-gongjuxiang"></g-icons>工具</li>
                        <li @click="goPage('picture')"><g-icons iconName="icon-tupian"></g-icons>相册</li>
                        <li @click="goPage('video')"><g-icons iconName="icon-shipin"></g-icons>视频</li>
                        <li @click="goPage('about')"><g-icons iconName="icon-guanyu"></g-icons>关于</li>
                        <li @click="goPage('bgImage')"><g-icons iconName="icon-bizhi"></g-icons>壁纸</li>
                    </ul>
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
import defaultLogo from "@/assets/images/logo/default_logo.png"
import { goPage } from "@c/tools/common"

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


</script>

<style lang="scss" scoped>
.nav {
    top: 0;
    height: 60px;
    background: var(--bgColor);
    transition: all 0.5s;
    z-index: 999;
    .logo-box {
        width: 45px;
        height: 45px;
        background: #975a16;
        img {
            height: 100%;
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

@media only screen and (max-width: 670px) {
    .search {
        width: 180px;
    }
    .menus {
        .big-screen {
            display: none;
        }
    }
}

@media only screen and (min-width: 670px) {
    .menus {
        .small-screen {
            display: none;
        }
    }
}
</style>
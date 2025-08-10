<!-- 右侧悬浮工具栏 -->
<template>
    <div class="tools font25 padding5 pf">
        <div class="item"
             @click="openSetting()">
            <g-icons iconName="icon-shezhi"
                     size="28"></g-icons>
        </div>
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
    <Setting ref="settingRef"></Setting>
</template>

<script setup>
import { getCurrentInstance } from "vue"
import { useTheme } from '../common/hooks/useTheme.js'
import store from "@/store"
import Setting from "./Setting.vue"

const props = defineProps({
    currentScrollTop: {
        typeo: Number,
    }
})

const emit = defineEmits(['getBgUrl'])
const { proxy } = getCurrentInstance();

const { theme, toggleTheme } = useTheme()

// 置顶
const gotoTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
// 刷新背景图
const refreshBg = () => {
    store.dispatch('app/updateBgUrl')
}
// 打开设置
const openSetting = () => {
    proxy.$refs.settingRef?.open()
}
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
            background: #bec5ff;
        }
    }
}
</style>
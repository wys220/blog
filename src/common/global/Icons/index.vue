<!-- 阿里矢量图标组件 -->
<template>
    <svg :class="svgClass"
         :style="{ 'font-size': size + 'px' }"
         aria-hidden="true">
        <use :xlink:href="iconClassName"
             :fill="color" />
    </svg>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
    // 图标名称
    iconName: {
        type: String,
        required: true,
    },
    // 图标自适应类
    className: {
        type: String,
        default: "",
    },
    // 图标颜色
    color: {
        type: String,
        default: "",
    },
    // 图标大小
    size: {
        type: String,
        default: "16",
    },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
    return `#${props.iconName}`;
});
// 给图标添加上类名
const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon ${props.className}`;
    }
    return "svg-icon";
});
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>

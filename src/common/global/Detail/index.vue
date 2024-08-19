<!-- 详情布局公共组件 -->
<template>
    <div class="details-container pr h100 w100 ofa">
        <div class="detail-mian h100 w100 ofa">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({});
</script>

<style lang="scss" scoped>
.details-container {
    .back {
        position: absolute;
        left: 10px;
        top: 0;
        cursor: pointer;
        &:hover {
            background: #e5e5e5;
        }
    }
}
</style>
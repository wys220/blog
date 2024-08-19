<!-- 工具页面 -->
<template>
    <div class="tools-type">
        <div class="box w100 padding10">
            <div v-for="(i, index) in typeList"
                 :key="index"
                 @click="selectType(i)"
                 class="box-item">
                {{ i.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";

// 类型列表
const typeList = ref([
    { type: "DrawRectangle", name: "canvas绘制矩形" },
    { type: "MathsCompute", name: "数学计算题" },
]);
// 选择类型
const selectType = (val) => {
    // console.log(val, '工具类型val');
    router.push(`/tools/details/${val?.type}`)
};

</script>

<style lang="scss" scoped>
.tools-type {
    .box {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px 20px;
        .box-item {
            cursor: pointer;
            min-height: 100px;
            border: 1px solid #b17676;
        }
    }
}
</style>
<!-- 工具页面 -->
<template>
    <div class="tools-type w100">
        <div class="box w100 padding10">
            <div v-for="(i, index) in typeList"
                 :key="index"
                 @click="selectType(i)"
                 class="box-item">
                <div class="item flex-s">
                    <div class="icon">
                        <g-svg-icon :name="i.icon"
                                    class="back"
                                    size="40">
                        </g-svg-icon>
                    </div>
                    <div class="content">
                        <div class="name line1">{{ i.name }}</div>
                        <p class="desc line1"
                           :title="i.desc">{{ i.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";

// 类型列表
const typeList = ref([
    { type: "DrawRectangle", icon: 'drawRectangle', name: "canvas绘制矩形", desc: '使用canvas绘制可编辑的矩形。' },
    { type: "MathsCompute", icon: 'mathsCompute', name: "数学计算题", desc: '生成数学计算题题目。' },
    { type: "Signature", icon: 'signature', name: "电子签名", desc: '使用canvas实现简易版的电子签名，同时支持预览和生成图片。' },
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
        gap: 10px 10px;
        .box-item {
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            border-radius: 5px;
            padding: 21px 15px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            top: 0;
            // margin: 10px;
            .item {
                min-width: 0;
                .content {
                    text-align: left;
                    margin-left: 10px;
                    overflow: hidden;
                    .name {
                        width: 100%;
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: 700;
                        color: var(--text-color);
                        line-height: 1.2;
                    }
                    .desc {
                        min-width: 0;
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
            &:hover {
                top: -4px;
                box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
            }
        }
    }
}
</style>
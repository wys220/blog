<!-- 工具页面 -->
<template>
    <div class="tools-type w100 padding10">
        <div v-if="tools"
             class="flex-s margin-b10">
            <div class="font22 fontw">{{ tools?.name }}:</div>
            <div class="font18 f1 line1 t-left padding-l5">{{ tools?.desc }}</div>
        </div>
        <div v-for="(item,Iindex) in tools?.data"
             :key="Iindex"
             class="margin-b20">
            <div class="type-box margin-b5 cp pr flex-sb"
                 @click="openClose(Iindex)">
                <div class="flex">
                    <g-icons iconName="icon-faxian"
                             className="padding-r5"
                             size="32">
                    </g-icons>{{ item.type }}
                </div>
                <div>
                    <g-icons :iconName="item.isOpen ? 'icon-down' : 'icon-up'"
                             className="padding-r5"
                             size="28">
                    </g-icons>
                </div>
            </div>
            <div class="box"
                 v-if="!item.isOpen">
                <div v-for="(i, index) in item?.list"
                     :key="index"
                     @click="selectTool(i)"
                     class="box-item">
                    <div class="item flex-s">
                        <div class="icon">
                            <g-icons :iconName="i?.icon || 'icon-tiaozhuan'"
                                     size="40">
                            </g-icons>
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
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import router from "@/router";
import store from "@/store"

const tools = computed(() => store.state.sites?.allTools) //获取缓存里面的所有工具


// 类型列表
const typeList = ref([
    { type: "DrawRectangle", icon: 'drawRectangle', name: "canvas绘制矩形", desc: '使用canvas绘制可编辑的矩形。' },
    { type: "MathsCompute", icon: 'mathsCompute', name: "数学计算题", desc: '生成数学计算题题目。' },
    { type: "Signature", icon: 'signature', name: "电子签名", desc: '使用canvas实现简易版的电子签名，同时支持预览和生成图片。' },
]);
// 选择类型
const selectType = (item) => {
    // router.push(`/tools/details/${val?.type}`)
};

// 选择工具跳转
const selectTool = (item) => {
    if (!item?.url) return
    window.open(item?.url, '_blank')
};
// 展开收起
const openClose = (index) => {
    tools.value.data[index].isOpen = !tools.value.data[index]?.isOpen
}
onMounted(() => {
    tools.value?.data?.forEach(element => {
        element.isOpen = false
    });
})
</script>

<style lang="scss" scoped>
.tools-type {
    .type-box {
        &:hover {
            background: var(--bg-color);
        }
    }
    .box {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px;
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
                    color: var(--text-color);
                    overflow: hidden;
                    .name {
                        width: 100%;
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: 700;
                        line-height: 1.2;
                    }
                    .desc {
                        min-width: 0;
                        font-size: 12px;
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
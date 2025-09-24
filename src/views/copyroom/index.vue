<!-- 文案馆 -->
<template>
    <div class="container flex w100">
        <div class="sider-box">
            <div class="box-item"
                 :class="{'active':el.key === currentItem?.key}"
                 v-for="(el,index) in sideList"
                 :key="index"
                 @click="clickSide(el)">
                {{ el.name }}
            </div>
        </div>
        <div class="fl margin-l10 flex-col-b w100">
            <div class="flex-c">
                <div class="btn flex-c"
                     @click="getCurrentText()">
                    <g-icons iconName="icon-shuaxin"
                             size="18"></g-icons>刷新
                </div>
                <div class="btn flex-c"
                     @click="copyText(currentText)">
                    <g-icons iconName="icon-fuzhi"
                             size="17"></g-icons>复制
                </div>
            </div>
            <div class="text">{{ currentText }}</div>
        </div>
    </div>
</template>

<script setup name='copyroom'>
import { getCurrentInstance, onMounted, ref } from "vue";
import router from "@/router";
import { copyText } from "@c/tools/common"

import {
    getSaoHuaAPI,
    getWenAnAnWeiAPI,
    getWenAnAiQingAPI,
    getWenAnGaoXiaoAPI,
    getWenAnShiCiAPI,
    getWenAnWeiMeiAPI,
    getWenAnTiaoPiAPI,
    getWenAnMeijuAPI,
    getWenAnLiZhiAPI,
} from "@/common/api/common";

const { proxy } = getCurrentInstance();

// 侧边栏列表
const sideList = ref([
    { name: '安慰', api: getWenAnAnWeiAPI, key: 'anwei', result: 'anwei' },
    { name: '爱情', api: getWenAnAiQingAPI, key: 'aiqing', result: 'text' },
    { name: '搞笑', api: getWenAnGaoXiaoAPI, key: 'gaoxiao', result: 'msg' },
    { name: '诗词', api: getWenAnShiCiAPI, key: 'shici', result: 'msg' },
    { name: '唯美', api: getWenAnWeiMeiAPI, key: 'weimei', result: 'msg' },
    { name: '调皮', api: getWenAnTiaoPiAPI, key: 'tiaopi', result: 'msg' },
    { name: '美句', api: getWenAnMeijuAPI, key: 'meiju', result: 'msg' },
    { name: '励志', api: getWenAnLiZhiAPI, key: 'lizhi', result: 'msg' },
    { name: '骚话', api: getSaoHuaAPI, key: 'saohua', result: 'saohua' },
])
const currentItem = ref(null) //当前侧边栏
// 点击侧边栏
const clickSide = (el) => {
    if (currentItem.value?.key == el.key) return
    currentItem.value = el
    getCurrentText()
}
const currentText = ref('') //当前右侧的值
// 获取文案
const getCurrentText = async () => {
    if (!currentItem.value?.api) return
    let API = currentItem.value?.api
    let result = currentItem.value?.result
    const res = await API()
    if (res) {
        currentText.value = res?.[result] || ''
    } else {
        currentText.value = ''
    }
}

onMounted(() => {
    currentItem.value = sideList.value[0]
    getCurrentText()
});
</script>

<style lang="scss" scoped>
.container {
    align-items: flex-start;
    .sider-box {
        min-width: 80px;

        .box-item {
            padding: 6px 8px;
            margin-bottom: 10px;
            text-align: center;
            background: var(--bg-color);
            cursor: pointer;
            border-radius: 8px;
            font-size: 17px;
        }
        .active,
        .box-item:hover {
            color: $theme-color;
        }
    }

    .btn {
        padding: 6px 20px;
        margin-bottom: 10px;
        text-align: center;
        background: var(--bg-color);
        cursor: pointer;
        border-radius: 8px;
        font-size: 15px;
        margin: 0 10px;
        border: 1px solid var(--border-color);

        svg {
            margin-right: 5px;
        }
    }

    .text {
        border-top: 1px solid var(--border-color);
        line-height: 27px;
        font-size: 16px;
        padding: 10px;
        margin-top: 20px;
        text-align: center;
    }
}
</style>
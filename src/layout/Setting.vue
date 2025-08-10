<!-- 全局系统设置 -->
<template>
    <el-drawer v-model="visible"
               size="600px"
               modal="false"
               class="setting-box-drawer">
        <div class="flex-s h100 ofh">
            <div class="left h100 ofa padding-tb10 font14 padding-r5">
                <div class="item cp text-center padding10"
                     :class="{'item-active': currentItem?.key == item.key}"
                     v-for="(item,index) in sideList"
                     :key="index"
                     @click="clickItem(item)">
                    {{ item.name }}
                </div>
            </div>
            <div class="rigth f1 h100 ofa font15">
                <component :is="currentItem?.component"></component>
            </div>
        </div>
    </el-drawer>
</template>
  
<script setup>
import { ref } from 'vue'
import BgImage from '@c/components/setting/BgImage.vue';
import DynamicEffect from '@c/components/setting/DynamicEffect.vue';


const visible = ref(false) // 控制抽屉显示隐藏

//默认选中的侧边栏
const defaultItem = { name: '设置背景', component: BgImage, key: 'BgImage' }

// 侧边栏列表
const sideList = [
    defaultItem, //背景图
    { name: '动态效果', component: DynamicEffect, key: 'DynamicEffect' },
    // { name: '设置主题', component: DynamicEffect, key: 'DynamicEffect1' },
    // { name: '个人中心', component: DynamicEffect, key: 'DynamicEffect2' },
]

const currentItem = ref(defaultItem)

// 点击侧边栏
const clickItem = (item) => {
    if (currentItem.value?.key == item.key) return
    currentItem.value = item
    console.log(currentItem.value, ' currentItem.value');
}


// 打开组件
const open = () => {
    visible.value = true
}


defineExpose({ open })

</script>
  
<style lang="scss" scoped>
.left {
    width: 125px;
    border-right: 1px solid #e6e8eb;
    .item {
        &:hover {
            background-color: #d1edc4;
        }
    }
    .item-active {
        background-color: #b3e19d;
    }
}
</style>

<style lang="scss">
.setting-box-drawer {
    margin-right: 10px;
    top: unset !important;
    bottom: 10px !important;
    height: calc(100vh - 20px) !important;
    border-radius: 4px;

    .el-drawer__header {
        height: 20px;
        background: #529b2e;
        padding: 15px;
        font-weight: bold !important;
        color: #fff;
        margin-bottom: 0;
    }

    .el-drawer__body {
        padding: 0 !important;
    }
}
</style>
  
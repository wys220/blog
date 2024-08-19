<!-- 文案馆 -->
<template>
    <div class="container">
        <div class="body">
            <ChickenSoup v-if="activeIndex == '1'"></ChickenSoup>
            <Dog v-if="activeIndex == '2'"></Dog>
            <YuLu v-if="activeIndex == '3'"></YuLu>
        </div>
        <div class="footer">
            <div @click="goto('1')"
                 :class="{'active': activeIndex == '1'}">毒鸡汤</div>
            <div @click="goto('2')"
                 :class="{'active': activeIndex == '2'}">舔狗日记</div>
            <div @click="goto('3')"
                 :class="{'active': activeIndex == '3'}">经典语录</div>
        </div>
    </div>
</template>

<script setup name='copyroom'>
import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    reactive,
    ref,
} from "vue";
import router from "@/router";
import ChickenSoup from './ChickenSoup'
import Dog from './Dog'
import YuLu from './YuLu'

const { proxy } = getCurrentInstance();
const activeIndex = ref('1')

// 切换tab
const goto = (index) => {
    activeIndex.value = index
}

onMounted(() => {
});
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    .body {
        width: 100%;
        height: calc(100vh - 50px);
        overflow: auto;
        background-color: #d1edc4;
    }
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #b3e19d;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        div {
            width: 33.3%;
            height: 50px;
            line-height: 50px;
            border-right: 1px solid #2aaddd;
            border-left: 1px solid #2aaddd;
        }
        .active {
            color: #337ecc;
        }
    }
}
</style>
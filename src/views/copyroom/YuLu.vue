<!-- 毒鸡汤组件 -->
<template>
    <div class="main">
        <div class="title">经典语录</div>
        <div class="content">{{ contentVal }}</div>
        <div class="btn">
            <el-button type="primary"
                       plain
                       v-copy="contentVal">复制语录</el-button>
            <el-button type="primary"
                       @click="getDataFun()">再来一句</el-button>
        </div>
    </div>
</template>

<script setup name='Yulu'>
import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    reactive,
    ref,
} from "vue";
import { getYuluInfo } from "@/common/api/common";
import router from "@/router";

const { proxy } = getCurrentInstance();

const contentVal = ref('')

const getDataFun = async () => {
    const res = await getYuluInfo()
    res && (contentVal.value = res)
}

onMounted(() => {
    getDataFun()
});
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .title {
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        font-weight: bold;
    }
    .content {
        // flex: 1;
        padding: 20px 40px;
        line-height: 35px;
        font-size: 25px;
        text-align: left;
        font-family: cursive;
        font-weight: bold;
        letter-spacing: 2px;
    }
    .btn {
        height: 100px;
        padding: 20px;
        button {
            font-size: 18px;
            padding: 20px;
            letter-spacing: 2px;
        }
    }
}
</style>
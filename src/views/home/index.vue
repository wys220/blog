<template>
    <div class="home-container">
        <el-tabs v-model="activeName"
                 class="demo-tabs"
                 @tab-click="handleClick">
            <el-tab-pane label="推荐文章"
                         name="first">推荐文章
            </el-tab-pane>
            <el-tab-pane label="热门工具"
                         name="second">热门工具
                <gUploadImg></gUploadImg>
            </el-tab-pane>
            <el-tab-pane label="友情链接"
                         name="third">友情链接
                <gUploadImgList></gUploadImgList>
            </el-tab-pane>
            <el-tab-pane label="其他娱乐"
                         name="fourth">其他娱乐
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();

const activeName = ref('first')

const handleClick = (tab, event) => {
    console.log(tab, event)
}

</script>

<style lang="scss" scoped>
.home-container {
    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
    :deep(.el-tabs__nav-wrap::after) {
        background-color: var(--text-color);
    }
    :deep(.el-tabs__item) {
        color: var(--text-color);
    }
    :deep(
            .el-tabs__item.is-active,
            .el-tabs__item:hover,
            .el-tabs__active-bar
        ) {
        color: #0089ff;
    }
}
</style>
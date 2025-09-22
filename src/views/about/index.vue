<template>
    <div class="about-container">
        <div class="about_item">
            <div class="item_title">博客名称：</div>
            <div class="item_desc">{{ userInfo?.blogName }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">博客作者：</div>
            <div class="item_desc">{{ userInfo?.author }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">博客地址：</div>
            <div class="item_desc">{{ userInfo?.blog }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">联系方式：</div>
            <div class="item_desc">{{ userInfo?.tel }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">作者邮箱：</div>
            <div class="item_desc">{{ userInfo?.email }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">Github：</div>
            <div class="item_desc">{{ userInfo?.github }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">Gitee：</div>
            <div class="item_desc">{{ userInfo?.gitee }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">座右铭：</div>
            <div class="item_desc">{{ userInfo?.motto }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">当前版本：</div>
            <div class="item_desc">{{ userInfo?.version }}</div>
        </div>
        <div class="about_item">
            <div class="item_title">博客描述：</div>
            <div class="item_desc">{{ userInfo?.blogDesc }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { computed } from "vue";
import store from "@/store"

const userInfo = computed(() => store.state.app?.userInfo) // 用户信息
</script>
  
<style lang="scss" scoped>
.about-container {
    padding: 20px;
    .about_item {
        display: flex;
        flex-direction: column;
        line-height: 30px;
        .item_title {
            font-weight: bold;
        }
        .item_desc {
            margin: 10px;
            padding-left: 30px;
        }
    }
}
</style>
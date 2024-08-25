<template>
    <div class="home-container w100">
        <div class="item padding10 margin-b12 flex-s"
             v-for="(item,index) in list"
             :key="index">
            <div class="content f1 text-left margin-r10">
                <div class="title margin-b8 font16 fontw">{{ item.title }}{{ index+1 }}</div>
                <div class="desc margin-b8 font14 line2">{{ item.desc }}</div>
                <div class="info flex-s font12">
                    <div class="name margin-r10">{{ item.author }}</div>
                    <div>{{ item.date }}</div>
                </div>
            </div>
            <div v-if="item.url"
                 class="iamge-area">
                <img :src="defeultImageUrl"
                     alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();
import defeultImageUrl from "@/common/assets/images/bg.jpeg"

const list = [
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史',
        author: '吾小顺',
        date: '2024-08-25 21:47',
        url: true
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: ''
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: ''
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: true
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: ''
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: true
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: ''
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: true
    },
    {
        title: '前端的发展史',
        desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史发展史前端的发展史前端的发展史前端的发展史前端',
        author: '吾大顺',
        date: '2024-08-25 21:47',
        url: ''
    }
]

</script>

<style lang="scss" scoped>
.home-container {
    .item {
        border: 1px solid var(--border-color);
        background: var(--bg-color);
        border-radius: 5px;
        position: relative;
        transition: all 0.3s;
        top: 0;
        .content {
            .title {
                cursor: pointer;
            }
            .desc {
                line-height: 20px;
            }
            .info {
                .name {
                    color: $theme-color;
                }
            }
        }
        .iamge-area {
            width: 150px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &:hover {
            top: -2px;
            box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
<template>
    <div class="home-container w100 margin-b20">
        <div class="item padding10"
             v-for="(item,index) in array"
             :key="index">
            <div class="content text-left margin-r10">
                <div class="title margin-b8 font16 fontw">{{ item.title }}{{ item.id }}</div>
                <div class="flex-s margin-b10 content-inner">
                    <div v-if="item.url"
                         class="iamge-area margin-r10">
                        <img :src="defeultImageUrl"
                             alt="">
                    </div>
                    <div class="desc f1 margin-b8 font14 line3"
                         :title="item.desc">{{ item.desc }}</div>
                </div>
                <div class="info flex-s font12">
                    <div class="name margin-r10">{{ item.author }}</div>
                    <div>{{ item.date }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue"
import defeultImageUrl from "@/assets/images/bg.jpeg"

const { proxy } = getCurrentInstance();

// 创建独立的对象
const obj = {
    id: 1,
    title: '前端的发展史',
    desc: '前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史前端的发展史',
    author: '吾小顺',
    date: '2024-08-25 21:47',
    url: true
}

const array = Array.from({ length: 10 }, (_, i) => ({
    ...obj,
    url: i % 2 === 0 ? true : false,
    id: i + 1  // 可以自定义每个对象的属性
}));

</script>

<style lang="scss" scoped>
.home-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 1fr);
    gap: 10px;
    .item {
        border: 1px solid var(--border-color);
        background: var(--bg-color);
        border-radius: 5px;
        position: relative;
        transition: all 0.3s;
        top: 0;
        &:hover {
            top: -2px;
            box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
        }
        .content {
            .title {
                cursor: pointer;
            }
            .content-inner {
                align-content: flex-start;
                height: 70px;
                .iamge-area {
                    width: 120px;
                    height: 70px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .desc {
                    line-height: 20px;
                }
            }

            .info {
                .name {
                    color: $theme-color;
                }
            }
        }
    }
}
</style>
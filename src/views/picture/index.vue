<!-- 图片页 -->
<template>
    <div class="pictrue-type w100">
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

// 图片类型
const typeList = ref([
    { type: "beauty", name: "美女", icon: 'defaultItem', desc: '美女图片集合' },
    { type: "person", name: "人物", icon: 'defaultItem', desc: '人物图片集合' },
    { type: "car", name: "汽车", icon: 'defaultItem', desc: '汽车图片集合' },
    { type: "comic", name: "漫画", icon: 'defaultItem', desc: '漫画图片集合' },
    { type: "animal", name: "动物", icon: 'defaultItem', desc: '动物图片集合' },
    { type: "game", name: "游戏", icon: 'defaultItem', desc: '游戏图片集合' },
    { type: "movie", name: "电影", icon: 'defaultItem', desc: '电影图片集合' },
    { type: "food", name: "食物", icon: 'defaultItem', desc: '食物图片集合' },
    { type: "phone", name: "电话", icon: 'defaultItem', desc: '电话图片集合' },
    { type: "scenery", name: "风景", icon: 'defaultItem', desc: '风景图片集合' },
]);
// 选择类型
const selectType = (val) => {
    console.log(val, 'val');
    router.push(`/picture/details/${val?.type}`)
};

</script>

<style lang="scss" scoped>
.pictrue-type {
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
            min-width: 0;
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
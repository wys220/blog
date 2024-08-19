<!-- 图片页 -->
<template>
    <div class="picture-type">
        <!-- 类型 -->
        <div class="box w100 padding10">
            <div v-for="(i, index) in typeList"
                 :key="index"
                 @click="selectType(i)"
                 class="box-item">
                {{ i.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";

// 图片类型
const typeList = ref([
    { type: "beauty", name: "美女" },
    { type: "person", name: "人物" },
    { type: "car", name: "汽车" },
    { type: "comic", name: "漫画" },
    { type: "animal", name: "动物" },
    { type: "game", name: "游戏" },
    { type: "movie", name: "电影" },
    { type: "food", name: "食物" },
    { type: "phone", name: "电话" },
    { type: "scenery", name: "风景" },
]);
// 选择类型
const selectType = (val) => {
    console.log(val, 'val');
    router.push(`/picture/details/${val?.type}`)
};

</script>

<style lang="scss" scoped>
.picture-type {
    .box {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px 20px;
        .box-item {
            cursor: pointer;
            min-height: 100px;
            border: 1px solid #b17676;
        }
    }
}
</style>
<!-- 图片详情页面 -->
<template>
    <div class="container w100 h100 ofa">
        <div class="main">
            <div class="item"
                 v-for="(i, index) in imageList"
                 :key="index">
                <div class="img-area">
                    <el-image class="img-sty"
                              :src="i.url"
                              :zoom-rate="1.2"
                              :preview-src-list="getPrivewImage(index)"
                              :hide-on-click-modal="true"
                              fit="cover" />
                </div>
                <div class="name"
                     :title="i.title">{{ i.title }}</div>
            </div>
            <div v-if="isNextPage"
                 class="item card"
                 @click="netPage()">
                <el-icon :size="60">
                    <DArrowRight />
                </el-icon>
                <div>
                    <div>下一页</div>
                    <div>更多精彩</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup name='picture'>
import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    reactive,
    ref,
} from "vue";
import { getImages } from "@/common/api/common";
import router from "@/router";
import { useRoute } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRoute()

const imageList = ref([]); //图片列表
const typeActiveIndex = ref(0); // 当前高亮的图片类型
const total = ref(0);
const params = reactive({
    type: "beauty",
    page: 0,
    size: 15,
});

// 是否显示下一页卡片
let isNextPage = computed(() => {
    return imageList.value.length > 0 && imageList.value.length < total.value;
});
// 获取图片列表
const getImageList = async () => {
    const res = await getImages(params);
    if (res.code == 200) {
        imageList.value = [...imageList.value, ...res.result?.list];
        total.value = res.result?.total;
    }
};
// 获取预览的图片
const getPrivewImage = (index) => {
    let newArr = [...imageList.value];
    if (index === 0) return newArr.map((i) => i.url);
    let start = newArr.splice(index);
    let end = newArr.splice(0, index);
    return start.concat(end).map((i) => i.url);
};

// 下一页
const netPage = () => {
    params.page++;
    getImageList();
};

let detailsContent = ref(null)

onMounted(() => {
    console.log(route, 'route');
    detailsContent.value = route.params
    params.type = route.params?.type
    getImageList();
});
</script>

<style lang="scss" scoped>
.container {
    .main {
        display: grid;
        grid-template-rows: repeat(3, auto);
        grid-template-columns: repeat(3, auto);
        grid-gap: 10px;
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            height: 250px;
            background: var(--bg-color);
            cursor: pointer;
            border-radius: 4px;
            .img-area {
                width: 100%;
                height: 200px;
                .img-sty {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
            }
            .name {
                width: 250px;
                padding: 10px;
                margin-bottom: 5px;
                font-size: 14px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .card {
            background-color: #19b955;
            font-size: 30px;
            letter-spacing: 2px;
            font-weight: bold;
            color: var(--text-color);
            text-align: left;
        }
        .card:hover {
            background-color: #19b955c2;
        }
    }
    .loading {
        text-align: center;
        font-size: 16px;
        color: var(--text-color);
        margin-bottom: 20px;
        letter-spacing: 2px;
    }
}
@media all and (min-width: 431px) and (max-width: 768px) {
    .main {
        grid-template-rows: repeat(2, auto) !important;
        grid-template-columns: repeat(2, auto) !important;
        .item {
            .img-area {
                height: 200px !important;
            }
        }
    }
}
@media all and (max-width: 430px) {
    .main {
        grid-template-rows: repeat(1, auto) !important;
        grid-template-columns: repeat(1, auto) !important;
        .item {
            .img-area {
                height: 210px !important;
            }
        }
    }
}
</style>
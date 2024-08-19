<!-- 视频页 -->
<template>
    <div class="container">
        <div class="main">
            <div class="item"
                 v-for="(i, index) in videoList"
                 :key="index">
                <div class="img-area">
                    <video ref="videoRef"
                           :src="i.playUrl"
                           :poster="i.coverUrl"
                           controls="controls"></video>
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

<script setup name='video'>
import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    reactive,
    ref,
} from "vue";
import { getHaoKanVideo } from "@/common/api/common";
import router from "@/router";

const { proxy } = getCurrentInstance();

const videoList = ref([]); //图片列表
const total = ref(0); //是否loading
const params = reactive({
    page: 0,
    size: 15,
});

// 是否显示下一页卡片
let isNextPage = computed(() => {
    return videoList.value.length > 0 && videoList.value.length < total.value;
});
// 获取图片列表
const getImageList = async () => {
    const res = await getHaoKanVideo(params);
    if (res.code == 200) {
        // console.log(res, "res视频");
        videoList.value = [...videoList.value, ...res.result?.list];
        total.value = res.result?.total;
        setVideo();
    }
};

// 下一页
const netPage = () => {
    params.page++;
    getImageList();
};
// 设置播放的视频
const setVideo = () => {
    let videos = document.getElementsByTagName("video");
    proxy.$nextTick(function () {
        for (let i = 0; i < videos.length; i++) {
            (function (n) {
                videos[n].addEventListener("play", function () {
                    pauseAll(n);
                });
            })(i);
        }
    });
};

// 暂停其他视频
const pauseAll = (index) => {
    let videos = document.getElementsByTagName("video");
    proxy.$nextTick(function () {
        for (let j = 0; j < videos.length; j++) {
            if (j !== index) {
                videos[j].pause();
                // videos[j].load();
            }
        }
    });
};

onMounted(() => {
    getImageList();
});
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    width: 100%;
    background: #eee;
    overflow: auto;
    .main {
        display: grid;
        grid-template-rows: repeat(4, auto);
        grid-template-columns: repeat(4, auto);
        grid-gap: 10px;
        margin: 10px;
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            height: 250px;
            background: #fff;
            cursor: pointer;
            .img-area {
                width: 100%;
                height: 200px;
                video {
                    width: 100%;
                    height: 100%;
                }
                .img-sty {
                    width: 100%;
                    height: 100%;
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
            color: #fff;
            text-align: left;
        }
        .card:hover {
            background-color: #19b955c2;
        }
    }
    .loading {
        text-align: center;
        font-size: 16px;
        color: #5f5f5f;
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
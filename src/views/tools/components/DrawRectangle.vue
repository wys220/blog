<!-- 绘制矩形组件 -->
<template>
    <div class="content"
         ref="contentRef">
        <!-- <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2550960699,1868736188&fm=26&gp=0.jpg" /> -->
        <canvas ref="markCanvasRef"
                tabindex='0'></canvas>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, getCurrentInstance, watch, onUnmounted } from "vue";
import { draw, drawList } from "../utils/draw.js"
const { proxy } = getCurrentInstance();

const markList = ref([])

watch(() => drawList.value, (v) => {
    console.log(v, 'vvvv');
}, { deep: true })

/* 画布初始化 */
const initCanvas = () => {
    nextTick(() => {
        // 初始化canvas宽高
        let cav = proxy.$refs.markCanvasRef;
        let contaiEl = proxy.$refs.contentRef;

        const w = contaiEl?.offsetWidth
        const h = contaiEl?.offsetHeight

        // const style = window.getComputedStyle(contaiEl);
        // console.log('Width:', w);
        // console.log('Height:', h);


        cav.width = w || '800';
        cav.height = h || '600';
        let ctx = cav.getContext('2d');
        ctx.strokeStyle = 'blue'
        cav.style.cursor = 'crosshair'

        // 计算使用变量
        let list = markList.value; // 画框数据集合, 用于服务端返回的数据显示和绘制的矩形保存
        // 若服务端保存的为百分比则此处需计算实际座标, 直接使用实际座标可省略
        list.forEach(function (value, index, array) {
            let newValue = {
                x: value.x * cav.width,
                y: value.y * cav.height,
                w: value.w * cav.width,
                h: value.h * cav.height,
            }
            list.splice(index, 1, newValue)
        })

        // 若list长度不为0, 则显示已标记框
        if (list.length !== 0) {
            list.forEach(function (value, index, array) {
                // 遍历绘制所有标记框
                ctx.rect(value.x, value.y, value.w, value.h);
                ctx.stroke();
            });
        }

        // 调用封装的绘制方法
        draw(cav, list);
    })
}

onMounted(() => {
    initCanvas()
    window.addEventListener('resize', () => {
        console.log('缩放123');
        setTimeout(() => {
            initCanvas()
        }, 200)
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', () => { })
})
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #fe8787;
    // canvas {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     z-index: 10;
    // }
}
</style>
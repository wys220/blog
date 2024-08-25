<!-- 简易画布电子签名组件 -->
<template>
    <div class="signature h100 w100 pr flex-col-s">
        <div class="btn-box w100 flex-c">
            <div class="flex-s margin-r10">
                <span class="demonstration">画笔颜色：</span>
                <el-color-picker v-model="colorVal"
                                 size="small" />
            </div>
            <div class="flex-s margin-r10">
                <span class="demonstration">画笔大小：</span>
                <el-input-number v-model="sizeVal"
                                 :min="1"
                                 :max="10"
                                 size="small"
                                 controls-position="right" />
            </div>
            <div class="flex-s wh-size margin-r10">
                <span class="demonstration">画布大小：</span>
                <el-input-number v-model="canvasWidth"
                                 :min="1"
                                 :max="999"
                                 size="small"
                                 controls-position="right"
                                 style="margin-right: 5px;"
                                 @change="handleChangeCanvasSize" />-
                <el-input-number v-model="canvasHight"
                                 :min="1"
                                 :max="999"
                                 size="small"
                                 controls-position="right"
                                 style="margin-left: 5px;"
                                 @change="handleChangeCanvasSize" />
            </div>
        </div>
        <div class="main-area w100 f1 margin-t20"
             :style="{'--border':colorVal}">
            <div class="canvas-box"
                 :style="{'--w':`${canvasWidth}px`,'--h':`${canvasHight}px`}"
                 ref="containerRef">
                <canvas ref="canvasRef"></canvas>
            </div>
            <div class="w100 flex-c margin-tb10">
                <el-button type="primary"
                           size="small"
                           @click="clareCanvas">重绘</el-button>
                <el-button type="primary"
                           size="small"
                           @click="onSave(1)">预览</el-button>
                <el-button type="primary"
                           size="small"
                           @click="onSave(2)">生成</el-button>
            </div>
            <img class="img"
                 :src="signatureUrl"
                 alt=""
                 srcset="">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, onUnmounted } from "vue";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();

let canvas = null
let ctx = null
let pointList = []
const colorVal = ref('#1E1E1E')
const sizeVal = ref('2')
const canvasWidth = ref(400)
const canvasHight = ref(200)
const w = ref()
const h = ref()



const initCanvas = () => {
    canvas = proxy.$refs.canvasRef;
    let contaiEl = proxy.$refs.containerRef;

    w.value = contaiEl?.offsetWidth
    h.value = contaiEl?.offsetHeight

    canvas.width = w.value || '800';
    canvas.height = h.value || '600';
    canvas.style.cursor = 'crosshair'
    ctx = canvas.getContext('2d');

    let isMousedown = false
    let lastPt = {}
    canvas.addEventListener('mousedown', e => {
        isMousedown = true
    })
    canvas.addEventListener('mousemove', e => {
        if (!isMousedown) return
        // console.log(e, 'eeeeeeee--mousemove');
        lastPt = {
            x: e.offsetX,
            y: e.offsetY
        }
        pointList.push(lastPt)
        draw(pointList)
    })
    window.addEventListener('mouseup', () => {
        isMousedown = false
        lastPt = {}
        pointList = []
        ctx.closePath()
    })

    const draw = (pointList) => {
        ctx.beginPath()
        pointList.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y)
            } else {
                ctx.lineTo(point.x, point.y)
            }
        })
        ctx.strokeStyle = colorVal.value || 'green'
        ctx.lineWidth = sizeVal.value || 3
        ctx.stroke()
    }
}

// 清除画布
const clareCanvas = () => {
    ctx.clearRect(0, 0, w.value, h.value);
}

const signatureUrl = ref('') //生成的图片
const now = dayjs()
// 保存
const onSave = async (type) => {
    let time = now.format('YYYY-MM-DD HH:mm:ss')
    console.log(time, 'time');
    let cont = converBase64ToBlob(canvas.toDataURL('image/png'))
    if (type === 1) {
        signatureUrl.value = URL.createObjectURL(cont)
        // console.log(signatureUrl.value, 'signatureUrl.value');
    } else if (type === 2) {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: `signature-${time}.png`,  // 生成文件名
                types: [
                    {
                        description: "PNG file",
                        accept: {
                            "image/png": [".png"],
                        },
                    },
                ],
            })
            const writable = await handle.createWritable()
            await writable.write(cont)
            await writable.close()
            return handle
        } else {
            const a = document.createElement('a')
            a.download = `signature-${time}.png`
            a.href = URL.createObjectURL(cont)
            console.log(102, a.href)
            a.click()
            URL.revokeObjectURL(a.href)
        }
    }

}

// base64 转 blob
const converBase64ToBlob = (buffer) => {
    let base64 = buffer.split(',')
    let imgtype = ''
    let base64String = ''
    if (base64.length > 1) {
        base64String = base64[1]
        imgtype = base64[0].substring(base64[0].indexOf(':') + 1, base64[0].indexOf(';'))
    }

    let bytes = atob(base64String)
    let bytesCode = new ArrayBuffer(bytes.length)
    let byteArr = new Uint8Array(bytesCode)
    for (let i = 0; i < bytes.length; i++) {
        byteArr[i] = bytes.charCodeAt(i)
    }
    return new Blob([bytesCode], { type: imgtype })
}


// 改变画布大学
const handleChangeCanvasSize = () => {
    initCanvas()
}

onMounted(() => {
    initCanvas()
    window.addEventListener('resize', () => {
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
.signature {
    .btn-box {
        width: 100%;
        min-height: 40px;
        flex-wrap: wrap;
        font-size: 15px;
    }
    .main-area {
        overflow-x: hidden;
        .canvas-box {
            margin: 0 auto;
            width: var(--w);
            height: var(--h);
            border: 1px solid var(--border);
        }
        .img {
            border: 1px solid var(--border);
        }
    }
}
</style>
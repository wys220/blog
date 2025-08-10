<!-- 设置-动态效果 -->
<template>
    <div class="tools-type w100">
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
import { HxhUrl } from "@c/api/hxh.js"

// 类型列表
const typeList = ref([
    { type: "snow", icon: 'xuehua', name: "雪花", desc: '为博客添加满屏雪花效果' },
    { type: "bolang", icon: 'bolang', name: "波浪", desc: '为博客添加满屏透明效果' },
    { type: "yinghua", icon: 'yinghua', name: "樱花", desc: '为博客添加满屏樱花效果' },
    { type: "meihua", icon: 'meihua', name: "梅花", desc: '为博客添加满屏梅花效果' },
    { type: "denglong", icon: 'denglong', name: "灯笼", desc: '为博客添加春节灯笼效果' },
]);
// 选择类型
const selectType = async (val) => {
    let scriptUrl = `${HxhUrl}/script/${val.type}`
    addScript(scriptUrl)
};

const scriptRef = ref(null)
const addScript = (url) => {
    // 如果已经存在，先移除
    if (scriptRef.value) {
        removeScript()
    }

    // 创建新的 script 元素
    const script = document.createElement('script')
    script.src = url
    script.async = true

    // 添加到 body 中
    document.body.appendChild(script)

    // 保存引用以便后续移除
    scriptRef.value = script
}

const removeScript = () => {
    if (scriptRef.value) {
        document.body.removeChild(scriptRef.value)
        scriptRef.value = null
    }
}

</script>

<style lang="scss" scoped>
.tools-type {
    .box {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px;
        .box-item {
            border: 1px solid #b3e19d;
            background: #b3e19d;
            border-radius: 5px;
            padding: 21px 15px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            top: 0;
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
                        color: #292929;
                        line-height: 1.2;
                    }
                    .desc {
                        min-width: 0;
                        font-size: 12px;
                        color: #515151;
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
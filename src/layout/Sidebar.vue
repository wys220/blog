<!-- 主区域右侧侧边栏 -->
<template>
    <div class="siderbar">
        <div class="siderbar-sty sider-item flex-col-c">
            <div class="avatar">
                <img :src="userAvatar"
                     alt=""
                     srcset="">
            </div>
            <div class="name font20 fontw margin-tb8">吾小顺</div>
            <div class="motto t-center font16">理想的人生一定是靠拼来的<br />许愿到不了</div>
            <div class="tools margin-t20 flex-sa font16">
                <div class="flex-col-c item">
                    <div>文章</div>
                    <div>{{ blogListLen }}</div>
                </div>
                <div class="flex-col-c item">
                    <div>工具</div>
                    <div>{{ toolLen }}</div>
                </div>
            </div>
            <div class="tools margin-t20 flex-sa font16">
                <div class="flex-col-c item">
                    QQ
                </div>
                <div class="flex-col-c item">
                    邮箱
                </div>
            </div>
        </div>
        <!-- 人生倒计时 -->
        <div class="siderbar-sty sider-item1 t-left font16">
            <div class="title-bar padding-tb10 padding-l10">
                <g-svg-icon name="countdown"
                            size="18">
                </g-svg-icon>
                人生倒计时
            </div>
            <div class="main padding10 w100">
                <div class="margin-b5">今天已经过去{{ nowHours }}小时</div>
                <div class="margin-b5">
                    <el-progress :duration="15"
                                 :stroke-width="10"
                                 :percentage="Math.floor((nowHours/24)*100)"
                                 color="#f56c6c" />
                </div>
                <div class="margin-b5">本周已经过去{{nowDayOfWeeks}}天</div>
                <div class="margin-b5">
                    <el-progress :duration="15"
                                 :stroke-width="10"
                                 :percentage="Math.floor((nowDayOfWeeks/7)*100)"
                                 color="#e6a23c" />
                </div>
                <div class="margin-b5">本月已经过去{{ nowDays }}天</div>
                <div class="margin-b5">
                    <el-progress :stroke-width="10"
                                 :percentage="Math.floor((nowDays/daysInMonth)*100)"
                                 color="#5cb87a" />
                </div>
                <div class="margin-b5">本年已经过去{{ nowMonths }}个月</div>
                <div class="margin-b5">
                    <el-progress :duration="15"
                                 :stroke-width="10"
                                 :percentage="Math.floor((nowMonths/12)*100)"
                                 color="#1989fa" />
                </div>
            </div>
        </div>
        <!-- 人生倒计时 -->
        <div class="siderbar-sty sider-item2 t-left font16">
            <div class="title-bar padding-tb10 padding-l10">
                <g-svg-icon name="tag"
                            size="18">
                </g-svg-icon>
                标签
            </div>
            <div class="padding20">
                {{$store.state.common?.test}}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import userAvatar from "@/assets/images/user_avatar.png"
import store from "@/store"

const { proxy } = getCurrentInstance();

//获取缓存里面的全部博客
const blogListLen = computed(() => store.state.sites?.blogList?.length || 0)
//获取缓存里面的所有工具
const toolLen = computed(() => {
    return store.state.sites?.allTools?.data?.reduce((pre, cur) => pre += cur?.list?.length, 0) || 0
})

let nowHours = ref(0)
let nowMinutes = ref(0)
let nowDayOfWeeks = ref(0)
let nowDays = ref(0)
let nowMonths = ref(0)
let nowYears = ref(0)
let daysInMonth = ref(30)

const timeSlotChange = () => {
    let now = new Date(); //当前日期 
    let nowHour = now.getHours(); //今天第几小时
    let nowMinute = now.getMinutes(); //今天第几分钟
    let nowDayOfWeek = now.getDay(); //今天本周的第几天 
    let nowDay = now.getDate(); //当前日 
    let nowMonth = now.getMonth() + 1; //当前月 
    let nowYear = now.getFullYear(); //当前年

    daysInMonth.value = new Date(nowYear, nowMonth, 0).getDate(); // 获取指定月份的天数

    nowHours.value = nowHour
    nowMinutes.value = nowMinute
    nowDayOfWeeks.value = nowDayOfWeek
    nowDays.value = nowDay
    nowMonths.value = nowMonth
    nowYears.value = nowYear
}

onMounted(() => {
    timeSlotChange()
})
</script>

<style lang="scss" scoped>
.main-area[data-expanded="true"] .siderbar {
    display: block;
    margin-left: 20px;
}
.siderbar {
    background: transparent;
    display: none;
    .siderbar-sty {
        background: var(--bg-color);
        color: var(--text-color);
        border-radius: 8px;
        margin-bottom: 20px;
    }
    .title-bar {
        border-bottom: 1px solid var(--text-color);
        width: 100%;
        padding: 2px;
    }
    .sider-item {
        padding: 10px;
        .avatar {
            width: 50px;
            height: 50px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid var(--text-color);
                transition: transform 0.5s ease;
                &:hover {
                    transform: rotate(360deg);
                }
            }
        }
        .tools {
            .item {
                padding: 5px 10px;
                div {
                    margin-top: 8px;
                }
            }
        }
    }
    .sider-item1 {
        :deep(.el-progress-bar__outer) {
            background-color: #c8ccd4;
        }
        :deep(.el-progress__text) {
            color: var(--text-color);
        }
    }
}
</style>
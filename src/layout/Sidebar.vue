<!-- 主区域右侧侧边栏 -->
<template>
    <div class="siderbar">
        <div class="siderbar-sty sider-item flex-col-c">
            <div class="avatar">
                <img :src="userAvatar"
                     alt=""
                     srcset="">
            </div>
            <div class="name font20 fontw margin-tb8">{{userInfo?.author || '吾小顺'}}</div>
            <div class="motto t-center font16">理想的人生一定是靠拼来的<br />许愿到不了</div>
            <div class="tools margin-t20 flex-sa font16">
                <div class="flex-col-c item">
                    <div class="fontw"><g-icons iconName="icon-faxian"
                                 size="20"></g-icons>文章</div>
                    <div class="fontw cp"
                         @click="goPage('blog')">{{ blogListLen }}</div>
                </div>
                <div class="flex-col-c item">
                    <div class="fontw"> <g-icons iconName="icon-gongjuxiang"
                                 size="20"></g-icons>工具</div>
                    <div class="fontw cp"
                         @click="goPage('tools')">{{ toolLen }}</div>
                </div>
            </div>
            <div class="tools margin-t20 flex-sa font16">
                <div class="flex-col-c item cp"
                     @click="sendEmail">
                    <g-icons iconName="icon-QQyouxiang"
                             size="25"></g-icons>QQ邮箱
                </div>
                <div class="flex-col-c item cp"
                     @click="goGitee">
                    <g-icons iconName="icon-gitee"
                             size="25"></g-icons>Gitee
                </div>
                <div class="flex-col-c item cp"
                     @click="goGithub">
                    <g-icons iconName="icon-github"
                             size="25"></g-icons>Github
                </div>
            </div>
        </div>
        <!-- 人生倒计时 -->
        <div class="siderbar-sty sider-item1 t-left font16">
            <div class="title-bar padding-tb10 padding-l10">
                <g-icons iconName="icon-daojishi"
                         size="16"></g-icons>人生倒计时
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
        <!-- 标签 -->
        <div class="siderbar-sty sider-item2 t-left font16">
            <div class="title-bar padding-tb10 padding-l10">
                <g-icons iconName="icon-biaoqian"
                         size="18"></g-icons>标签
            </div>
            <div class="padding20 flex-s flex-w">
                <span v-for="(el,index) in tagList"
                      :key="index"
                      class="tags">{{ el.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import userAvatar from "@/assets/images/user_avatar.png"
import store from "@/store"
import { goPage } from "@c/tools/common"

const { proxy } = getCurrentInstance();

// 用户信息
const userInfo = computed(() => store.state.app?.userInfo)
// 获取tags
const tagList = computed((() => store.state.app?.tags))

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
// 发送邮件
const sendEmail = () => {
    navigator.clipboard.writeText(userInfo.value?.email)
        .then(() => {
            proxy.$toast.success('复制邮箱成功')
        })
}
const goGitee = () => {
    window.open(userInfo.value?.gitee, '_blank')
}
const goGithub = () => {
    window.open(userInfo.value?.github, '_blank')
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
        .tags {
            padding: 5px 10px;
            background: $theme-color;
            border-radius: 8px;
            margin: 5px;
            color: #fff;
            text-align: center;
        }
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
    svg {
        margin-right: 2px;
    }
}
</style>
<!-- 首页 -->
<template>
    <div class="home-container w100 margin-b20">
        <div class="item padding10"
             v-for="(item,index) in paginatedData"
             :key="index">
            <div class="content t-left margin-r10">
                <div class="margin-b8 font18 fontw">
                    <span class="title cp"
                          @click="goDetail(item)">{{ item.name }}</span>
                </div>
                <div class="desc margin-b10 font16 text-hover-left cp"
                     :title="item.desc"
                     @click="goDetail(item)">{{ item.desc }}</div>
                <div class="info flex-s font15">
                    <div class="name margin-r10 margin-tb10 cp">
                        <g-icons iconName="icon-zuozhe"
                                 size="18">
                        </g-icons>{{ item.author }}
                    </div>
                    <div>
                        <g-icons iconName="icon-riqi"
                                 size="18">
                        </g-icons>
                        {{ item.date }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页组件 -->
        <Pagination :current-page="currentPage"
                    :page-size="pageSize"
                    :total-items="totalItems"
                    @page-change="handlePageChange" />

    </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from "vue"
import Pagination from "@c/components/Pagination"
import store from "@/store"
import router from "@/router";


const { proxy } = getCurrentInstance();

//获取缓存里面的全部博客
const blogList = computed(() => {
    return store.state.sites?.blogList?.filter((f) => f?.hot)
}) 

// console.log(blogList.value, 'blogList');

// 分页状态
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = computed(() => blogList.value?.length);

// 计算当前页数据
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return blogList.value?.slice(start, end);
});

// 处理页码变化
const handlePageChange = (page) => {
    currentPage.value = page;
};

// 详情
const goDetail = (item) => {
    router.push(`/home/details/${item?.name}`)
}
</script>

<style lang="scss" scoped>
.home-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 1fr);
    gap: 10px;
    .item {
        border-bottom: 1px solid var(--border-color);
        position: relative;
        transition: all 0.3s;
        top: 0;
        // &:hover {
        //     top: -2px;
        //     box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
        // }
        .content {
            .title {
                &:hover {
                    color: $theme-color;
                }
            }
            .desc {
                line-height: 20px;
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
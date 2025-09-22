<template>
    <div class="blog-box w100 flex-s ofh">
        <div class="blog-box_main ofa">
            <div class="main_inner margin-b10"
                 v-for="(item,index) in allBlogList?.data"
                 :key="index">
                <div class="type-box margin-b5 cp pr flex-sb"
                     @click="openClose(index)">
                    <div>
                        <g-icons iconName="icon-fenlei"
                                 className="padding-r5"
                                 size="23">
                        </g-icons>{{ item.type }}
                    </div>
                    <div>
                        <g-icons :iconName="item.isOpen ? 'icon-down' : 'icon-up'"
                                 className="padding-r5"
                                 size="28">
                        </g-icons>
                    </div>
                </div>
                <div class="child"
                     v-if="!item.isOpen">
                    <div class="child_inner">
                        <div v-for="(el, index) in item?.list"
                             :key="index"
                             @click="goDetail(el)"
                             class="box-item">
                            <div class="item flex-s">
                                <div class="icon">
                                    <g-icons iconName="icon-wenjian"
                                             size="40">
                                    </g-icons>
                                </div>
                                <div class="content">
                                    <div class="name line1">{{ el.name }}</div>
                                    <p class="desc line2"
                                       :title="el.desc">{{ el.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import MarkdownRenderer from '@c/components/MarkdownRenderer';
import { computed, ref } from "vue";
import store from "@/store"
import router from "@/router";


//获取缓存里面的全部博客
const allBlogList = computed(() => store.state.sites?.allBlogList)

// 展开收起
const openClose = (index) => {
    allBlogList.value.data[index].isOpen = !allBlogList.value.data[index]?.isOpen
}

// 详情
const goDetail = (item) => {
    router.push(`/blog/details/${item?.name}`)
}

</script>

<style scoped lang="scss">
.blog-box {
    align-items: flex-start;
    .blog-box_main {
        width: 100%;
        min-height: 400px;
        max-height: 100%;
        .type-box {
            &:hover {
                background: var(--bg-color);
            }
        }
        .child_inner {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 10px;
            .box-item {
                border: 1px solid var(--border-color);
                background: var(--bg-color);
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
                        color: var(--text-color);
                        overflow: hidden;
                        .name {
                            width: 100%;
                            margin-bottom: 5px;
                            font-size: 14px;
                            font-weight: 700;
                            line-height: 1.2;
                        }
                        .desc {
                            min-width: 0;
                            font-size: 12px;
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
}
</style>
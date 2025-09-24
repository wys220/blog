<template>
    <div class="blog-box w100 flex-s ofh">
        <div class="blog-box_main ofa">
            <div class="main_inner margin-b10"
                 v-for="(item,index) in allBlogList?.data"
                 :key="index">
                <div class="type-box margin-b5 cp pr flex-sb"
                     @click="openClose(index)">
                    <div class="flex">
                        <g-icons iconName="icon-fenlei"
                                 className="padding-r5"
                                 size="26">
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
                                <div class="content">
                                    <div class="name line1">
                                        <g-icons iconName="icon-wenzhang"
                                                 size="16">
                                        </g-icons>{{ el.name }}
                                    </div>
                                    <p class="desc line2"
                                       :title="el.desc">{{ el.desc }}</p>
                                </div>
                            </div>
                            <div class="flex-s font14">
                                <div class="author margin-r10 margin-tb10 cp">
                                    <g-icons iconName="icon-zuozhe"
                                             size="18">
                                    </g-icons>{{ el.author }}
                                </div>
                                <div>
                                    <g-icons iconName="icon-riqi"
                                             size="18">
                                    </g-icons>
                                    {{ el.date }}
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
import { computed, onMounted, ref } from "vue";
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
onMounted(() => {
    allBlogList.value?.data?.forEach(element => {
        element.isOpen = false
    });
})
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
                padding: 10px;
                cursor: pointer;
                position: relative;
                transition: all 0.3s;
                top: 0;
                .item {
                    min-width: 0;
                    .content {
                        text-align: left;
                        color: var(--text-color);
                        overflow: hidden;
                        .name {
                            width: 100%;
                            margin-bottom: 5px;
                            font-size: 16px;
                            font-weight: 700;
                            line-height: 1.2;
                            svg {
                                margin-right: 5px;
                            }
                        }
                        .desc {
                            min-width: 0;
                            font-size: 13px;
                            line-height: 20px;
                        }

                        .author {
                            color: $theme-color;
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
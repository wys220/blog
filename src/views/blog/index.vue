<template>
    <div class="blog-box w100 flex-s ofh">
        <div class="side-box ofa">
            <div class="side-tiem margin-b10"
                 v-for="(item,index) in allBlogList?.data"
                 :key="index">
                <div class="margin-b5 cp pr"
                     @click="openClose(index)">
                    <g-icons iconName="icon-fenlei"
                             className="padding-r5"
                             size="23"></g-icons>{{ item.type }}
                </div>
                <div class="child"
                     v-if="!item.isOpen">
                    <div v-for="(el,lIndex) in item.list"
                         :key="lIndex"
                         :title="el.name"
                         class="line1 margin-l10 cp padding2 font16 margin-b2"
                         :class="{'item-active':currentBlog?.name===el.name}"
                         @click="clickItem(el)">
                        <span class="text-hover-left">
                            <g-icons iconName="icon-wenjian"
                                     size="18"></g-icons> {{ el.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box f1 ofa padding-l10">
            <template v-if="currentBlog?.url">
                <MarkdownRenderer :blogInfo="currentBlog"
                                  :rawUrl="currentBlog?.url" />
            </template>
        </div>
    </div>
</template>
  
<script setup>
import MarkdownRenderer from '@c/components/MarkdownRenderer';
import { computed, ref } from "vue";
import store from "@/store"


const allBlogList = computed(() => store.state.sites?.allBlogList) //获取缓存里面的全部博客
const currentBlog = computed(() => store.state.sites?.currentBlog)

console.log(allBlogList.value, 'allBlogList');

//  点击项目
const clickItem = (item) => {
    if (currentBlog.value?.name === item.name) return
    store.commit('sites/SET_CURRENT_BLOG', item)
}

// 展开收起
const openClose = (index) => {
    allBlogList.value.data[index].isOpen = !allBlogList.value.data[index]?.isOpen
}

</script>

<style scoped lang="scss">
.blog-box {
    align-items: flex-start;
    .side-box {
        width: 220px;
        min-height: 400px;
        max-height: 100%;
        .side-tiem {
            .child {
                .item-active {
                    color: $theme-color;
                }
            }
        }
    }
    .content-box {
        border-left: 1px solid #d3d3d3;
    }
}
</style>
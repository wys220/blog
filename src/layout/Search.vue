<!-- 搜索组件 -->
<template>
    <div class="search">
        <select v-model="select">
            <option label="百度"
                    value="baidu" />
            <option label="必应"
                    value="biying" />
            <option label="360"
                    value="360" />
            <option label="知乎"
                    value="zhihu" />
            <option label="掘金"
                    value="juejin" />
        </select>
        <input v-model="inputVal"
               type="text"
               @keyup.native.enter="gotoSearch"
               placeholder="请输入...">
        <div class="btn"
             @click="gotoSearch">
            <g-icons iconName="icon-sousuo1"
                     className="icon-sousuo"
                     size="30"></g-icons>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
let select = ref('biying')
let inputVal = ref('')

let searchType = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'biying': 'https://cn.bing.com/search?q=',
    '360': 'https://www.so.com/s?ie=',
    'zhihu': 'https://www.zhihu.com/search?q=',
    'juejin': 'https://juejin.cn/search?query='
}

const gotoSearch = () => {
    let val = inputVal.value.trim()
    if (!val) return
    let url = `${searchType[select.value]}${val}`
    window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.search {
    position: relative;
    width: 250px;
    margin: 0 auto;

    select {
        height: 35px;
        width: 60px;
        cursor: pointer;
        left: -60px;
        position: absolute;
        background: #337ecc;
        font-size: 13px;
        color: #f9f0da;
        text-align: center;
        // appearance: none;
        // -webkit-appearance: none;
        // -moz-appearance: none;
    }

    select,
    input,
    button {
        border: none;
        outline: none;
    }

    input {
        width: 100%;
        height: 35px;
        padding-right: 45px;
        padding-left: 5px;
        border: 2px solid #337ecc;
        border-radius: 0 5px 5px 0;
        background: #fdf6ec;
        top: 0;
        right: 0;
        font-size: 14px;
    }

    .btn {
        background: #337ecc;
        border-radius: 0 5px 5px 0;
        top: 0;
        right: 0;
        height: 35px;
        width: 40px;
        cursor: pointer;
        position: absolute;
        .icon-sousuo {
            margin-top: 2px;
        }
    }
}
</style>
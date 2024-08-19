<template>
    <el-input v-model="inputVal"
              style="max-width: 600px"
              @keyup.enter="gotoSearch"
              placeholder="请输入...">
        <template #prepend>
            <el-select v-model="select"
                       placeholder="请选择"
                       style="width: 115px">
                <el-option label="百度"
                           value="baidu" />
                <el-option label="必应"
                           value="biying" />
                <el-option label="360"
                           value="360" />
                <el-option label="知乎"
                           value="zhihu" />
                <el-option label="掘金"
                           value="juejin" />
            </el-select>
        </template>
        <template #append>
            <el-button :icon="Search"
                       @click="gotoSearch" />
        </template>
    </el-input>
</template>

<script setup>
import { ref } from "vue";
import { Search } from '@element-plus/icons-vue'

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
</style>
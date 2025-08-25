import { computed } from "vue";
import http from "./http";
import store from "@/store"


let preUrl = computed(() => {
    return process.env.NODE_ENV == "development" ? "/gitee-proxy" : store.state.app?.projectConfig.assetsPrefix
})

// 获取所有工具类数据
export const getAllSitesToolsAPI = params => http({
    method: 'get',
    url: preUrl.value + '/sites/tools.json',
    params,
})

// 获取所有博客类数据
export const getAllBlogMdListAPI = params => http({
    method: 'get',
    url: preUrl.value + '/sites/blog.json',
    params,
})

// 获取对应博客的md文档详情
export const getBlogMdDetailsAPI = (rawRul, params) => http({
    method: 'get',
    url: preUrl.value + rawRul,
    params,
})
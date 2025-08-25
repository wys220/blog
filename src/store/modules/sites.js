// 站点数据vuex modules
import {
    getAllSitesToolsAPI,
    getAllBlogMdListAPI
} from "@c/api/gitee.js"

const state = {
    allTools: null, //全部工具列表
    allBlogList: null, //全部博客列表，包含分类
    currentBlog: null, // 默认选择的博客
    blogList: null, //全部博客列表，（一维数组）
}
const mutations = {
    // 设置全部工具列表
    SET_ALL_TOOL(state, data) {
        state.allTools = data;
    },
    // 设置全部博客列表
    SET_ALL_BLOG_LIST(state, data) {
        state.allBlogList = data;
    },
    // 设置默认选择的博客
    SET_CURRENT_BLOG(state, data) {
        state.currentBlog = data;
    },
    // 设置全部博客列表（一维数组）
    SET_BLOG_LIST(state, data) {
        state.blogList = data;
    },
}

const actions = {
    // 获取所有工具类数据
    async getAllSitesTools({ state, rootState, commit, dispatch }) {
        try {
            const response = await getAllSitesToolsAPI();
            commit('SET_ALL_TOOL', response)
        } catch {
            commit('SET_ALL_TOOL', null)
        }

    },
    // 获取所有工具类数据
    async getAllBlogMdList({ state, rootState, commit, dispatch }) {
        try {
            const response = await getAllBlogMdListAPI();
            let blogList = response?.data?.reduce((pre, cur) => {
                let list = cur?.list
                return [...pre, ...list]
            }, [])
            commit('SET_ALL_BLOG_LIST', response)
            commit('SET_CURRENT_BLOG', response?.data[0]?.list[0])
            commit('SET_BLOG_LIST', blogList)
        } catch {
            commit('SET_ALL_BLOG_LIST', null)
            commit('SET_CURRENT_BLOG', null)
        }

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
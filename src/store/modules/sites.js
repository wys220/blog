// 站点数据vuex modules
import { giteeApi } from '@c/api/giteeApi';

const state = {
    allTools: null, //全部工具列表
    allBlogList: null, //全部博客列表，包含分类
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
    // 设置全部博客列表（一维数组）
    SET_BLOG_LIST(state, data) {
        state.blogList = data;
    },
}

const actions = {
    // 获取配置
    async getUserInfo({ state, rootState, commit, dispatch }) {
        try {
            const response = await giteeApi.getJsonFile('/sites/config.json')
            commit('app/SET_USER_INFO', response, { root: true })
        } catch {
            commit('app/SET_USER_INFO', null, { root: true })
        }

    },
    // 获取所有工具类数据
    async getAllSitesTools({ state, rootState, commit, dispatch }) {
        try {
            const response = await giteeApi.getJsonFile('/sites/tools.json')
            commit('SET_ALL_TOOL', response)
        } catch {
            commit('SET_ALL_TOOL', null)
        }

    },
    // 获取所有工具类数据
    async getAllBlogMdList({ state, rootState, commit, dispatch }) {
        try {
            const response = await giteeApi.getJsonFile('/sites/blog.json')
            let blogList = response?.data?.reduce((pre, cur) => {
                let list = cur?.list
                return [...pre, ...list]
            }, [])
            commit('SET_ALL_BLOG_LIST', response)
            commit('SET_BLOG_LIST', blogList)
        } catch {
            commit('SET_ALL_BLOG_LIST', null)
        }

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
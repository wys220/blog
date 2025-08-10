import { projectDefaultConfig } from '@/config/defaultConfig'
import defeultImageUrl from "@/assets/images/bg.jpeg"

const state = {
    projectConfig: { ...projectDefaultConfig },//默认项目配置
    bgIndex: sessionStorage.getItem('currentBgUrlIndex') ? JSON.parse(sessionStorage.getItem('currentBgUrlIndex')) : 1, //默认背景图索引
    bgLists: [], // 背景图列表
    currentBgUrl: '', // 当前图片url
    isAutoToggleBg: true, //是否自动更新背景图
    toggleBgTime: 5, // toggleBgTime 单位：分钟
}
const mutations = {
    // 设置当前背景图索引
    SET_BG_INDEX(state, data) {
        state.bgIndex = data;
    },
    // 背景图列表
    SET_BG_LISTS(state, data) {
        state.bgLists = data;
    },
    // 设置当前背景图utl
    SET_CURRENT_BG_URL(state, data) {
        state.currentBgUrl = data;
    },
    // 设置是否自动切换背景图
    SET_AUTO_TOGGLE_BG(state, data) {
        state.isAutoToggleBg = data;
    },
    // 设置切换背景图时间
    SET_TOGGLE_BG_TIME(state, data) {
        state.toggleBgTime = data;
    },
}

const actions = {
    // 获取所有背景图片
    getAllBgImages({ state, commit, dispatch }) {
        const files = import.meta.globEager("@/assets/images/bg/*.jpg");
        let bgUrlList = Object.keys(files)
        commit('SET_BG_LISTS', bgUrlList)
        dispatch('setBgUrl')
    },
    // 设置背景图片
    setBgUrl({ state, commit }) {
        let url = new URL(`../../assets/images/bg/${state.bgIndex}.jpg`, import.meta.url).href
        let currentUrl = url || defeultImageUrl
        // console.log(currentUrl, 'currentUrl')
        commit('SET_CURRENT_BG_URL', currentUrl)
    },
    // 更新背景图
    updateBgUrl({ state, commit, dispatch }, num = null) {
        let index = num || state.bgIndex || 1
        let bgUrlLen = state.bgLists.length
        // 顺序更新,反之设置存入的索引
        if (!num) {
            if (0 < index && index < bgUrlLen) {
                index++
            } else {
                index = 1
            }
        }
        commit('SET_BG_INDEX', index)
        sessionStorage.setItem('currentBgUrlIndex', JSON.stringify(index))
        dispatch('setBgUrl')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
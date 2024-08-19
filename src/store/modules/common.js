import { getTodayImage } from "@/common/api/common"
const state = {
    homeBgUrl: '',
    test: 'Vuex内容'
}
const mutations = {
    // 设置首页背景图
    SET_HOME_BG_URL: (state, data) => {
        state.homeBgUrl = data
    },
}

const actions = {
    async getTodayImageFun({ commit }) {
        const res = await getTodayImage()
        let imageType = res.headers['content-type'];   //获取图片类型
        const blob = new Blob([res.data], { type: imageType })
        commit('SET_HOME_BG_URL', (window.URL || window.webkitURL).createObjectURL(blob))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
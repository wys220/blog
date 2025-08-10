import store from "@/store"

// 产生min~max之间的随机数
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 切换背景图片
export const changeBgImg = (name = 1) => {
    let preFix = store.state.app?.projectConfig.assetsPrefix;
    let bgMaxLen = 100;
    let url = '';
    // if (name) {
    //     url = preFix + '/img/bgImg/' + name + '.jpg';
    // } 
    // else {
    const num = getRandomInt(1, bgMaxLen);
    store.commit('app/SET_BG_INDEX', num);
    url = preFix + '/img/bgImg/' + num + '.jpg';
    // }
    console.log(url, '背景图片url');
    return url;
};

export default {
    getRandomInt,
    changeBgImg,
}
import http from "./http";

const pre = 'https://api.apiopen.top/api/'
const pre1 = 'https://api.oick.cn/'

// 获取图片
export const getImages = params => http({
    method: 'get',
    url: pre + 'getImages',
    params,
})
    
// 获取好看视频
export const getHaoKanVideo = params => http({
    method: 'get',
    url: pre + 'getHaoKanVideo',
    params,
})

// 获取短视频
export const getMiniVideo = params => http({
    method: 'get',
    url: pre + 'getMiniVideo',
    params,
})

// 获取每日意一图
export const getTodayImage = params => http({
    method: 'get',
    url: pre1 + 'bing/api.php',
    params,
    responseType: 'arraybuffer',
})
// 舔狗日记
export const getDogInfo = params => http({
    method: 'get',
    url: pre1 + 'dog/api.php',
    params,
})
// 毒鸡汤
export const getDutangInfo = params => http({
    method: 'get',
    url: pre1 + 'dutang/api.php',
    params,
})
// 经典语录
export const getYuluInfo = params => http({
    method: 'get',
    url: pre1 + 'yulu/api.php',
    params,
})
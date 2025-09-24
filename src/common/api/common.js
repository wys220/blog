import http from "./http";

// aip
const apiUrl = 'https://api.apiopen.top/api/'


// 获取图片
export const getImages = params => http({
    method: 'get',
    url: apiUrl + 'getImages',
    params,
})

// 获取好看视频
export const getHaoKanVideo = params => http({
    method: 'get',
    url: apiUrl + 'getHaoKanVideo',
    params,
})

// 获取短视频
export const getMiniVideo = params => http({
    method: 'get',
    url: apiUrl + 'getMiniVideo',
    params,
})



// 每日一言
export const getMeiRiYiYanAPI = params => http({
    method: 'get',
    url: 'https://h.moyanjdc.top/',
    params,
})

//骚话
export const getSaoHuaAPI = params => http({
    method: 'get',
    url: 'https://v.api.aa1.cn/api/api-saohua/index.php?type=json',
    params,
})

//安慰文案
export const getWenAnAnWeiAPI = params => http({
    method: 'get',
    url: 'https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json',
    params,
})

//爱情文案
export const getWenAnAiQingAPI = params => http({
    method: 'get',
    url: 'https://v.api.aa1.cn/api/api-wenan-aiqing/index.php?type=json',
    params,
})

//搞笑文案
export const getWenAnGaoXiaoAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-gaoxiao/?type=json',
    params,
})

//随机诗词
export const getWenAnShiCiAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-shici/?type=json',
    params,
})

//唯美文案
export const getWenAnWeiMeiAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-wm/?type=json',
    params,
})

//调皮文案
export const getWenAnTiaoPiAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-pp/?type=json',
    params,
})

//美句文案
export const getWenAnMeijuAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-mj/?type=json',
    params,
})

//励志文案
export const getWenAnLiZhiAPI = params => http({
    method: 'get',
    url: 'https://zj.v.api.aa1.cn/api/wenan-mj/?type=json',
    params,
})
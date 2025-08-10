// 韩小韩WebAPI接口

import http from "./http";

export const HxhUrl = 'https://api.vvhan.com/api'

// 获取图片
export const getScriptAPI = params => http({
    method: 'get',
    url: HxhUrl + '/script/snow',
    params,
})

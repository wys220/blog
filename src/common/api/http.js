import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.timeout = 60000; //超时时间
const accessTokenKey = "access-token";
axios.defaults.headers["accept"] = "text/plain";
axios.defaults.headers["Content-Type"] = "application/json-patch+json";

//请求拦截器
axios.interceptors.request.use(
    config => { return config },
    error => { return Promise.reject(error) }
)

// 响应拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(
    res => {
        if (res.status == 200) {
            // console.log(res, 'resres');
            if (res.request.responseType == "arraybuffer") {
                return res
            } else {
                return res.data
            }
        }
    },
    error => {
        return Promise.reject(error)
    })

export default (options, flag = true) => {
    // if (flag) { addLoading(); }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                // if (flag) { isCloseLoading(); 
                resolve(res)
            })
            .catch(err => {
                // if (flag) { isCloseLoading(); }
                reject(err)
            });
    })
}
// 防抖
export function debounce(fn, delay) {
    let timer = null
    return e => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(e)
        }, delay)
    }
}

// 节流
export function throttle(fn, delay = 100) {
    let flag = false
    return e => {
        if (flag) return
        fn(e)
        setTimeout(() => {
            flag = true
        }, delay)
    }
}

//判断是否是json
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            const obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                console.log('是JSON');
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}

export default {
    debounce,
    throttle,
    isJSON,
}
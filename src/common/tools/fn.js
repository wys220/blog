//公共方法
export const getParamsByKey = (keyArr, origin) => keyArr.reduce((total, item) => {
    total[item] = origin[item]
    return total
}, {})

export const getChangeByKey = (keyArr, newVal, oldVal) => keyArr.reduce((total, item, index) => {
        newVal[index] !== oldVal[index]
        total[item] = newVal[index]
        return total
    }, {})
    //转换json的key为小写
export const toLower = origin => {
    const fn = (origin) => {
        if (Array.isArray(origin)) {
            return origin.map(i => fn(i))
        } else if (typeof(origin) === 'object' && origin) {
            return Object.keys(origin).reduce((total, i) => {
                let key = i.replace(/[A-Z]/g, str => str.toLocaleLowerCase())
                total[key] = fn(origin[i])
                return total
            }, {})
        } else return origin
    }
    return fn(origin)
}

//数字输入框禁止输入e和.
export const intInput = (e) => {
        if (["e", "."].includes(e.key)) {
            e.preventDefault();
        }
    }
    //数字输入框禁止输入e
export const floatInput = (e) => {
    if (["e"].includes(e.key)) {
        e.preventDefault();
    }
}

// 外链
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}


// 树查询，返回所在的数组及下标
export function treeFind(tree, key, value, child = 'children') {
    const fn = origin => {
        for (let i = 0; i < origin.length; i++) {
            if (origin[i][key] === value) return { parent: origin, index: i }
            if (origin[i][child] && origin[i][child].length > 0) {
                const target = fn(origin[i][child])
                if (target) return target
            }
        }
        return false
    }
    return fn(tree)
}

// 节点赋值
export function setValuesInDom(dom, oarr) {
    let arr = oarr.map(i => i)
    const setVal = dom => {
        if (!dom.hasChildNodes()) return
        const children = dom.children
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'checkbox') {
                const v = arr.shift()
                children[i].checked = v
            } else if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'text' || children[i].tagName.toLowerCase() === 'textarea') {
                const v = arr.shift()
                children[i].value = v
            } else {
                setVal(children[i])
            }
        }
    }
    setVal(dom)
}

//节点取值
export function getValuesInDom(dom) {
    let arr = []
    const getVal = dom => {
        if (!dom.hasChildNodes()) return
        const children = dom.children
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'checkbox') {
                arr.push(children[i].checked)
            } else if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'text' || children[i].tagName.toLowerCase() === 'textarea') {
                arr.push(children[i].value)
            } else {
                getVal(children[i])
            }
        }
    }
    getVal(dom)
    return arr
}

// 节点重置
export function resetDom(dom) {
    const generateDom = dom => {
        if (!dom.hasChildNodes()) return
        const children = dom.children
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'checkbox') {
                children[i].checked = false
            } else if (children[i].tagName.toLowerCase() === 'input' && children[i].type === 'text' || children[i].tagName.toLowerCase() === 'textarea') {
                children[i].value = ''
            } else {
                generateDom(children[i])
            }
        }
    }
    generateDom(dom)
}

// 用于重置对象字段为原始值的函数
export function resetObjToPrimitiveType(v) {
    const generateData = v => {
        if (!v) return
        Object.keys(v).map(key => {
            if (v[key] instanceof Array) {
                v[key] = []
            } else if (v[key] instanceof Object) {
                generateData(v[key])
            } else {
                v[key] = ''
            }
        })
    }
    generateData(v)
}

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


// export function throttle(fn, delay = 100) {
// 	//首先设定一个变量，在没有执行我们的定时器为null
// 	let timer = null;
// 	return function () {
// 		//当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
// 		if (timer) return;
// 		timer = setTimeout(() => {
// 			fn.apply(fn, arguments);
// 			timer = null;
// 		}, delay)
// 	}
// }


// obj 是否满足exclude其中一项全属性相同
export function objSome(obj, exclude) {
    const arr = Array.isArray(exclude) ? exclude : [exclude]
    return arr.some(i => Object.keys(i).every(j => i[j] === obj[j]))
}


// 时间格式化
export function formatDate(date, format) {
    let origin
    if (!format) {
        format = date
        origin = new Date()
    } else {
        origin = new Date(date)
    }
    const temp = {
        y: origin.getFullYear() + '',
        M: ("0" + (origin.getMonth() + 1)).slice(-2),
        d: ("0" + origin.getDate()).slice(-2),
        h: ("0" + origin.getHours()).slice(-2),
        m: ("0" + origin.getMinutes()).slice(-2),
        s: ("0" + origin.getSeconds()).slice(-2),
        w: origin.getDay()
    }
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return format.replace(/([yMdhmsw])\1+/g, str => {
        const symbol = str.slice(-1)
        return symbol === 'y' ? temp[symbol].slice(-1 * str.length) : symbol === 'w' ? week[temp[symbol]] : temp[symbol]
    })
}

// 数组存在判断
export function hasItem(arr, key, value) {
    return arr && arr.length > 0 && arr.some(i => i[key] === value)
}

// 树存在判断
export function treeHasItem(tree, key, value, child = 'children') {
    const fn = option => {
        return option && option.length > 0 && option.some(i => i[key] === value || fn(i[child]))
    }
    return fn(tree)
}

//  数组裁切
export function splitArray(arr, n) {
    const target = []
    const num = Math.ceil(arr.length / n)
    let i = 0
    while (i < num) {
        target.push(i === num - 1 ? arr.slice(i * n) : arr.slice(i * n, (i + 1) * n))
        i++
    }
    return target
}

// 树过滤
export function treeFilter(tree, key, value, child) {
    const fn = (tree) => {
        if (!tree || tree.length < 1) return []
        const res = []
        tree.forEach(i => {
            const item = {...i }
            let flag = false
            if (i[child] && i[child].length > 0) {
                item[child] = fn(i[child])
                flag = item[child] && item[child].length > 0 || getFlag(i)
            } else {
                flag = getFlag(i)
            }
            flag && res.push(item)
        })
        return res
    }
    const getFlag = (opts) => {
        if (key) {
            return !value || (opts[key] && opts[key].indexOf(value) > -1)
        } else {
            return Object.keys(value).every(i => !value[i] || (opts[i] && opts[i].indexOf(value[i]) > -1))
        }
    }
    return fn(tree)
}

// 非中文字符数
export function getStringLength(str) {
    const arr = str.match(/[A-Za-z\d`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g) || []
    return arr.length
}

// 最大偏移
export function maxOffset(arr, defaultV = 0) {
    const temp = {}
    let target = defaultV
    temp[target] = 0
    arr.forEach(i => {
        if (temp[i] === undefined) {
            temp[i] = Math.abs(i - defaultV)
            temp[i] > temp[target] && (target = i)
        }
    })
    return target
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

/**
 * @param json {Object} JSON或JSON数组
 * @return JSON或JSON数组
 */
export const sortJson = (json, isAsc = true, isDealDate = true) => {
        if (Array.isArray(json)) {
            return sortJsonArray(json, isAsc, isDealDate)
        } else if (typeof json == 'object') {
            return sortJsonObj(json, isAsc, isDealDate)
        } else {
            return json;
        }
    }
    /**
     * @param json {Object} JSON数组
     * @return json字符串
     */
const sortJsonArray = (json, isAsc = true, isDealDate = true) => {
    let sortArray = new Array()
    json.forEach((item, index) => {
        if (typeof item == 'object') {
            sortArray.push(sortJson(item, isAsc, isDealDate));
        } else {
            sortArray.push(item);
        }
    });
    return sortArray;
}

/**
 * @param json {Object} JSON对象
 * @return json字符串
 */
const sortJsonObj = (json, isAsc = true, isDealDate = true) => {
    let newJson = {};
    //过滤去掉undefined数据
    for (let key in json) {
        if (json[key] != undefined && json[key] != 'undefined') {
            let newkey = key.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase());
            newJson[newkey] = json[key];
        }
    }
}
export default {
    toLower,
    maxOffset,
    isExternal,
    treeFind,
    setValuesInDom,
    getValuesInDom,
    resetDom,
    debounce,
    throttle,
    formatDate,
    hasItem,
    treeHasItem,
    splitArray,
    treeFilter,
    getStringLength,
    objSome,
    isJSON,
    sortJson,
    sortJsonArray,
    sortJsonObj,
    intInput,
    floatInput
}
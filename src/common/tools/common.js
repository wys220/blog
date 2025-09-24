import store from "@/store"
import router from "@/router"
import { getCurrentInstance } from "vue"
import { toast } from '@c/tools/toast'


/**
 * 页面跳转
 * @param {*} url 跳转url
 * @param {*} isScrollTo 跳转滚动条是否置顶
 * @returns 
 */
export const goPage = (url = 'home', isScrollTo = true) => {
    if (!url) return
    router.push(`/${url}`)
    isScrollTo && window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

/**
 * 跳转置顶id位置
 * @param {*} id 指定元素
 */
export const jumpElement = (id = 'main-area') => {
    document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" })
}

/**
 * 复制逻辑抽离：单独函数，便于维护和复用
 * @param {*} text //需要复制的文本
 */
export const copyText = (text) => {
    // 处理剪贴板API异常
    navigator.clipboard.writeText(text)
        .then(() => {
            toast.success('复制成功')
        })
        .catch((err) => {
            console.error('复制失败：', err);
        });
}
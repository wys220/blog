import store from "@/store"
import router from "@/router"


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
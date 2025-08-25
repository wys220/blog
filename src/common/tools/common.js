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

// /**
//  * 渲染Markdown到指定元素
//  * @param {string} markdownContent - Markdown内容
//  * @param {string|HTMLElement} targetElement - 目标元素ID或元素对象
//  * @param {object} [options] - 配置选项
//  * @param {boolean} [options.sanitize=true] - 是否过滤HTML
//  * @param {boolean} [options.highlight=true] - 是否启用代码高亮
//  */
// export const renderMarkdown = (markdownContent, targetElement, options = {}) => {
//     // 合并默认选项
//     const finalOptions = {
//         sanitize: true,
//         highlight: true,
//         ...options
//     };
//     console.log(targetElement, 'targetElement');

//     // 配置marked
//     marked.setOptions({
//         sanitize: finalOptions.sanitize,
//         highlight: finalOptions.highlight ? function (code, lang) {
//             if (Prism.languages[lang]) {
//                 return Prism.highlight(code, Prism.languages[lang], lang);
//             }
//             return code;
//         } : null,
//         langPrefix: 'hljs language-' // 与highlight.js配合需要的类名前缀
//     });

//     // 获取目标元素
//     const element = typeof targetElement === 'string'
//         ? document.getElementById(targetElement)
//         : targetElement;

//     if (!element) {
//         console.error('Target element not found');
//         return;
//     }

//     // 渲染Markdown
//     element.innerHTML = marked.parse(markdownContent);
// }

// // 初始化highlight.js
// document.addEventListener('DOMContentLoaded', function () {
//     hljs.highlightAll();
// });

export default {
    getRandomInt,
    changeBgImg,
    // renderMarkdown,
}
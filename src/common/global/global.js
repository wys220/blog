const files = import.meta.globEager('./**/index.vue')

const modules = Object.keys(files).reduce((pre, cur) => {
    let name = cur.replace(/\.|\/|\/|index\.vue/g, '')
    // .replace(/([A-Z])/g, (match) => {
    //     return '-' + match.toLowerCase()
    // })
    pre[`g${name}`] = files[cur].default
    return pre
}, {})

export default {
    install(vue) {
        Object.keys(modules).forEach(i => {
            vue.component(i, modules[i])
        })
    }
}
// global目录下为全局组件,只注册目录下所有index.vue
// 使用规则: 以./global/SvgIcon/index.vue 为例, 用<g-svg-icon /> || <gSvgIcon></gSvgIcon> || <gSvgIcon />
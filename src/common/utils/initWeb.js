//引入elementui plus组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 引入element-plus组件
import ElementPlus from './elementPlus.js';

//引入自定义公共组件
import global from '@c/global/global.js';
// 自定义全局方法vue 可以注册多个store
import mixins from '@c/mixins';
import GlobalFn from '@c/tools/fn';
// 全局store
import store from '@/store/index';
//全局指令
import directiveList from './directive';
// 路由守卫
import './permission';
import router from '@/router/index';
//引入离线阿里巴巴矢量图标icon文件
import "@c/assets/iconfonts/iconfont.js";
//引入阿里巴巴字体库s
import "@c/assets/iconfonts/font.css";
//引入icon
import '@c/assets/icons/index.js';
// 引入样式
import '@c/styles/index.scss';
//导入Svg图片插件，可以在页面上显示Svg图片
import 'virtual:svg-icons-register';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 全局提示
import Toast from '@c/tools/toast'

import { createApp } from "vue";
import App from "@/App.vue";

export default class InitWeb {
    constructor({ router }) {
        this.app = createApp(App)
        this.routes = router
    }
    async init() {
        // this.routes.forEach(i => router.addRoute(i))
        this.app.mixin(mixins)
            .use(router)
            .use(store)
            .use(ElementPlus, { locale: zhCn })
            .use(global)
            .use(Toast)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            this.app.component(key, component)
        }
        // 注册指令
        for (let j in directiveList) {
            this.app.directive(j, directiveList[j]);
        }
        this.app.mount("#app")
        this.app.config.globalProperties.$fn = GlobalFn


        // 获取全部背景图
        store.dispatch('app/getAllBgImages')

        // 获取用户信息
        store.dispatch('sites/getUserInfo')
        // 获取全部工具数据
        store.dispatch('sites/getAllSitesTools')
        // 获取全部博客数据
        store.dispatch('sites/getAllBlogMdList')
    }


}
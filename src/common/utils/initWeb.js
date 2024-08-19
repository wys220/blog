//引入elementui plus组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//引入vxetable组件
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
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
//引入icon
import '@c/assets/iconfonts/iconfont.css';
import '@c/assets/icons/index.js';
//导入Svg图片插件，可以在页面上显示Svg图片
import 'virtual:svg-icons-register';

//引入字体
// import '@c/assets/font/font.css';
// 国际化
import en from '@c/assets/langs/en.js';
import cn from '@c/assets/langs/cn.js';
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { createI18n } from 'vue-i18n';

import { createApp } from "vue";
import App from "@/App.vue";

const i18n = new createI18n({
    locale: 'cn', // 语言标识
    messages: {
        cn,
        en,
    }
})

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
            .use(VXETable)
            .use(ElementPlus, { locale: zhCn })
            .use(global)
            .use(i18n)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            this.app.component(key, component)
        }
        // 注册指令
        for (let j in directiveList) {
            this.app.directive(j, directiveList[j]);
        }
        this.app.mount("#app")
        this.app.config.globalProperties.$fn = GlobalFn
    }
}
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/picture',
        name: 'picture',
        component: () => import('@/views/picture/index.vue'),
        meta: {
            title: '相册'
        }
    },
    {
        path: '/picture/details/:type',
        name: 'pictureDetails',
        component: () => import('@/views/picture/details.vue'),
        meta: {
            isBackIcon: true,
            title: '相册相情'
        }
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue'),
        meta: {
            title: '视频'
        }
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/blog/index.vue'),
        meta: {
            title: '随记'
        }
    },
    {
        path: '/blog/details/:name',
        name: 'blogDetails',
        component: () => import('@/views/blog/details.vue'),
        meta: {
            isBackIcon: true,
            title: '随记相情'
        }
    },
    {
        path: '/copyroom',
        name: 'copyroom',
        component: () => import('@/views/copyroom/index.vue'),
        meta: {
            title: '文案'
        }
    },
    {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/tools/index.vue'),
        meta: {
            title: '工具'
        }
    },
    {
        path: '/tools/details/:type',
        name: 'toolsDetails',
        component: () => import('@/views/tools/details.vue'),
        meta: {
            isBackIcon: true,
            title: '工具相情'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
            title: '关于'
        }
    },
    {
        path: '/bgImage',
        name: 'bgImage',
        component: () => import('@/views/bgImage/index.vue'),
        meta: {
            title: '壁纸'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
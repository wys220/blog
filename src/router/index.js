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
        meta: {}
    },
    {
        path: '/picture',
        name: 'picture',
        component: () => import('@/views/picture/index.vue'),
        meta: {}
    },
    {
        path: '/picture/details/:type',
        name: 'pictureDetails',
        component: () => import('@/views/picture/details.vue'),
        meta: {
            isBackIcon: true,
        }
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue'),
        meta: {}
    },
    {
        path: '/copyroom',
        name: 'copyroom',
        component: () => import('@/views/copyroom/index.vue'),
        meta: {}
    },
    {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/tools/index.vue'),
        meta: {}
    },
    {
        path: '/tools/details/:type',
        name: 'toolsDetails',
        component: () => import('@/views/tools/details.vue'),
        meta: {
            isBackIcon: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {}
    }
]

const router = createRouter({
    history: createWebHistory('/blog/'),
    // history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
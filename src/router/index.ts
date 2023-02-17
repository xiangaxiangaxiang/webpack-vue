import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

export const RouterName =  {
    base: 'base',
    piniaDemo: 'pinia demo',
    testImg: 'test img',
    treeShaking: 'tree shaking'
} as const

const routes: RouteRecordRaw[] = [
    {
        name: RouterName.base,
        path: '/base',
        component: () => import(/* webpackChunkName: 'base' */'../views/base/index.vue')
    },
    {
        name: RouterName.piniaDemo,
        path: '/pinia-demo',
        component: () => import(/* webpackChunkName: 'pinia-demo' */'../views/pinia-demo/index.vue')
    },
    {
        name: RouterName.testImg,
        path: '/pinia-demo',
        component: () => import(/* webpackChunkName: 'test-img' */'../views/test-img/index.vue')
    },
    {
        name: RouterName.treeShaking,
        path: '/tree-shaking',
        component: () => import(/* webpackChunkName: 'tree-shaking' */'../views/tree-shaking/index.vue')
    },
    {
        path: '/',
        redirect: {name: RouterName.base}
    },
]


export const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    console.log(to, from)
    next()
})
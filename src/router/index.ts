import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

export const RouterName =  {
    base: 'base',
    piniaDemo: 'pinia demo'
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
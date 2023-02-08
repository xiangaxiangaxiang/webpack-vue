import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

export const RouterName =  {
    base: 'base',
} as const;

const routes: RouteRecordRaw[] = [
    {
        name: RouterName.base,
        path: '/base',
        component: () => import('../views/base/index.vue')
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
    console.log(to, from);
    next()
})
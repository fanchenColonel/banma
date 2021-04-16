import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/menus',
        name: 'menus',
        component: () => import('../views/menus.vue'),
        children: [
            {
                path: '/',
                name: 'OnlineForm',
                component: () => import('@/views/onlineForm/onlineForm.vue')
            },
            {
                path: '/onlineFormFuncTest/:id',
                name: 'OnlineFormFuncTest',
                component: () => import('@/views/onlineForm/onlineFormFuncTest.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('@/views/About.vue')
            },
            {
                path: '/OnlineDev/ReportConfig',
                name: 'ReportConfig',
                component: () => import('@/views//OnlineDev/ReportConfig.vue')
            },
            {
                path: '/designer',
                name: 'designer',
                component: () => import('@/views/designer.vue')
            },
            {
                path: '/DesignerTemplate',
                name: 'DesignerTemplate',
                component: () => import('@/views/DesignerTemplate/DesignerTemplate.vue')
            },
            {
                path: '/DataStatistic',
                name: 'DataStatistic',
                component: () => import('@/views/DataStatisticForms/DataStatistic.vue')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;

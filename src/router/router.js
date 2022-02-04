import { RouteName } from '@/constants/router';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: RouteName.HOMEPAGE,
        path: '/',
        title: 'Home',
        component: () => import('@/Index.vue'),
    },
    {
        name: RouteName.ICARUS,
        path: '/icarus',
        title: 'Icarus',
        component: () => import('@/pages/icarus/icarus.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

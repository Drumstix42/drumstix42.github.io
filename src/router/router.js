import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('@/pages/Home.vue'),
    },
    {
        name: 'Icarus',
        path: '/icarus',
        component: () => import('@/pages/Icarus.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

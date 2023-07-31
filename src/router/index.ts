import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            props(to) {
                return {
                    page: Number(to.query.page) || 1,
                    name: to.query.name || '',
                    status: to.query.status || '',
                };
            },
        },
    ],
});

export default router;

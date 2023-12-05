import { createRouter, createWebHistory } from 'vue-router'
import TokenService from '../services/token.service'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    { path: '/:path(.*)', component: import('../views/NotFound.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = TokenService.getCookieByKey('userinfo');
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (loggedIn && publicPages.includes(to.path)) {
        next('/')
    } else if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});


export default router

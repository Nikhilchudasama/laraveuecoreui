import Vue from 'vue'
import Router from 'vue-router'
import { UserService } from './services/storage'


Vue.use(Router)

import DefaultContainer from './components/includes/app'
import Dashboard from './components/dashboard'
import Login from './components/auth/login'

const router = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/backend',
            redirect: '/backend/login'
        },
        {
            path: '/backend/login',
            name: 'Login',
            component: Login,
            meta: {
                public: true,
                title:'Login',
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '',
            component: DefaultContainer,
            children: [
                {
                    path: '/backend/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: {
                        title:'Dashboard',
                        standardUserAllowed: true
                    }
                }
            ]
        }
    ]
});

const DEFAULT_TITLE = 'LaraVue';
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});
router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
    const loggedIn = !!UserService.getUser()
    // const isAdmin = UserService.getUser().is_admin
    const standardUserAllowed = to.matched.some(record => record.meta.standardUserAllowed)

    if (!isPublic && !loggedIn) {
        return next({ name: 'Login' });
    }

    // Do not allow non-admin users to visit admin-only pages
    // if (!isPublic && !standardUserAllowed && !isAdmin) {
    if (!isPublic && !standardUserAllowed) {
        return next({ name: 'Dashboard' })
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({ name: 'Dashboard' })
    }

    next();
});

export default router


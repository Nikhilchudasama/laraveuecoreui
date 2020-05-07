import Vue from 'vue'
import Router from 'vue-router'
import { UserService } from './services/storage'


Vue.use(Router)

import DefaultContainer from './components/includes/app'
import Dashboard from './components/dashboard'
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgetPassword'
import ResetPassword from './components/auth/resetPassword'
import UserIndex from './components/user/index'
import UserForm from  './components/user/form'

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
            path: '/backend/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                public: true,
                title:'Forgot Password',
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/backend/reset-password/:token/:email',
            name: 'ResetPassword',
            component: ResetPassword,
            props: true,
            meta: {
                public: true,
                title:'Reset Password',
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
                },
                {
                    path: '/backend/user',
                    name: 'User',
                    component: UserIndex,
                    meta: {
                        title:'User',
                        standardUserAllowed: true
                    }
                },
                {
                    path: '/backend/user/add',
                    name: 'AddUserForm',
                    component: UserForm,
                    meta: {
                        title:'Add User',
                        standardUserAllowed: true
                    }
                },
                {
                    path: '/backend/user/:user/edit',
                    name: 'EditUserForm',
                    component: UserForm,
                    props: true,
                    meta: {
                        title:'Edit User',
                        standardUserAllowed: true
                    }
                },
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


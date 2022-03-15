import { createRouter,createWebHashHistory} from 'vue-router'
const login = () => import('../components/Login')
const home = () => import('../components/Home')
const register = () => import('../components/Register')
const profile = () => import('../components/Profile')
const verify = () => import('../components/Verify')

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/verify',
        name: 'verify',
        component: verify
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            requireAuth: true
        },
        children: [
            {
                name: 'profile',
                path: 'profile',
                component: profile
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
// router.beforeEach((guard) => {
//     beforeEach.checkAuth(guard, router)
// })
// router.onError((handler: ErrorHandler) => {
//     console.log('error:', handler)
// })
export default router

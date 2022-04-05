import { createRouter,createWebHashHistory} from 'vue-router'
const login = () => import('../components/Login')
const home = () => import('../components/Home')
const register = () => import('../components/Register')
const profile = () => import('../components/Profile')
const verify = () => import('../components/Verify')
const tos = () => import('../components/Tos')
const whatsNew = () => import('../components/WhatsNew')
const topic = () => import('../components/Topic')
const bookmark = () => import('../components/Bookmark')
const sharing = () => import('../components/Sharing')
const ask = () => import('../components/Ask')
const assign = () => import('../components/Assign')
const task = () => import('../components/Task')
const audit = () => import('../components/Audit')
const admin = () => import('../components/Admin')
const wisiteGreen = () => import('../components/WisiteGreen')

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
        path: '/tos',
        name: 'tos',
        component: tos
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
            },
            {
                name: 'whatsNew',
                path: 'whatsNew',
                component: whatsNew
            },
            {
                name: 'task',
                path: 'task',
                component: task
            },
            {
                name: 'topic',
                path: 'topic',
                component: topic
            },
            {
                name: 'bookmark',
                path: 'bookmark',
                component: bookmark
            },
            {
                name: 'sharing',
                path: 'sharing',
                component: sharing
            },
            {
                name: 'assign',
                path: 'assign',
                component: assign
            },
            {
                name: 'ask',
                path: 'ask',
                component: ask
            },
            {
                name: 'audit',
                path: 'audit',
                component: audit
            },
            {
                name: 'admin',
                path: 'admin',
                component: admin
            },
            {
                name: 'wisiteGreen',
                path: 'wisiteGreen',
                component: wisiteGreen
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


import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'

createApp(App)
    .use(store)
    .use(ElementPlus)
    .use(router)
    .use(i18n)
    .mount('#app')

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
        console.log('需要登录');
        if (localStorage.getItem('accessToken')) { // 判断当前的token是否存在 ； 登录存入的token
            next();
        }
        else {
            next({
                path: '/',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import axios from "axios";
axios.request({
    url: '/config.json',
    method: 'get',
    data: {}
}).then(res => {
    if (res.status === 200) {
        window.baseUrl = res.data.baseUrl
        createApp(App)
            .use(store)
            .use(ElementPlus)
            .use(router)
            .use(i18n)
            .mount('#app')
    } else {
        console.log(res)
    }
}).catch(error => {
    console.log(error)
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
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

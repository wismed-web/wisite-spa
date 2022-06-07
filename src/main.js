import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import axios from "axios"
import util from './util/util'
import VueCropper from 'vue-cropper';
import 'vue-cropper/next/dist/index.css'
axios.request({
    url: '/config.json',
    method: 'get',
    data: {}
}).then(res => {
    if (res.status === 200) {
        window.baseUrl = res.data.baseUrl
        window.count = res.data.count
        window.time = res.data.time
        window.heartbeatsInterval = res.data.heartbeatsInterval
        let appCommon = createApp(App)
        appCommon.config.globalProperties.$util = util
        appCommon.use(store)
            .use(VueCropper)
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

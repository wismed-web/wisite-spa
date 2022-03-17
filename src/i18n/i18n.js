import { createI18n } from 'vue-i18n' //引入vue-i18n组件
const language = (
    (navigator.language ? navigator.language : navigator.userLanguage) || "zh"
).toLowerCase()
console.log(language)
const i18n = createI18n({
    fallbackLocale: 'ch',
    globalInjection:true,
    legacy: false, // you must specify 'legacy: false' option
    locale: language.split("-")[0] || "zh",
    messages: {
        zh: {
            message: {
                signIn: '登录',
                loginUnameTip: '用户名/邮箱',
                password: '密码',
                signUp: '注册'
            }
        },
        en: {
            message: {
                signIn: 'Sign in',
                loginUnameTip: 'Uname/Email',
                password: 'Password',
                signUp: 'Sign up'
            }
        }
    }
});

export default i18n
<template>
    <div id="changeLanguage">
        <el-form ref="form">
            <el-select size="small" v-model="locale" @change="changeLanguage"
                       style="width:80px;position:absolute;right:0px;top:0px;z-index: 10;">
                <el-option v-for="lang in locales" :key="lang.event" :value="lang.event" :label="lang.text"></el-option>
            </el-select>
        </el-form>
    </div>
    <el-form style="margin:0 auto;background-color: #fff;width: 480px;padding: 42px;margin-top:100px;">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>{{ $t('message.signIn') }}</h1>
            </div>
        </el-form-item>
        <el-form-item>
            <el-icon><Hide/></el-icon>
            <el-input
                    v-model="uname"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.loginNameTip')">
            </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;">
            <el-input
                    v-model="pwd"
                    size="large"
                    :type="passwordType"
                    class="w-50 m-2"
                    :placeholder="$t('message.password')"
                    :suffix-icon="View">
                <template #suffix>
                    <el-icon :size="large" class="el-input__icon" @click="passwordShow=!passwordShow">
                        <View v-if="!passwordShow" style="cursor: pointer;"></View>
                        <SemiSelect v-if="passwordShow" style="cursor: pointer;"></SemiSelect>
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
            <router-link :to="{name: 'register'}" style="color:red;">{{ $t('message.forgetPassword') }}?</router-link>
        </el-form-item>
        <el-form-item style="height: 32px;">
            <span style="color:red;font-size: 12px;width:100%;">{{loginInfo}}</span>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" :loading="loading" round v-on:click="login" size="large" style="font-size: 16px;width:100%;">{{ $t('message.signIn') }}</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                {{ $t('message.hasNoAccount') }}?&nbsp;&nbsp;
                <router-link :to="{name: 'register'}" style="color:red;">
                    {{ $t('message.signUp') }}
                </router-link>
            </div>
        </el-form-item>
    </el-form>
    <div style="position: absolute;bottom: 20px;right: 20px;color:black;font-size: 10px;">{{apiVersion}}</div>
</template>

<script>
    import {View, SemiSelect} from '@element-plus/icons'
    import apiUtil from '../util/apiUtil'
    export default {
        name: "Login",
        components: {View, SemiSelect},
        data() {
            return {
                uname: null,
                pwd: null,
                loginInfo: null,
                loading: false,
                passwordShow: false,
                locales: [
                    {event: 'zh', text: '中文'},
                    {event: 'en', text: 'English'},
                ],
                locale: 'zh',
                apiVersion: '1.0.0'
            }
        },
        computed: {
            passwordType() {
                return this.passwordShow ? 'text' : 'password'
            }
        },
        mounted() {
            let lang = localStorage.getItem('lang')
            if(lang){
                this.$i18n.locale = lang
                this.locale = lang
            }else{
                localStorage.setItem('lang', 'zh')
                this.locale = 'zh'
            }
            let _this = this
            apiUtil.api.get(apiUtil.urls.system.version)
                .then(data => {
                    _this.apiVersion = data
                }).catch(error => {
                    console.log(error)
            })
            apiUtil.api.get(window.location.origin + '/ffmpeg-core.wasm').then(data=> {
                console.log(data)
            }).catch(error=>{
                console.log(error)
            })
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'display:block;')
        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('class')
        },
        methods: {
            changeLanguage (lang) {
                localStorage.setItem('lang', lang)
                this.$i18n.locale = lang
                this.locale = lang
            },
            login(event) {
                let _this = this
                _this.loading = true
                console.log(event)
                if (!_this.uname) {
                    _this.loginInfo = _this.$t('message.loginNameRequireTip')
                    _this.loading = false
                    return
                }
                if (!_this.pwd) {
                    _this.loginInfo = _this.$t('message.passwordRequireTip')
                    _this.loading = false
                    return
                }
                _this.loginInfo = null
                apiUtil.api.post(apiUtil.urls.sign.signin, {uname: _this.uname, pwd: _this.pwd})
                    .then(data => {
                        _this.loading = false
                        apiUtil.message.success(_this.$t('message.loginSuccess'))
                        _this.$store.dispatch('setToken', data.auth)
                        apiUtil.util.setToken(data.auth)
                        let redirect = _this.$route.query.redirect
                        if(redirect){
                            _this.$router.push(redirect)
                        }else{
                            _this.$router.push('/home/profile')
                        }
                    }).catch(error => {
                        _this.loading = false
                        apiUtil.message.error(error)
                    })

            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
        color: red;
    }
    .body-bg {
        background: url('../assets/login-bg.jpg') no-repeat;
        background-size: cover;
    }
    #app {
        margin-top: 60px;
    }
</style>
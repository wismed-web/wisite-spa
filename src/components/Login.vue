<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 380px;padding: 42px;margin-top:100px;">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>{{ $t('message.signIn') }}</h1>
            </div>
        </el-form-item>
        <el-form-item>
            <el-input
                    v-model="uname"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.loginUnameTip')"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;">
            <el-input
                    v-model="pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    placeholder="$t('message.password')"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
            <router-link :to="{name: 'register'}" style="color:red;">忘记密码?</router-link>
        </el-form-item>
        <el-form-item style="height: 32px;">
            <span style="color:red;font-size: 12px;width:100%;">{{loginInfo}}</span>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" :loading="loading" round v-on:click="login" size="large" style="font-size: 16px;width:100%;">登录</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                还没有帐号?&nbsp;&nbsp;<router-link :to="{name: 'register'}" style="color:red;">{{ $t('message.signUp') }}</router-link>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import apiUtil from '../util/apiUtil'
    export default {
        name: "Login",
        components: {},
        data() {
            return {
                uname: null,
                pwd: null,
                loginInfo: null,
                loading: false
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'display:block;')
        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('class')
        },
        methods: {
            login(event) {
                let _this = this
                _this.loading = true
                console.log(event)
                if (!_this.uname) {
                    _this.loginInfo = "请输入用户名或邮箱"
                    return
                }
                if (!_this.pwd) {
                    _this.loginInfo = "请输入密码"
                    return
                }
                _this.loginInfo = null
                apiUtil.api.post(apiUtil.urls.sign.signin, {uname: _this.uname, pwd: _this.pwd})
                    .then(data => {
                        _this.loading = false
                        apiUtil.message.success('登录成功')
                        _this.$store.dispatch('setToken', data.auth)
                        apiUtil.util.setToken(data.auth)
                        let redirect = _this.$route.query.redirect
                        if(redirect){
                            _this.$router.push(redirect)
                        }else{
                            _this.$router.push('/home')
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
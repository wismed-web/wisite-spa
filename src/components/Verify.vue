<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 480px;padding: 42px;margin-top:100px;"
             :label-position="left"
             label-width="100px"
             :rules="rules"
             :model="verifyInfo"
             ref="verifyForm">
        <div style="font-weight: bold;text-align: left;">
            <h1>{{$t('message.emailVerify')}}</h1>
        </div>
        <div style="margin-bottom: 10px;font-size: 14px;">
            {{$t('message.sendMailVerifyTip')}}
        </div>
        <el-form-item prop="uname" :label="$t('message.loginName')">
            <el-input
                    v-model="verifyInfo.uname"
                    class="w-50 m-2"
                    size="large"
                    disabled
            />
        </el-form-item>
        <el-form-item prop="code" :label="$t('message.verifyCode')">
            <el-input
                    v-model="verifyInfo.code"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.verifyCode')"
            />
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="danger" round v-on:click="verify('verifyForm')" style="width:100%;" size="large">
                {{$t('message.verify')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import apiUtil from '../util/apiUtil'
    export default {
        name: "Verify",
        components: {},
        data() {
            return {
                verifyInfo: {
                    uname: null,
                    code: null,
                },
                rules: {
                    uname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
                loading: false,
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'display:block;')
        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('style')
        },
        mounted() {
            this.verifyInfo.uname = this.$route.params.uname
        },
        methods: {
            verify(formName) {
                let _this = this
                _this.loading = true
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiUtil.api.post(apiUtil.urls.sign.verifyEmail, _this.verifyInfo).then(data => {
                            _this.loading = false
                            console.log(data)
                            apiUtil.message.success(_this.$t('message.verifySuccess'))
                            let pwd = localStorage.getItem('password')
                            let username = localStorage.getItem('username')
                            apiUtil.message.success(_this.$t('message.redirect'))
                            apiUtil.api.post(apiUtil.urls.sign.signin, {uname: username, pwd: pwd})
                                .then(data => {
                                    _this.$store.dispatch('setToken', data.auth)
                                    apiUtil.util.setToken(data.auth)
                                    _this.$router.push('/home/whatsNew')
                                }).catch(error => {
                                    console.log(error)
                                    _this.$router.push('/login')
                            })

                        }).catch(error => {
                            apiUtil.message.error(error)
                            _this.loading = false
                        })
                    } else {
                        _this.loading = false
                        return false
                    }
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
        background-size: cover
    }
    div#app {
        margin-top: 60px;
    }
    .el-form-item__label {
        width: 100px;
    }
</style>f
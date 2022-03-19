<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 480px;padding: 42px;margin-top:100px;"
             :label-position="left"
             label-width="100px"
             :rules="rules"
             :model="registerInfo"
             ref="registerForm">
        <div style="font-weight: bold;text-align: left;">
            <h1>{{$t('message.signUp')}}</h1>
        </div>
        <el-form-item prop="uname" :label="$t('message.loginName')">
            <el-input
                    v-model="registerInfo.uname"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.loginName')"
            />
        </el-form-item>
        <el-form-item prop="email" :label="$t('message.email')">
            <el-input
                    v-model="registerInfo.email"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.email')"
            />
        </el-form-item>
        <el-form-item prop="name" :label="$t('message.realName')">
            <el-input
                    v-model="registerInfo.name"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.realName')"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 5px;" prop="pwd" :label="$t('message.password')">
            <el-input
                    v-model="registerInfo.pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    :placeholder="$t('message.password')"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" prop="tosSelect">
            <div style="text-align: left;font-size: 12px;width:100%;">
                <el-radio v-model="registerInfo.tosSelect" label="1" size="large">
                    {{$t('message.readAccept')}}
                    <router-link target="_blank" :to="{name: 'register'}" style="color:red;font-size: 12px;">
                        {{$t('message.userAgreementPrivacyStatement')}}</router-link>
                </el-radio>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="danger" round v-on:click="register('registerForm')" style="width:100%;" size="large">{{$t('message.signUp')}}</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                <span>{{$t('message.hasAccount')}}?&nbsp;&nbsp;</span>
                <router-link :to="{name: 'login'}" style="color:red;font-size: 12px;">{{$t('message.signIn')}}</router-link>
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
                registerInfo: {
                    uname: null,
                    pwd: null,
                    name: null,
                    email: null,
                    tosSelect: null
                },
                loading: false,
                loginInfo: null,
                tosSelect: false,
                rules: {
                    uname: [
                        { required: true, message: this.$t('message.loginNameRequired'), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$t('message.emailRequired'), trigger: 'blur', pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+'}
                    ],
                    name: [
                        {required: true, message: this.$t('message.nameRequired'), trigger: 'blur' }
                    ],
                    pwd: [
                        {required: true, message: this.$t('message.passwordRequireTip'), trigger: 'blur', pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{6,30}$'}
                    ],
                    tosSelect: [
                        {required: true, message: this.$t('message.userAgreementPrivacyStatementRequired'), trigger: 'change' }
                    ],
                }
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'display:block;')
        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('style')
        },
        methods: {
            register(formName) {
                let _this = this
                _this.loading = true
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiUtil.api.post(apiUtil.urls.sign.new, _this.registerInfo).then(data => {
                            _this.loading = false
                            console.log(data)
                            apiUtil.message.success(_this.$t('message.registerSuccess'))
                            _this.$router.push({
                                name: 'verify',
                                params: {
                                    uname: _this.registerInfo.uname
                                }
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
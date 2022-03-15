<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 380px;padding: 42px;margin-top:100px;"
             :label-position="left"
             label-width="80px"
             :rules="rules"
             :model="registerInfo"
             ref="registerForm">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>注册帐号</h1>
            </div>
        </el-form-item>
        <el-form-item prop="uname" label="用户名">
            <el-input
                    v-model="registerInfo.uname"
                    class="w-50 m-2"
                    size="large"
                    placeholder="用户名"
            />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input
                    v-model="registerInfo.email"
                    class="w-50 m-2"
                    size="large"
                    placeholder="邮箱"
            />
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
            <el-input
                    v-model="registerInfo.name"
                    class="w-50 m-2"
                    size="large"
                    placeholder="真实姓名"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 5px;" prop="pwd" label="密码">
            <el-input
                    v-model="registerInfo.pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    placeholder="密码"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" prop="tosSelect">
            <div style="text-align: left;font-size: 12px;width:100%;">
                <el-radio v-model="registerInfo.tosSelect" label="1" size="large">
                    阅读并接受
                    <router-link target="_blank" :to="{name: 'register'}" style="color:red;font-size: 12px;">用户协议和隐私保护声明</router-link>
                </el-radio>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="danger" round v-on:click="register('registerForm')" style="width:100%;" size="large">注册</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                <span>已有帐号?&nbsp;&nbsp;</span>
                <router-link :to="{name: 'login'}" style="color:red;font-size: 12px;">登录</router-link>
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
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur', pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+'}
                    ],
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur', pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{6,30}$'}
                    ],
                    tosSelect: [
                        {required: true, message: '请同意用户协议和隐私保护声明', trigger: 'change' }
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
                            apiUtil.message.success('注册成功')
                            _this.$router.push({
                                name: 'verify',
                                params: {
                                    uname: _this.verifyInfo.uname
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
                // const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                // const passwordPattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,30}$/
                // if (!mailReg.test(this.registerInfo.email)) {
                //     this.loginInfo = "请输入有效的邮箱"
                //     return
                // }
                // if (!passwordPattern.test(this.registerInfo.pwd)) {
                //     this.loginInfo = "密码必须包含6个以上的小写字母、大写字母、数字和特殊字符"
                //     return
                // }
                // if(!this.tosSelect){
                //     this.loginInfo = "请同意用户协议和隐私保护声明"
                //     return;
                // }
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
<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 380px;padding: 42px;margin-top:100px;"
             :label-position="left"
             label-width="80px"
             :rules="rules"
             :model="verifyInfo"
             ref="verifyForm">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>邮箱验证</h1>
            </div>
        </el-form-item>
        <el-form-item prop="uname" label="用户名">
            <el-input
                    v-model="verifyInfo.uname"
                    class="w-50 m-2"
                    size="large"
                    disabled
            />
        </el-form-item>
        <el-form-item prop="code" label="验证码">
            <el-input
                    v-model="verifyInfo.code"
                    class="w-50 m-2"
                    size="large"
                    placeholder="请输入邮箱收到的验证码"
            />
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="danger" round v-on:click="verify('verifyForm')" style="width:100%;" size="large">校验</el-button>
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
                            apiUtil.message.success('校验成功')
                            _this.$router.push('/login')
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
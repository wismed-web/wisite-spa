<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 380px;padding: 42px;margin-top:100px;">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>Create a Wisite free account</h1>
            </div>
        </el-form-item>
        <el-form-item>
            <el-input
                    v-model="uname"
                    class="w-50 m-2"
                    size="large"
                    placeholder="Username"
            />
        </el-form-item>
        <el-form-item>
            <el-input
                    v-model="email"
                    class="w-50 m-2"
                    size="large"
                    placeholder="Email"
            />
        </el-form-item>
        <el-form-item>
            <el-input
                    v-model="name"
                    class="w-50 m-2"
                    size="large"
                    placeholder="Nick name"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 5px;">
            <el-input
                    v-model="pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    placeholder="Password"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;">
            <div style="text-align: left;font-size: 12px;width:100%;">
                <el-radio v-model="tosSelect" label="1" size="large">
                    By signing up, I agree to Wisite
                    <router-link target="_blank" :to="{name: 'register'}" style="color:red;font-size: 12px;">Terms of Service</router-link>
                </el-radio>
            </div>
        </el-form-item>
        <el-form-item>
            <div style="height: 32px;width:100%;">
                <span style="color:red;">{{loginInfo}}</span>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" round v-on:click="register" style="width:100%;" size="large">Register</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                <span>Don't have an account?&nbsp;&nbsp;</span>
                <router-link :to="{name: 'login'}" style="color:red;font-size: 12px;">Sign up</router-link>
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
                uname: 'xiaopeng',
                email: 'zhangxiao_peng@163.com',
                name: 'xiaopeng',
                pwd: 'Abcdef,2022',
                loginInfo: null,
                tosSelect: false
            }
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'display:block;')
        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('style')
        },
        methods: {
            register() {
                if(!this.tosSelect){
                    this.loginInfo = "Please agree to Wisite Terms of Service"
                    return;
                }
                if (!this.uname) {
                    this.loginInfo = "Please enter username"
                    return
                }
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                const passwordPattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,30}$/
                if (!mailReg.test(this.email)) {
                    this.loginInfo = "Please enter valid email"
                    return
                }
                if (!passwordPattern.test(this.pwd)) {
                    this.loginInfo = "Password >=6 letter with UPPER,LOWER,0-9,symbol"
                    return
                }
                this.loginInfo = null
                apiUtil.api.post(apiUtil.urls.sign.new, {
                    uname: this.uname,
                    pwd: this.pwd,
                    name: this.name,
                    email: this.email
                }).then(data => {
                        console.log(data)
                        apiUtil.message.success('Register success')
                        this.$router.push('/home')
                    })
                    .catch(error => {
                        console.log(error)
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
        background-size: cover
    }
    div#app {
        margin-top: 60px;
    }
</style>f
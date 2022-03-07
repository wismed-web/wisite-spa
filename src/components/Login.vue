<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 380px;padding: 42px;margin-top:100px;">
        <el-form-item>
            <div style="font-weight: bold;">
                <h1>Sign in to Wisite</h1>
            </div>
        </el-form-item>
        <el-form-item>
            <el-input
                    v-model="uname"
                    class="w-50 m-2"
                    size="large"
                    placeholder="Username or Email"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;">
            <el-input
                    v-model="pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    placeholder="Password"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
            <router-link :to="{name: 'register'}">Forgot password?</router-link>
        </el-form-item>
        <el-form-item style="height: 32px;">
            <span style="color:red;font-size: 12px;width:100%;">{{loginInfo}}</span>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" round v-on:click="login" size="large" style="font-size: 16px;width:100%;">Sign in</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                Don't have an account?&nbsp;&nbsp;<router-link :to="{name: 'register'}" style="color:red;">Sign up</router-link>
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
                loginInfo: null
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
                console.log(event)
                if (!this.uname) {
                    this.loginInfo = "Please enter username or email"
                    return
                }
                if (!this.pwd) {
                    this.loginInfo = "Please enter password"
                    return
                }
                this.loginInfo = null
                apiUtil.api.post(apiUtil.urls.sign.signin, {uname: this.uname, pwd: this.pwd})
                    .then(data => {
                        apiUtil.message.success('Login success')
                        this.$store.dispatch('setToken', data.token)
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
        background-size: cover;
    }
    #app {
        margin-top: 60px;
    }
</style>
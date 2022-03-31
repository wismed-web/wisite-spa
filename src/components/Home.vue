<template>
    <el-row class="tac" style="margin-bottom: 0px;">
        <el-col :span="3" style="background-color: #565B67;">
            <el-row style="height: 68px;margin: 0px;">
                <div style="color:white;width: 100%;line-height: 68px;font-size: 18px;font-weight: bold;">Wisite</div>
            </el-row>
            <el-menu
                    active-text-color="#ffd04b"
                    background-color="#4A4E58"
                    class="el-menu-vertical-demo"
                    unique-opened="true"
                    router="true"
                    default-active="2"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    :style="{ height: `${elementHeight}px` }">
                <el-menu-item index="/home/profile">
                    <el-icon><setting/></el-icon>
                    <span>{{$t('message.userInfo')}}</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="21">
            <el-row style="height: 68px;margin: 0px;background-color: white;text-align: right;">
<!--                <el-col :span="1" :offset="23" style="padding:7px;">-->
<!--                    <el-avatar :size="50" :src="profile.avatar">-->

<!--                    </el-avatar>-->
<!--                </el-col>-->
                <el-button @click="logout" round type="danger" style="position: absolute;top:15px;right:90px;">{{$t('message.logout')}}</el-button>
            </el-row>
            <el-row :style="{ padding: '10px', marginBottom: '0px'}">
                <router-view></router-view>
            </el-row>
        </el-col>
    </el-row>

</template>

<script>
    import apiUtil from '../util/apiUtil'
    import {Setting} from '@element-plus/icons-vue'

    export default {
        name: "Home",
        components: {
            Setting,
        },
        props:['Name'],
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'margin:0px;background:none;display:block;background-color:#EBEDF0')

        },
        beforeUnmount () {
            document.querySelector('body').removeAttribute('style')
        },
        data() {
            return {
                elementHeight: 50,
                innerHeight: 30,
                showAvatarFlag: false,
                image: null,
                pic: null,
                profile: {
                }
            }
        },
        methods: {
            logout () {
                let _this = this
                apiUtil.api.get(apiUtil.urls.sign.signout)
                    .then(res => {
                        console.log(res)
                        apiUtil.message.success(_this.$t('message.logoutSuccess'))
                        apiUtil.util.clearToken()
                        _this.$router.push('/login')
                    }).catch(error => {
                        apiUtil.message.error(_this.$t('message.logoutFail')+error)
                })
            },
            handleOpen () {
                console.log('handleOpen.')
            },
            showAvatar () {
                this.showAvatarFlag = true
            },
            beforeAvatarUpload (file) {
                let This = this
                console.log(file)
                if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
                    apiUtil.message.error('support image type:jpeg、jpg、png')
                    return false
                }
                //转化为blob
                let reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    This.pic = String(reader.result)
                }
            },
            selectImg (e) {
                let file = e.target.files[0]
                if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
                    this.$message({
                        message: this.$t('message.imageTypeLimit'),
                        type: "error"
                    });
                    return false
                }
                //转化为blob
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    this.option.img = data
                }
            },
        },
        mounted:function () {
            this.$nextTick(() => {
                this.elementHeight = window.innerHeight - 68
                this.innerHeight = this.elementHeight - 20
                let context = this;
                window.onresize = () => {
                    context.elementHeight = window.innerHeight - 68
                    context.innerHeight = context.elementHeight - 20
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .cropper-content{
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        .cropper-box{
            flex: 1;
            width: 100%;
            .cropper{
                width: auto;
                height: 300px;
            }
        }

        .show-preview{
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            .preview{
                overflow: hidden;
                border:1px solid #67c23a;
                background: #cccccc;
            }
        }
    }
    .footer-btn{
        margin-top: 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        .scope-btn{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            padding-right: 10px;
        }
        .upload-btn{
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
        }
        .btn {
            outline: none;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            -webkit-appearance: none;
            text-align: center;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            outline: 0;
            -webkit-transition: .1s;
            transition: .1s;
            font-weight: 500;
            padding: 8px 15px;
            font-size: 12px;
            border-radius: 3px;
            color: #fff;
            background-color: #409EFF;
            border-color: #409EFF;
            margin-right: 10px;
        }
    }
    .el-menu-vertical-demo {
        border: 0px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>用户信息</span>
            </div>
        </template>
        <el-row>
            <el-col :span="16">
                <el-form label-position="right"
                         label-width="100px">
                    <el-form-item label="用户名">
                        <el-input v-model="profile.uname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input v-model="profile.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="profile.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="profile.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <el-input v-model="profile.regtime" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <el-avatar shape="square" :size="150" :src="profile.avatar" @click="showAvatarFlag=true">

                    </el-avatar>
                </div>
                <div class="block" style="text-align: left;padding:5px;">
                    <el-tag
                            :key="tag"
                            v-for="tag in tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="addTagFlag"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <el-dialog v-model="showAvatarFlag" title="更新头像">
        <el-form>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-success="handleAvatarSuccess"
                        :on-change="beforeAvatarUpload">
<!--                    <el-icon class="avatar-uploader-icon"><plus/></el-icon>-->
                    <el-button type="primary" round>选择文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>

            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span="10">
                        <vue-picture-cropper
                        :boxStyle="{
                          width: '400px',
                          height: '400px',
                          backgroundColor: '#f8f8f8',
                          margin: 'auto'
                        }"
                        :img="pic"
                        :options="{
                          viewMode: 1,
                          dragMode: 'crop',
                          aspectRatio: 1,
                          preview: preview,
                        }"
                        @ready="ready"
                        />
                    </el-col>
                    <el-col :span="10" :offset="3">
                        <img v-if="imageUrl" width="400" height="400" :src="imageUrl" class="avatar" />
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cropperImage" round>裁剪</el-button>
                <el-button @click="cropperConfirm" round>确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
    import { ElUpload } from 'element-plus'
    import VuePictureCropper, { cropper } from 'vue-picture-cropper'
    import apiUtil from "../util/apiUtil";
    console.log(cropper)
    export default {
        name: "Profile",
        components: {
            ElUpload,
            VuePictureCropper,
        },
        data() {
            return {
                profile: {
                    "active": "T",
                    "uname": "admin",
                    "email": "admin@admin.com",
                    "name": "admin",
                    "password": "pa55w0rd@WISMED",
                    "regtime": "2022-03-08T14:41:44Z",
                    "phone": "",
                    "addr": "",
                    "role": "",
                    "level": "",
                    "expire": "",
                    "nationalid": "",
                    "gender": "",
                    "position": "",
                    "title": "",
                    "employer": "",
                    "tags": "",
                    "avatartype": "",
                    "avatar": "https://webix.com/demos/admin-app/data/images/morgan_yu.jpg"
                },
                tags: ['学习', '游泳', '看书'],
                addTagFlag: false,
                inputValue: '',
                showAvatarFlag: false,
                image: null,
                pic: null,
                imageUrl: null,
                avatarFile: null
            }
        },
        methods: {
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1)
            },
            showInput() {
                this.addTagFlag = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },
            handleInputConfirm() {
                let inputValue = this.inputValue
                if (inputValue) {
                    this.tags.push(inputValue)
                }
                this.addTagFlag = false
                this.inputValue = ''
            },
            handleOpen () {

            },
            showAvatar () {
                this.showAvatarFlag = true
            },
            async cropperConfirm () {
                const file = await cropper.getFile({
                    fileName: 'header',
                })
                this.avatarFile = file
                this.showAvatarFlag = false
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
                        message: '图片类型要求：jpeg、jpg、png',
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
            cropperImage () {
                // 获取生成的base64图片地址
                const base64 = cropper.getDataURL()
                this.imageUrl = this.profile.avatar = base64
            },
            //上传图片
            uploadImg () {
                // let _this = this;
                // let base64 = cropper.getDataURL()
                // let blob = cropper.getBlob()
                // let formData = new FormData();
                // formData.append('file',data,"header.jpg")
                // //调用axios上传
                // apiUtil.post(apiUtil.urls.file.upload, formData)
                //     .then(res => {
                //         apiUtil.message.success("上传成功")
                //     }).catch(error => {
                //     apiUtil.message.error(error)
                // })
            }
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
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        width: 680px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 5px;
        height: 32px;
        line-height: 30px;
        padding-top: 0px;
        padding-bottom: 0;
        margin-top:10px;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>
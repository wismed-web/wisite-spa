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
                         label-width="100px"
                         :rules="rules"
                         :model="profile"
                         ref="profileForm">
                    <el-form-item label="用户名" prop="uname">
                        <el-input v-model="profile.uname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="name">
                        <el-input v-model="profile.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="profile.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="profile.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <el-input v-model="profile.regtime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="profile.addr"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="profile.gender" placeholder="--请选择--" style="width:100%;">
                            <el-option
                                    v-for="item in genders"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="官方身份">
                        <el-select v-model="profile.official" placeholder="--请选择--" style="width:100%;">
                            <el-option
                                    v-for="item in officialStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateProfile('profileForm')" style="width:100%;"
                                   :loading="loading">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <el-avatar shape="square" :size="150" :src="avatarBase64">

                    </el-avatar>
                </div>
                <div>
                    <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-success="handleAvatarSuccess"
                            :on-change="beforeAvatarUpload">
                        <el-button type="primary" round>选择文件</el-button>
                    </el-upload>
                </div>
                <div class="block" style="text-align: left;padding:5px;height: 200px;padding-left:28px;">
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
                <div>
                    <el-button @click="logout" round type="danger">退出登录</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>
<!--    <el-dialog v-model="showAvatarFlag" title="更新头像">-->
<!--        <el-form>-->
<!--            <el-form-item>-->
<!--                <el-upload-->
<!--                        class="avatar-uploader"-->
<!--                        :show-file-list="false"-->
<!--                        :auto-upload="false"-->
<!--                        :on-success="handleAvatarSuccess"-->
<!--                        :on-change="beforeAvatarUpload">-->
<!--                    <el-button type="primary" round>选择文件</el-button>-->
<!--                </el-upload>-->
<!--&lt;!&ndash;                <el-button @click="cropperImage" round>裁剪</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button @click="cropperConfirm" round>更新</el-button>&ndash;&gt;-->
<!--            </el-form-item>-->
<!--&lt;!&ndash;            <el-form-item>&ndash;&gt;-->

<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-row>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-col :span="10">&ndash;&gt;-->
<!--&lt;!&ndash;                        <vue-picture-cropper&ndash;&gt;-->
<!--&lt;!&ndash;                        :boxStyle="{&ndash;&gt;-->
<!--&lt;!&ndash;                          width: '400px',&ndash;&gt;-->
<!--&lt;!&ndash;                          height: '400px',&ndash;&gt;-->
<!--&lt;!&ndash;                          backgroundColor: '#f8f8f8',&ndash;&gt;-->
<!--&lt;!&ndash;                          margin: 'auto'&ndash;&gt;-->
<!--&lt;!&ndash;                        }"&ndash;&gt;-->
<!--&lt;!&ndash;                        :img="pic"&ndash;&gt;-->
<!--&lt;!&ndash;                        :options="{&ndash;&gt;-->
<!--&lt;!&ndash;                          viewMode: 1,&ndash;&gt;-->
<!--&lt;!&ndash;                          dragMode: 'crop',&ndash;&gt;-->
<!--&lt;!&ndash;                          aspectRatio: 1,&ndash;&gt;-->
<!--&lt;!&ndash;                          preview: preview,&ndash;&gt;-->
<!--&lt;!&ndash;                        }"&ndash;&gt;-->
<!--&lt;!&ndash;                        @ready="ready"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-col :span="10" :offset="3">&ndash;&gt;-->
<!--&lt;!&ndash;                        <img v-if="imageUrl" width="400" height="400" :src="imageUrl" class="avatar" />&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-row>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--        </el-form>-->
<!--        <template #footer>-->
<!--            <span class="dialog-footer">-->
<!--                <el-button @click="showAvatarFlag == false" round>关闭</el-button>-->
<!--            </span>-->
<!--        </template>-->
<!--    </el-dialog>-->
</template>

<script>
    import { ElUpload } from 'element-plus'
    import VuePictureCropper, { cropper } from 'vue-picture-cropper'
    import apiUtil from "../util/apiUtil";
    console.log(cropper)
    console.log(VuePictureCropper)
    export default {
        name: "Profile",
        components: {
            ElUpload,
            // VuePictureCropper,
        },
        data() {
            return {
                loading: false,
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
                    "official": null,
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
                avatarFile: null,
                genders: [
                    {value: 'F', label: '男'},
                    {value: 'M', label: '女'}
                ],
                officialStatus: [
                    {value: 'T', label: '是'},
                    {value: 'F', label: '否'}
                ],
                rules: {
                    uname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                }
            }
        },
        computed:{
            avatarBase64() {
                return 'data:'+this.profile.avatartype+';base64,' + this.profile.avatar
            }
        },
        mounted(){
            let _this = this
            apiUtil.api.get(apiUtil.urls.user.profile)
                .then(res => {
                    _this.profile = res
                    _this.tags = []
                    if(res.tags){
                        _this.tags = res.tags.split(',')
                    }
                }).catch(error => {
                apiUtil.message.error(error)
            })
        },
        methods: {
            logout () {
                let _this = this
                apiUtil.api.get(apiUtil.urls.sign.signout)
                    .then(res => {
                        console.log(res)
                        apiUtil.message.success('退出成功')
                        apiUtil.util.clearToken()
                        _this.$router.push('/login')
                    }).catch(error => {
                    apiUtil.message.error('退出失败，失败原因:'+error)
                })
            },
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1)
            },
            showInput() {
                this.addTagFlag = true
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
                // let _this = this
                // let formData = new FormData()
                // formData.append('note', '')
                // formData.append('group0', '')
                // formData.append('group1', '')
                // formData.append('group2', '')
                // formData.append('file', _this.avatarFile)
                // apiUtil.api.upload(apiUtil.urls.file.upload, formData)
                //     .then(res => {
                //         console.log(res)
                //         apiUtil.message.success("更新成功")
                //     }).catch(error => {
                //         apiUtil.message.error(error)
                // })
            },
            beforeAvatarUpload (file) {
                let This = this
                if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
                    apiUtil.message.error('support image type:jpeg、jpg、png')
                    return false
                }
                //转化为blob
                let reader = new FileReader()
                reader.readAsDataURL(file.raw)
                This.avatarFile = file
                reader.onload = () => {
                    This.pic = String(reader.result)
                    // This.avatarBase64 = This.pic
                    This.profile.avatartype = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length)
                    This.profile.avatar=This.pic.substring(This.pic.indexOf(',')+1)
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
            updateProfile (formName) {
                let _this = this
                _this.loading = true
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData()
                        for(let key in _this.profile){
                            if(key === 'tags'){
                                formData.append('tags', this.tags.join(','))
                            }else if(key === 'avatar'){
                                formData.append('avatar', _this.avatarFile)
                            }else{
                                formData.append(key, _this.profile[key])
                            }
                        }
                        apiUtil.api.upload(apiUtil.urls.user.setprofile, formData)
                            .then(res => {
                                _this.loading = false
                                console.log(res)
                                apiUtil.message.success("更新成功")
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
    .el-button .custom-loading .circular {
        margin-right: 6px;
        width: 18px;
        height: 18px;
        animation: loading-rotate 2s linear infinite;
    }
    .el-button .custom-loading .circular .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: var(--el-button-text-color);
        stroke-linecap: round;
    }

</style>
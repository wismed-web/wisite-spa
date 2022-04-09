<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{$t('message.userInfo')}}</span>
            </div>
        </template>
        <el-row>
            <el-form label-position="right"
                     label-width="120px"
                     :rules="rules"
                     :model="profile"
                     ref="profileForm"
                     style="width:100%;">
                <el-col :span="10" style="width:100%;">
                    <el-form-item :label="$t('message.loginName')" prop="uname">
                        <el-input v-model="profile.uname" disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('message.email')" prop="email">
                        <el-input v-model="profile.email" disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('message.dob')" prop="dob">
                        <el-date-picker v-model="profile.dob" type="date" style="width:100%;"/>
                    </el-form-item>

                    <el-form-item :label="$t('message.country')">
                        <el-input v-model="profile.country"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.addr')">
                        <el-input v-model="profile.addr"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.position')">
                        <el-input v-model="profile.position"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.title')">
                        <el-input v-model="profile.title"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.official')">
                        <el-select v-model="profile.official" disabled="true" :placeholder="$t('message.select')" style="width:100%;">
                            <el-option
                                    v-for="item in officialStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div>
                            <span>{{profile.official}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item :label="$t('message.memberDays')">
                        <el-input v-model="profile.memberDays" disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" style="width:100%;">
                    <el-form-item :label="$t('message.realName')" prop="name">
                        <el-input v-model="profile.name" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.gender')">
                        <el-select v-model="profile.gender" :placeholder="$t('message.select')" style="width:100%;">
                            <el-option
                                    v-for="item in genders"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="$t('message.phone')">
                        <el-input v-model="profile.phone"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('message.city')">
                        <el-input v-model="profile.city"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.nationalid')">
                        <el-input v-model="profile.nationalid"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.employer')">
                        <el-input v-model="profile.employer"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('message.bio')">
                        <el-input
                                v-model="profile.bio"
                                rows="6"
                                type="textarea"
                                maxlength="100"
                                show-word-limit/>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:100%;">
                    <div class="block">
                        <el-avatar shape="square" :size="150" :src="avatar">

                        </el-avatar>
                    </div>
                    <div>
                        <el-upload
                                class="avatar-uploader"
                                ref="avatarFile"
                                :show-file-list="false"
                                :auto-upload="false"
                                action=""
                                :on-change="beforeAvatarUpload">
                            <el-button type="primary" round>{{$t('message.selectFile')}}</el-button>
                        </el-upload>
                    </div>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-form style="width:100%;">
                <el-form-item style="width: 100%;">
                    <el-button type="primary" round @click="updateProfile('profileForm')" style="width:84%;"
                               :loading="loading">{{$t('message.update')}}</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-card>
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
                readonlyItems: ['uname', 'name', 'email'],
                profile: {
                    "active": "T",
                    "uname": "admin",
                    "email": "admin@admin.com",
                    "name": "admin",
                    "password": "pa55w0rd@WISMED",
                    "phone": "",
                    "addr": "",
                    "role": "",
                    "level": "",
                    "official": null,
                    "expire": "",
                    "nationalid": "",
                    "gender": "",
                    "country": null,
                    "city": null,
                    "position": "",
                    "title": "",
                    "employer": "",
                    "tags": "",
                    "dob": null,
                    "avatartype": "",
                    "memberDays": null,
                    "avatar": "https://webix.com/demos/admin-app/data/images/morgan_yu.jpg"
                },
                avatar: null,
                tags: ['学习', '游泳', '看书'],
                addTagFlag: false,
                inputValue: '',
                showAvatarFlag: false,
                image: null,
                pic: null,
                imageUrl: null,
                avatarFile: null,
                genders: [
                    {value: 'F', label: this.$t('message.female')},
                    {value: 'M', label: this.$t('message.male')}
                ],
                officialStatus: [
                    {value: 'T', label: this.$t('message.yes')},
                    {value: 'F', label: this.$t('message.no')}
                ],
                rules: {
                    uname: [
                        { required: true, message: this.$t('message.loginNameRequired'), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$t('message.emailRequired'), trigger: 'blur' }
                    ],
                    name: [
                        {required: true, message: this.$t('message.nameRequired'), trigger: 'blur' }
                    ],
                }
            }
        },
        // computed:{
        //     avatarBase64() {
        //         return 'data:'+this.profile.avatartype+';base64,' + this.profile.avatar
        //     }
        // },
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
            apiUtil.api.get(apiUtil.urls.user.avatar)
                .then(res => {
                    _this.avatar = res.src
                }).catch(error => {
                    console.log(error)
            })
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
            // handleClose(tag) {
            //     this.tags.splice(this.tags.indexOf(tag), 1)
            // },
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
                let _this = this
                if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
                    apiUtil.message.error('support image type:jpeg、jpg、png')
                    return false
                }
                //转化为blob
                let reader = new FileReader()
                reader.readAsDataURL(file.raw)
                _this.avatarFile = file
                reader.onload = () => {
                    _this.pic = String(reader.result)
                    _this.avatar = _this.pic
                    _this.avatarBase64 = _this.pic
                    _this.profile.avatartype = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length)
                    _this.profile.avatar=_this.avatar
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
                            if(_this.readonlyItems.indexOf(key) > -1) {
                                continue
                            }
                            if(key === 'tags'){
                                formData.append('tags', this.tags.join(','))
                            }else if(key === 'avatar' && _this.avatarFile && _this.avatarFile.raw){
                                formData.append('avatar', _this.avatarFile.raw)
                            }else{
                                formData.append(key, _this.profile[key])
                            }
                        }
                        apiUtil.api.upload(apiUtil.urls.user.setprofile, formData)
                            .then(res => {
                                _this.loading = false
                                console.log(res)
                                apiUtil.message.success(_this.$t('message.updateSuccess'))
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
        width: 90%;
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
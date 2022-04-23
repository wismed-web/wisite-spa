<template>
    <el-row style="width:100%;">
        <el-col :span="6" style="margin-right: 10px;">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-weight: bold">{{$t('message.onlineUser')}}</span>
                    </div>
                </template>
                <div>
                    <el-table
                            stripe="true"
                            header-align="center"
                            align="center"
                            :border="true"
                            style="width:60%;margin-left: 70px;"
                            :data="onlines">
                        <el-table-column
                                prop="index"
                                align="center"
                                :label="$t('message.index')"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                :label="$t('message.loginName')"
                                width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
        <el-col :span="14">
            <el-card class="box-card" style="width:100%;">
                <template #header>
                    <div class="card-header">
                        <span style="font-weight: bold">{{$t('message.userManage')}}</span>
                    </div>
                </template>
                <el-row style="width:75%;margin-left: 120px;">
                    <el-table
                            align="center"
                            stripe="true"
                            border="true"
                            header-align="center"
                            style="width:100%;"
                            :data="allUsers">
                        <el-table-column
                                prop="index"
                                :label="$t('message.index')"
                                align="center"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="uname"
                                align="center"
                                :label="$t('message.loginName')"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                align="center"
                                :label="$t('message.email')"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                align="center"
                                :label="$t('message.phone')"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                :label="$t('message.operation')"
                                align="center"
                                width="75">
                            <template #default="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$t('message.edit')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="editUserVisible" :title="$t('message.editUserInfoTitle')" center>
        <el-form label-position="right"
                 label-width="120px"
                 :rules="rules"
                 :model="profile"
                 ref="profileForm"
                 style="width:100%;height:420px;">
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
                    <el-input v-model="profile.official" disabled="true"></el-input>
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
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editUserVisible = false">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="editUser('profileForm')">{{$t('message.confirm')}}</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script>
    import apiUtil from "../util/apiUtil";
    export default {
        name: "Admin",
        data() {
            return {
                elementHeight: 50,
                innerHeight: 30,
                onlines: [
                ],
                allUsers: [

                ],
                editUserVisible: false,
                profile: {}
            }
        },
        methods: {
            handleEdit (index, row) {
                this.profile = row
                this.editUserVisible = true
            },
            editUser () {

            }
        },
        mounted() {
            let _this = this
            apiUtil.api.get(apiUtil.urls.admin.onlines)
                .then(res => {
                    _this.onlines = []
                    let index = 1
                    for(let i in res){
                        _this.onlines.push({index: index++, name: res[i]})
                    }
                }).catch(error => {
                    apiUtil.message.error(error)
            })
            apiUtil.api.get(apiUtil.urls.admin.users)
                .then(res => {
                    _this.allUsers = []
                    let index = 1
                    for(let i in res){
                        res[i]['index'] = index++
                        _this.allUsers.push(res[i])
                    }
                }).catch(error => {
                apiUtil.message.error(error)
            })
        }
    }
</script>

<style scoped>

</style>
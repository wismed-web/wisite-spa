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
                    <el-row>
                        <el-col :span="12">
                            <el-input
                                    v-model="searchOnlineName"
                                    class="w-50 m-2"
                                    :placeholder="$t('message.searchOnlineNameTip')">
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" round @click="triggerSearchOnline">{{$t('message.search')}}</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            stripe="true"
                            header-align="center"
                            align="center"
                            :border="true"
                            :data="onlines">
                        <el-table-column
                                prop="index"
                                align="center"
                                :label="$t('message.index')">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                :label="$t('message.loginName')">
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
                <el-row style="width:100%;">
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="searchUserInfo.name" :placeholder="$t('message.searchUserNameTip')"></el-input>
                        </el-col>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <el-col :span="6">
                            <el-input v-model="searchUserInfo.uname" :placeholder="$t('message.searchUserUnameTip')"></el-input>
                        </el-col>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <el-col :span="6">
                            <el-select v-model="searchUserInfo.active" :placeholder="$t('message.searchUserActiveTip')" style="width:100%;">
                                <el-option
                                        v-for="item in officialStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" round @click="triggerSearchUser">{{$t('message.search')}}</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            align="center"
                            stripe="true"
                            border="true"
                            header-align="center"
                            :data="allUsers">
                        <el-table-column
                                prop="index"
                                :label="$t('message.index')"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="uname"
                                align="center"
                                :label="$t('message.loginName')">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                :label="$t('message.realName')">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                align="center"
                                :label="$t('message.email')">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                align="center"
                                :label="$t('message.phone')">
                        </el-table-column>
                        <el-table-column
                                :label="$t('message.operation')"
                                align="center">
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
                 style="width:100%;height:520px;">
            <el-col :span="10" style="width:100%;">
                <el-form-item :label="$t('message.loginName')" prop="uname">
                    <el-input v-model="profile.uname" disabled="true"></el-input>
                </el-form-item>

                <el-form-item :label="$t('message.email')" prop="email">
                    <el-input v-model="profile.email" disabled="true"></el-input>
                </el-form-item>

                <el-form-item :label="$t('message.dob')" prop="dob">
                    <el-date-picker v-model="profile.dob" type="date" disabled="true" style="width:100%;"/>
                </el-form-item>

                <el-form-item :label="$t('message.country')">
                    <el-input v-model="profile.country" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.addr')">
                    <el-input v-model="profile.addr" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.position')">
                    <el-input v-model="profile.position" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.title')">
                    <el-input v-model="profile.title" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.official')">
                    <el-select v-model="profile.official" style="width:100%;">
                        <el-option
                                v-for="item in officialStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.memberDays')">
                    <el-input v-model="profile.memberDays" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.level')">
                    <el-select v-model="profile.level" style="width:100%;">
                        <el-option
                                v-for="item in levels"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.active')">
                    <el-select v-model="profile.active" style="width:100%;">
                        <el-option
                                v-for="item in officialStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="width:100%;">
                <el-form-item :label="$t('message.realName')" prop="name">
                    <el-input v-model="profile.name" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.gender')">
                    <el-select v-model="profile.gender" disabled="true" :placeholder="$t('message.select')" style="width:100%;">
                        <el-option
                                v-for="item in genders"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('message.phone')">
                    <el-input v-model="profile.phone" disabled="true"></el-input>
                </el-form-item>

                <el-form-item :label="$t('message.city')">
                    <el-input v-model="profile.city" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.nationalid')">
                    <el-input v-model="profile.nationalid" disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.employer')">
                    <el-input v-model="profile.employer" disabled="true"></el-input>
                </el-form-item>

                <el-form-item :label="$t('message.bio')">
                    <el-input
                            v-model="profile.bio"
                            rows="6"
                            type="textarea"
                            maxlength="100"
                            show-word-limit
                            disabled="true"/>
                </el-form-item>
                <el-form-item :label="$t('message.certified')">
                    <el-select v-model="profile.certified" style="width:100%;">
                        <el-option
                                v-for="item in officialStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.role')">
                    <el-input v-model="profile.role" disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" style="width:100%;">
                <div class="block">
                    <el-avatar shape="square" :size="150" :src="avatar">

                    </el-avatar>
                </div>
<!--                <div>-->
<!--                    <el-upload-->
<!--                            class="avatar-uploader"-->
<!--                            ref="avatarFile"-->
<!--                            :show-file-list="false"-->
<!--                            :auto-upload="false"-->
<!--                            action=""-->
<!--                            :on-change="beforeAvatarUpload">-->
<!--                        <el-button type="primary" round>{{$t('message.selectFile')}}</el-button>-->
<!--                    </el-upload>-->
<!--                </div>-->
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
                profile: {},
                officialStatus: [
                    {value: true, label: this.$t('message.yes')},
                    {value: false, label: this.$t('message.no')}
                ],
                levels: [
                    {value: '1', label: this.$t('message.level1')},
                    {value: '2', label: this.$t('message.level2')},
                    {value: '3', label: this.$t('message.level3')},
                    {value: '4', label: this.$t('message.level4')}
                ],
                searchOnlineName: null,
                searchUserInfo: {}
            }
        },
        methods: {
            handleEdit (index, row) {
                this.profile = row
                this.editUserVisible = true
            },
            editUser () {

            },
            triggerSearchOnline () {
                this.searchOnline(this.searchOnlineName)
            },
            searchOnline (name) {
                let _this = this
                let data = null
                if(name) {
                    data = {uname: name}
                }
                apiUtil.api.get(apiUtil.urls.admin.onlines, data)
                    .then(res => {
                        _this.onlines = []
                        let index = 1
                        for(let i in res){
                            _this.onlines.push({index: index++, name: res[i]['Uname']})
                        }
                    }).catch(error => {
                    apiUtil.message.error(error)
                })
            },
            searchUser (data) {
                let _this = this
                apiUtil.api.get(apiUtil.urls.admin.users, data)
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
            },
            triggerSearchUser () {
                this.searchUser({
                    name: this.searchUserInfo.name,
                    uname: this.searchUserInfo.uname,
                    active: this.searchUserInfo.active
                })
            }
        },
        mounted() {
            let _this = this
            _this.searchOnline()
            _this.searchUser(null)
        }
    }
</script>

<style scoped>

</style>
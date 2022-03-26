<template>
    <el-form style="margin:0 auto;background-color: #fff;width: 480px;padding: 42px;margin-top:100px;"
             :label-position="left"
             label-width="100px"
             :rules="rules"
             :model="registerInfo"
             ref="registerForm">
        <div style="font-weight: bold;text-align: left;">
            <h1>{{$t('message.signUp')}}</h1>
        </div>
        <el-form-item prop="uname" :label="$t('message.loginName')">
            <el-input
                    v-model="registerInfo.uname"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.loginName')"
            />
        </el-form-item>
        <el-form-item prop="email" :label="$t('message.email')">
            <el-input
                    v-model="registerInfo.email"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.email')"
            />
        </el-form-item>
        <el-form-item prop="name" :label="$t('message.realName')">
            <el-input
                    v-model="registerInfo.name"
                    class="w-50 m-2"
                    size="large"
                    :placeholder="$t('message.realName')"
            />
        </el-form-item>
        <el-form-item style="margin-bottom: 5px;" prop="pwd" :label="$t('message.password')">
            <el-input
                    v-model="registerInfo.pwd"
                    size="large"
                    type="password"
                    class="w-50 m-2"
                    :placeholder="$t('message.password')"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" prop="tosSelect">
            <div style="text-align: left;font-size: 12px;width:100%;">
                <el-radio v-model="registerInfo.tosSelect" label="1" size="large">
                    {{$t('message.readAccept')}}
                </el-radio>
                <el-link type="danger" @click="tosVisible = true" style="color:red;font-size: 12px;line-height: 32px;">{{$t('message.userAgreementPrivacyStatement')}}</el-link>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="danger" round v-on:click="register('registerForm')" style="width:100%;" size="large">{{$t('message.signUp')}}</el-button>
        </el-form-item>
        <el-form-item>
            <div style="font-size: 12px;width:100%;">
                <span>{{$t('message.hasAccount')}}?&nbsp;&nbsp;</span>
                <router-link :to="{name: 'login'}" style="color:red;font-size: 12px;">{{$t('message.signIn')}}</router-link>
            </div>
        </el-form-item>
    </el-form>
    <el-dialog
            v-model="tosVisible"
            :title="$t('message.tosTitle')"
            width="60%"
            height="600px;"
            :before-close="handleClose">
        <div style="text-align: left;text-indent:2em;height: 500px;overflow-y: scroll;">
            <h2 style="text-align: center;">用户注册协议</h2>
            <p>
                本协议是您与维思模V站/WISITE客户端（简称“本客户端”）所有者（以下简称为“四川维思模医疗科技有限公司”）之间就维思模V站/WISITE客户端服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击“注册”按钮后，本协议即构成对双方有约束力的法律文件。
            </p>
            <p>
                <b>第1条&nbsp;&nbsp;本客户端服务条款的确认和接纳</b>
            </p>
            <p>
                1.1&nbsp;&nbsp;用户同意所有注册协议条款并完成注册、审核程序，才能成为本客户端的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。
            </p>
            <p>
                1.2&nbsp;&nbsp;用户点击同意本协议的，即视为用户确认自己具有享受本客户端服务、上传等相应的权利能力和行为能力，能够独立承担法律责任。
            </p>
            <p>
                <b>第2条&nbsp;&nbsp;用户信息</b>
            </p>
            <p>
                2.1&nbsp;&nbsp;用户应自行诚信向本客户端提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且四川维思模医疗科技有限公司保留终止用户使用维思模V站/WISITE各项服务的权利。
            </p>
            <p>
                2.2&nbsp;&nbsp;用户在本客户端进行购买活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。
            </p>
            <p>
                2.3&nbsp;&nbsp;用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。
            </p>
            <p>
                2.4&nbsp;&nbsp;本客户端及全体用户保证不侵犯他人的知识产权，所有知识产权均标注出处。不盗链出版物内容，所发表内容均为相关资料的个人理解和观点。
            </p>
            <p>
                2.5&nbsp;&nbsp;本客户端发生的所有知识产权质疑，均需在充分告知的前提下友好协商。如有用户侵犯第三方知识产权，本客户端会保留相关管理权利。
            </p>
            <p>
                2.6&nbsp;&nbsp;本客户端严格保护全部医学资料相关的个人隐私。
            </p>
            <p>
                <b>第3条&nbsp;&nbsp;所有权及知识产权条款</b>
            </p>
            <p>
                3.1&nbsp;&nbsp;用户一旦接受本协议，即表明该用户认同本客户端赋能服务，在集体学习过程中，获得维思模V站/WISITE培养、评价、服务、支持、激励的同时自愿将其在任何时间段在本客户端发表的任何形式的信息内容（包括但不限于我的V站/WISITE、客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的知识产权性质的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给四川维思模医疗科技有限公司所有，用户同意四川维思模医疗科技有限公司有权就任何主体侵权而单独提起诉讼。
            </p>
            <p>
                3.2&nbsp;&nbsp;本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在维思模V站/WISITE客户端上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。
            </p>
            <p>
                3.3&nbsp;&nbsp;用户同意并已充分了解本协议的条款，承诺不将已发表于本客户端的信息，以任何形式发布或授权其它主体以任何方式使用（包括但限于在各类网站、媒体上使用）。
            </p>
            <p>
                3.4&nbsp;&nbsp;四川维思模医疗科技有限公司是本客户端的制作者，拥有此客户端内容及资源的著作权等合法权利，受国家法律保护，有权不时地对本协议及本客户端的内容进行修改，并在本客户端张贴，无须另行通知用户。在法律允许的最大限度范围内，四川维思模医疗科技有限公司对本协议及本客户端内容拥有解释权。
            </p>
            <p>
                3.5&nbsp;&nbsp;本客户端的维思模“V”积分不能以任何形式转让，注销账号后7个工作日内如维思模网站未收到取消注销请求，全部V积分将不可逆的全部清零。
            </p>
            <p>
                第4条&nbsp;&nbsp;责任限制及不承诺担保
            </p>
            <p>
                <b>4.1&nbsp;&nbsp;本客户端保护会员及网站平台全部知识产权，任何单位和个人在使用原创知识产权时必须提出申请，规范标注出处，本客户端永久保留追究知识产权侵权责任。</b>
            </p>
            <p>
                  除非另有明确的书面说明，本客户端及其所包含的或以其它方式通过本客户端提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在“按现状”和“按现有”的基础上提供的。除非另有明确的书面说明，维思模V站/WISITE不对本客户端的运营及其包含在本客户端上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。
            </p>
            <p style="text-align: right;">
                四川维思模医疗科技有限公司<br/>
                2021 年 12 月
            </p>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="tosVisible = false">{{$t('message.close')}}</el-button>
          </span>
        </template>
    </el-dialog>
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
                tosVisible: false,
                loading: false,
                loginInfo: null,
                tosSelect: false,
                rules: {
                    uname: [
                        { required: true, message: this.$t('message.loginNameRequired'), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$t('message.emailRequired'), trigger: 'blur', pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+'}
                    ],
                    name: [
                        {required: true, message: this.$t('message.nameRequired'), trigger: 'blur' }
                    ],
                    pwd: [
                        {required: true, message: this.$t('message.passwordRequireTip'), trigger: 'blur', pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{6,30}$'}
                    ],
                    tosSelect: [
                        {required: true, message: this.$t('message.userAgreementPrivacyStatementRequired'), trigger: 'change' }
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
                            apiUtil.message.success(_this.$t('message.registerSuccess'))
                            _this.$router.push({
                                name: 'verify',
                                params: {
                                    uname: _this.registerInfo.uname
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
    p{
        line-height: 24px;
    }
</style>f
import { createI18n } from 'vue-i18n'
const messages = {
    "zh": {
        "message": {
            "signIn": '登录',
            "loginNameTip": '用户名/邮箱',
            "loginName": '用户名',
            "password": '密码',
            "signUp": '注册',
            "forgetPassword": '忘记密码',
            "hasNoAccount": '还没有帐号',
            "email": '邮箱',
            "realName": '真实姓名',
            "readAccept": '阅读并接受',
            "userAgreementPrivacyStatement": "用户协议和隐私保护",
            "hasAccount": '已有帐号',
            siteName: 'Wisite',
            userInfo: '用户信息',
            update: '更新',
            phone: '手机号',
            regtime: '注册时间',
            addr: '地址',
            gender: '性别',
            select: '--请选择--',
            selectFile: '选择文件',
            addTag: '添加标签',
            logout: '退出',
            official: '官方认证用户',
            emailVerify: '邮箱验证',
            verifyCode: '验证码',
            verify: '验证',
            loginNameRequireTip: '请输入用户名或邮箱',
            passwordRequireTip: '请输入密码',
            loginSuccess: '登录成功',
            registerSuccess: '注册成功',
            imageTypeLimit: '图片类型要求：jpeg、jpg、png',
            female: '女',
            male: '男',
            yes: '是',
            no: '否',
            logoutSuccess: '退出成功',
            logoutFail: '退出失败',
            updateSuccess: '更新成功',
            "userAgreementPrivacyStatementRequired": "请同意用户协议和隐私保护",
            "emailRequired": "请输入邮箱",
            loginNameRequired: '请输入用户名',
            nameRequired: '请输入真实姓名',
            sendMailVerifyTip: '我们已经向您的电子邮箱发送了验证码，您可以通过验证码激活您的帐号。请输入验证码。',
            dob: '出生日期',
            employer: '所在单位',
            position: '职位',
            title: '职称',
            bio: '签名',
            tosTitle: '用户注册协议',
            close: '关闭',
            city: '城市',
            country: '国家',
            nationalid: '身份ID',
            "memberDays": '加入V成员时长',
            info: '提示',
            ok: '确认',
            cancel: '取消',
            logoutConfirm: '确认退出吗?',
            "profile": '个人信息',
            "whats-new": '主页',
            "topic":  '主题',
            "bookmark": '书签',
            "sharing": '我的分享',
            "ask": '求助',
            "assign": '任务分派',
            "task": '任务接收',
            "audit": '审核',
            "admin": '管理员',
            "wisite-green": '社区会员',
            "vote": "发起投票",
            messageTitle: '标题',
            messageTitleTip: '请输入标题',
            messageContent: '消息内容',
            messageContentTip: '请输入消息内容',
            confirm: '确认',
            addMessage: '发布新内容',
            onlineUser: '在线用户',
            index: '序号',
            operation: '操作',
            edit: '编辑',
            userManage: '用户管理',
            editUserInfoTitle: '编辑用户信息',
            getConfigError: '获取配置文件错误',
            level: '等级',
            level1: '等级1',
            level2: '等级2',
            level3: '等级3',
            level4: '等级4',
            certified: '是否实名认证',
            role: '角色',
            active: '激活',
            search: '搜索',
            searchOnlineNameTip: '输入用户名',
            searchUserNameTip: '输入姓名',
            searchUserUnameTip: '输入登录用户名',
            searchUserActiveTip: '是否激活',
            selectMedia: '图片/视频上传',
            more: '+',
            publish: '发布',
            wrapupTip: '总结',
            timeline: '时间线',
            editVideo: '视频编辑',
            clip: '开始裁剪',
            editImage: '图片编辑',
            fileExceedsMaximum: '文件超出最大值(20M)',
            messageTopicTip: '主题',
            topicRequired: '主题不能为空',
            summaryRequired: '总结不能为空',
            publishSuccess: '发布成功',
            updateTip: '有新内容，需要更新嘛？',
            paragraphTip: '请输入段落内容',
            delete: '-',
            loadMore: '加载更早内容'
        }
    },
    "en": {
        "message": {
            "signIn": 'Sign in',
            "loginNameTip": 'Uname/Email',
            "loginName": 'Login name',
            "password": 'Password',
            "signUp": 'Sign up',
            "forgetPassword": 'Forget password',
            "hasNoAccount": 'Has no account',
            "email": 'Email',
            "realName": 'Real name',
            "readAccept": 'Read and accept',
            "userAgreementPrivacyStatement": "User agreement & privacy statement",
            "hasAccount": 'Has account',
            siteName: 'Wisite',
            userInfo: 'User profile',
            update: 'Update',
            phone: 'Phone',
            regtime: 'Register time',
            addr: 'Address',
            gender: 'Gender',
            select: '--Select--',
            selectFile: 'Select file',
            addTag: 'Add tag',
            logout: 'Logout',
            official: 'Official',
            emailVerify: 'Email verify',
            verifyCode: 'Verify code',
            verify: 'Verify',
            loginNameRequireTip: 'Please input login name or email',
            passwordRequireTip: 'Please input password',
            loginSuccess: 'Login success',
            registerSuccess: 'Register success',
            imageTypeLimit: 'Image type limit：jpeg、jpg、png',
            female: 'Female',
            male: 'Male',
            yes: 'Yes',
            no: 'No',
            logoutSuccess: 'Logout success',
            logoutFail: 'Logout fail',
            updateSuccess: 'Update success',
            "userAgreementPrivacyStatementRequired": "Please accept user agreement & privacy statement",
            "emailRequired": "Please input email",
            loginNameRequired: 'Please input login name',
            nameRequired: 'Please input real name',
            sendMailVerifyTip: 'We are sent you an e-mail with a security code so you can start activating Verification for your account. Please enter the code.',
            dob: 'Birthday',
            employer: 'Employer',
            position: 'Position',
            title: 'Title',
            bio: 'Bio',
            tosTitle: 'User registration agreement',
            close: 'Close',
            city: 'City',
            country: 'Country',
            nationalid: 'national ID',
            "memberDays": 'Member days',
            info: 'Info',
            ok: 'Ok',
            cancel: 'Cancel',
            logoutConfirm: 'Are you sure to logout?',
            "profile": 'profile',
            "whats-new": 'whats-new',
            "topic":  'topic',
            "bookmark": 'bookmark',
            "sharing": 'My sharing',
            "ask": 'ask',
            "assign": 'assign',
            "task": 'task',
            "audit": 'audit',
            "admin": 'admin',
            "wisite-green": 'wisite-green',
            "vote": 'vote',
            confirm: 'Confirm',
            addMessage: 'Publish message',
            onlineUser: 'Online Users',
            index: 'Order num',
            operation: 'Operation',
            edit: 'Edit',
            userManage: 'User manage',
            editUserInfoTitle: 'Edit user info',
            getConfigError: 'Get Config Error',
            level: 'Level',
            level1: 'Level1',
            level2: 'Level2',
            level3: 'Level3',
            level4: 'Level4',
            certified: 'Certified',
            role: 'Role',
            active: 'Active',
            search: 'Search',
            searchOnlineNameTip: 'Input name',
            searchUserNameTip: 'Input name',
            searchUserUnameTip: 'Input uname',
            searchUserActiveTip: 'Active',
            selectMedia: 'Image/Video',
            more: '+',
            publish: 'Publish',
            wrapupTip: 'Wrapup',
            timeline: 'Timeline',
            editVideo: 'Edit video',
            clip: 'Start clip',
            editImage: 'Edit image',
            fileExceedsMaximum: 'File exceeds maximum(20M)',
            messageTopicTip: 'Topic',
            topicRequired: 'Topic is required',
            summaryRequired: 'Summary is required',
            publishSuccess: 'Publish success',
            updateTip: 'Has new content, update？',
            paragraphTip: 'Please input paragraph content',
            delete: '-',
            loadMore: 'Load more',
        }
    }
}
const i18n = createI18n({
    fallbackLocale: 'zh',
    globalInjection:true,
    legacy: false,
    locale: 'zh',
    messages
})

export default i18n
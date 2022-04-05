requirements
============

0. API服务器启动后，SWAGGER： <http://localhost:1323/swagger/index.html>
1. 注册、登陆界面，风格参考 <https://www.mockplus.com/blog/post/login-page-examples>
2. 注册：
   1. API 1：<http://localhost:1323/api/sign/new> 填写必要信息: 1.注册用户名，2.Email, 3.用户姓名，4.密码（包含大小写，数字，特殊字符。长度>11）。
   2. API 2: <http://localhost:1323/api/sign/verify-email> 上步成功后，验证码发送到填写的邮箱。提示输入验证码，用户输入后调用此步验证API。验证码正确后，注册成功。
3. 登陆：
   1. API：<http://localhost:1323/api/sign/in> 填写登录名与密码。登录名同时支持注册用户名与用户邮箱。登陆成功后返回authentication信息: `Bearer token...`
   2. 此auth字符串为访问其他API的用户JWT凭据。
   3. 登陆不成功，则返回400及失败原因字符串。
4. 登陆成功后界面：参考 <https://webix.com/demos/admin-app/#!/main/forms>
   1. 实现左侧导航窗口，添加Profile选项。
   2. 内容区域实现风格模仿参考网址的顶部logo区域和'Profile information'区域。

* updated 2022-03-23

** 根据《注册协议.DOCX》，添加入注册时的链接。

* updated 2022-04-05

1. 在用户登陆成功后，前段调用 `/api/admin/spa/menu` 获取目录列表; 根据列表内容，在左侧端依照返回顺序进行排列显示。

   依照登陆人员身份不同，显示内容会有所不同。 当用户选择不同菜单选项，当前已选择的标题需要有别于未选择标题（比如可字体变粗，颜色加深等）。

   返回内容为英文，中文翻译：

   ["whats-new": "动态内容"],\
   ["topic": "主题浏览"],\
   ["bookmark": "书签"],\
   ["sharing": "我的分享"],\
   ["ask": "我的求助"],\
   ["assign": "任务分派"],\
   ["task": "任务接收"],\
   ["audit": "审核中心"],\
   ["admin": "管理员"],\
   ["profile": "个人信息"], ---- 此项内容基本完成，剩下为测试，调整，局部修改。\
   ["wisite-green": "V社区会员"]\

2. 登陆后，如登陆用户已有头像，在页面左上角显示用户头像。

3. 用户退出时，弹出退出确认对话框。

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
   1. 左侧导航窗口，Profile选项。
   2. 内容实现风格参考网址的顶部logo区域和'Profile information'区域。

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

1. 登陆密码框调整为带“眼睛”明文提示功能的密码输入框。

2. 在用户登陆成功后，前段调用 `/api/admin/spa/menu` 获取目录列表; 根据列表内容，在左侧端依照返回顺序进行排列显示。

   依照登陆人员身份不同，显示内容会有所不同。 当用户选择不同菜单选项，当前已选择的标题需要有别于未选择标题（比如可字体变粗，颜色加深等）。

   返回内容为英文，中文翻译：

   ["whats-new": "主页"],\
   ["topic": "主题"],\
   ["bookmark": "书签"],\
   ["sharing": "分享"],\
   ["ask": "求助"],\
   ["assign": "任务分派"],\
   ["task": "任务接收"],\
   ["audit": "审核"],\
   ["admin": "管理员"],\
   ["profile": "个人信息"],\
   ["wisite-green": "社区会员"]\

3. 登陆后，如登陆用户已有头像，在页面左上角显示用户头像。

4. 用户退出时，弹出退出确认对话框。

* updated 2022-04-14

1. 登陆页面背景右下角，显示后台API版本号。暂时调用 `/api/system/ver-tag`。后期会改为`/api/system/ver`

2. “个人信息”中选择好头像并保存修改后，左上角头像此刻即更新显示

3. “个人信息”官方账户显示，改为类似“邮箱”内容的普通只读显示。当前为选择框的只读。

4. “动态信息”页面右下角，生成类似于推特的添加按钮。按钮点击后的下一步操作待定。

* updated 2022-04-20

0. 调试后门更新：
   用户注册密码以`*`开头，密码可为邮箱验证码；
   以`**`开头和结尾，密码可为邮箱验证码，且为订阅用户；
   以`***`开头和结尾，密码可为邮箱验证码，且为高级用户；
   以`****`开头和结尾，密码可为邮箱验证码，且为管理员用户；
   不同用户对应菜单栏有所不同。

1. 以高级用户注册且登陆，在"管理员"页面，放入2个页签：`在线用户`及`用户管理`，
   `在线用户`: 调用`/api/admin/onlines`，表格显示在线用户名，单元格只读，其它显示内容待定。
   `用户管理`: 调用`/api/admin/users`，表格显示所有用户名，单元格可选定进行下一步编辑，其他显示内容待定。

2. 添加按钮只在“动态信息”菜单下出现，其他菜单下隐藏。

* updated 2022-04-30

0. 任何API若返回'401 invalid or expired jwt'，则自动重定向到登陆界面。

1. 用户成功登陆后，前段自动每隔10秒调用`/api/user/heartbeats`通知后端是否处于活跃状态。定时触发伴随整个session周期。

2. 在用户管理页面的表格处，提供搜索过滤输入框。搜索参数传入最新的`/api/admin/onlines` (1个参数) 及 `/api/admin/users`(3个参数)。具体参见此2个API的swagger。

3. 在 updated 2022-04-05 第二项中文翻译有所更新，前端菜单名称对应更新。

4. 在用户管理页面，注册用户表格某个用户选定后，弹出窗口按照下列要求显示。同时，提供保存更新按钮：

    "uname": 只读
    "email": 只读
    "name": 只读
    "phone": 只读
    "country": 只读
    "city": 只读
    "addr": 只读
    "personalidtype": 只读
    "personalid": 只读
    "gender": 只读
    "dob": 只读
    "position": 只读
    "title": 只读
    "employer": 只读
    "bio": 只读
    "regtime": 只读
    "active": 读写 ( true/false 二选一, API 稍后提供 )
    "certified": 读写 ( true/false 二选一，API 稍后提供 )
    "official": 读写 ( true/false 二选一, API 稍后提供 )
    "role": 只读
    "level": 读写 ( 具体内容待定，API 稍后提供 )
    "expire": 只读
    "tags": 只读

* updated 2022-05-21

1. 在“主页”页面内点击发布按钮后，弹出内容发布对话框。 对话框设计参照“POST 说明.png”；

2. 对话框左上角显示当前用户头像； 

3. 第一行为发布内容标题栏，单行文本输入框。

4. 中部区域为段落内容：允许用户动态添加若干段落，且每个段落由多行（或一行）文本文字，及 最多一个媒体文件附件构成（附件为可选选项）；

5. 段落后的"media"按钮点击后，弹出媒体内容编辑对话框。该对话框中可以选择 图像/视频/音频/PDF文档等。
   a. 若判断用户选择为图像，则对话框可以做区域裁剪；
   b. 若判断用户选择为视频/音频，则对话框可以做时长裁剪。（若能实现视频的区域裁剪则更好）
   （项目初期图像范围裁剪及视频时长裁剪技术实现已完成，需要在此处进行应用）

6. 窗口右上角有关闭窗口的 ‘×’ 按钮。

7. “publish”/"发布"按钮触发后的调用API及参数， 待定......

* updated 2022-05-30 （ “主页” 显示内容参考 ）

1. 整体页面为 纵向 多“块”显示，每条发布内容占据一块。（参考推特网页版本）

2. 对于单块发布内容区域，参考“主页单条发布样式.png”。

3. 单块发布包含，头像，用户姓名，注册名，（用户profile内提取）； 主题 及 各个段落文字及多媒体文件 （根据 API（暂未开放） 返回 ID 进行内容读取）。

4. 添加 a.段落‘前进’，b.‘后退’按钮 及 c.总段落序号 和 d. 当前序号标注指示。

5. 用户通过‘前进’，‘后退’ 更改段落时，a. 段落文字内容、b. 媒体文件内容 及 c. 当前序号 应有所对应变化。

* updated 2022-06-04

0. 后端 IP:PORT 使用 `http://13.55.91.185:1323/`，直接远程访问。

1. `/api/user/heartbeats` 访问方式由 POST 改为 PATCH。

2. 配合“POST说明.png” UI 内容, 将发布内容传送至后端。具体步骤如下：

   a. 调用 `/api/post/template`, 获取发送模板。此API访问一次即可，模板固定，每次发布内容为填写不同JSON属性值。

   b. `category` 暂时固定填写 `share`, 后期有其它类别。

   c. `topic` 填写 "说明" UI 首行输入框内容，即 “发帖主题”。

   d. `summary` 填写 "说明" UI 末行输入框内容，即 “发帖总结”。

   e. `content` 为 “说明” UI 的段落内容 （黑色线框内，含若干段落）。 每个段落包含一段文字及一个对应的粘贴内容（图片，视频等类型），文字内容填写入一个 `content` 元素 的 `text`；`content` 元素 `path` 内容为 `api/file/upload-formfile` 或 `api/file/upload-bodydata` 的返回值。

   注意  如果直接打开本地文件上传，则调用`api/file/upload-formfile`;
        如果上传二进制数据块，则调用`api/file/upload-bodydata`, 把待上传的数据放入body。同时必须填写参数'fname', 值为上传资源名称。
   
   * 具体步骤：
      1) 在整个内容发布调用 `/api/post/upload` 事件前，先依上下顺序将每个段落的待上传文件使用 `api/file/upload-formfile` 或 `api/file/upload-bodydata` 上传至后端。若上传成功，则返回该上传文件的对应path值, 将返回的path值填写入 `content` 的 `path` 属性。

      2) 待每个段落的 `text` 及 `path` 都填写完成后（若某段落只有文字，则`path`保留为空），待上传的JSON内容样例为如下（包含3个段落，最后段落仅有文字）：
    ```json
    {
      "category": "share",
      "topic": "this is an example topic",
      "content": [
         {
            "text": "this is the 1st paragraph text input",
            "path": "attached stuff return path value, which should have been given from 'api/file/upload-formfile' or 'api/file/upload-bodydata'"
         },
         {
            "text": "this is the 2nd paragraph text input",
            "path": "attached stuff return path value, which should have been given from 'api/file/upload-formfile' or 'api/file/upload-bodydata'"
         },
         {
            "text": "this is the 3rd paragraph text input",
            "path": ""
         }              
      ],
      "summary": "this is an example summary"
   }
   ```
      3) 调用`/api/post/upload`, 将待上传的 JSON 放入请求的 body。如果上传成功，则返回事件记录的另一个 JSON，内容样例如下：
      ```json
      {
         "ID": "e66d73f5-1df6-40f6-a117-b651e2e9b69e",
         "Tm": "2022-06-04T06:02:56Z",
         "Owner": "user",
         "EvtType": "Post",
         "MetaJSON": "{\"category\":\"post category AAA\",\"topic\":\"post topic\",\"content\":[{\"text\":\"some words for this attach\",\"path\":\"path/to/the/resource\"}],\"summary\":\"summarize your topic BBB\"}",
         "Public": false
      }
      ```
      其中，`MetaJSON`为发布的上传内容，`Owner`为发布者，其他字段暂时忽略。
      至此，发布到后端的功能完毕。
      
   
* updated 2022-06-06 (读取发布内容)

0. 用户登录成功后，在“主页”页面，调用`/api/post/ids`, 此时调用使用查询参数 `fetchby`："count"， `value`: 100; 目的是取出截止至当前最近的100条发布内容的ID。不够100条则返回所有。

   该`value`值后期会更改，写入配置文件。 返回内容样例如下：
   ```json
   [
      "26ba3bf2-9f24-47f7-ba37-db4374bc6591",
      "1dbb258f-290e-44dd-8ebb-30543be47be5",
      "6a0f984c-c118-4c62-aac2-6aecfec14e86",
      "99fc3deb-5c6a-4ac6-b991-8d864169867d"     
   ]
   ```

1. 对应每个id， 使用`/api/post/one` 获取对应发布内容。对于其返回值JSON，其中，先注意`MetaJSON`及`Owner`。`MetaJSON` 为内容，`Owner`为发布人(即，注册用户名)。

   在一个发布内容中，使用`/api/admin/users`及根据`Owner`查询发布人其他信息(此处需要用户姓名)；使用`/api/admin/avatar`及根据`Owner`查询发布人头像avatar数据。
   其后将查询得到的 '姓名'，'用户名' 及 'avatar' 显示到内容发布区域，参考 “主页单条发布样式.png”。
   
   发布内容中，`MetaJSON`的 'topic' 写入 “样式.png” 的主题处；下方显示每个段落的文字。例如 第一个段落，即"content.0.text", 再下方根据显示"content.0.path"显示媒体内容。

   注意 1：根据"content.x.path"返回值的路径倒数第二段内容判将要展示的媒体类型，通常为'image'或'video';

   注意 2：访问媒体源的方式，即 src 的设置方式为：`http://13.55.91.185:1323/[用户名]/[content.x.path]`;

2. 处理`MetaJSON.content`的每个元素，即每个段落，即可得到一条发布内容的所有内容展示。样式及交互参考"主页单条发布样式.png"。暂时先忽略“点赞”，“转发”及“评论”功能。

3. 依次处理每个发布id，依照顺序，进行逐一发布内容显示。

4. 以5分钟为间隔周期，周期性调用`/api/post/ids`, 调用使用查询参数 `fetchby`："time"， `value`: 5; 获取过去5分钟内新的发布内容。
   该`value`值后期会更改，写入配置文件。

   如果有新内容,即获取到非空id数组，则提示用户是否刷新内容显示? 如果用户点击“更新”，则将此时获取的新的id数组仿照上面步骤1,2,3, 依次显示在页面上端，原来内容依次对应往下排放。
   如提示按钮出现 15 秒用户未予相应，则提示消失。该操作为周期性。 该值 `15` 后期会更改，写入配置文件。

* updated 2022-06-07

0. 为方便调试，当前阶段调整心跳heartbeats检测周期为3600秒。正式运行再改小。

1. 登录成功后进入“主页”页面，而不是“个人信息”页面。

2. 增加单条发布内容高度，长宽比暂时定为1：0.618，要保证除了“总结”文字之外的内容都完整显示。

3. 发布内容的用户名显示改为`@username`, 当前是`username@`。同时显示用户姓名。当前用户姓名没有显示。

4. 发布输入框标题改为`发布新内容`。 每个段落的占位符改为`请输入段落内容`。 同时增加“删除”按钮方便用户进行段落删除。但至少保留一个段落（即段落只有一个时候“删除”按钮不可用）。 `增加` 及 `删除` 按钮改为  `+` `-` 符号。 `多媒体`按钮 名称改为 `图片/视频上传`

5. 发布内容窗口的段落输入区域改为固定大小的文本框，高度为四行文字。若输入更多文字，该文本框显示下拉滚动条。

6. 当前，用户取消发布，关闭发布窗口时，主页为空白。应保持当前主页显示状态。

* updated 2022-06-22

0. 页签名称更改，["sharing" => "我的分享" (原来为"分享")]。

1. 在该页签中，使用`api/post/own/ids`获取当月自己的分享内容id(如本月应输入的period为'202206')。
   再根据返回的每个id，使用`api/post/one`获取每个分享内容。类似于"主页"的显示，将本人的该月发布内容进行显示。

2. 当用户向下混动至底端(最后一个发布内容的下端)，提示点击‘加载更早内容’。如果用户点击，1. ‘加载更早内容’ 点击字眼消失；2. 同样调用`api/post/own/ids`输入不同参数进行操作(如加载五月的内容，period参数为'202205')。剩余工作流程类似上一步。

3. 如果再次下拉到底端，依次类推，往再前月进行读取显示。

* updated 2022-07-21

0. 新用户注册成功完成后自动登录。当前是新用户注册通过邮箱验证后弹出登录窗口，登录成功后再进入主页; 调整为新用户填写注册信息后，通过了邮箱验证，此刻就可转入“主页”，省去登录窗口操作。
   老用户登录方式不变。

1. 发布内容栏的高度再增加20%，标题栏高度不变。

2. 如果发布的某些段落只有文字，没有其他上传内容，则该段文字窗口在发布内容栏水平居中，忽略显示图像、视频等的窗口。

3. 主页发布栏集合底部的“加载更多”按钮挪至“发布按钮”下，同样使用圆形按钮，按钮内容为下箭头（⬇）。 其它有发布的页面也将底部的“加载更多”移至右下角，变为圆形按钮，内容图案为下箭头。

4. “管理员”菜单内，在线用户后台返回值有所变化，参照swagger的返回json把在线用户名字段重新提取显示。

5. 发布模板JSON中已移除了“summary”字段，因此现有的发布窗口中需要将“summary”输入框移除。

6. 发布内容重复显示BUG：如果后台POST数据为空，即还没有一条发布内容时，此时发布一条内容，发布完成后，再点击“加载更多”，会重复若干刚才发布的那条内容。
   重复触发此BUG方法：关闭api service, 手动删除`./data`目录，再启动api service, 此时可以达到后台数据清空的效果。

* updated 2022-07-23

0. 发布内容栏的高度再增加20%，标题栏高度不变。

1. 发布页面的最顶端的一个发布（“主页”及“我的分享”都存在此问题），用户姓名没有显示(只显示了注册名)，剩下的正常。
   ![姓名缺失](./isshots/name%20missing.png)

2. 当load一定数量的POST后，页面下滚到一定的位置，页面左上角头像的固定区域会产生变化。
   ![头像区域滚动后错误显示](./isshots/scroll%20issue.png)

3. 任何有发布内容的窗口，发布内容均按照时间由近到远顺序，从上到下排列，最新发布的在最上端。(目前在前端暂不做修改，先只检查确保发布内容上下顺序与返回的ID集合前后顺序一致)

* updated 2022-07-31

0. 最新 Swagger 参照 http://54.66.224.148:1323/swagger/index.html#/，同时 https://github.com/wismed-web/wisite-api/releases/tag/v0.0.9 有本地可执行二进制服务。上传日期为七月三十日。

1. 在每个发布内容栏的右下角添加👍图标按钮，按钮旁边显示👍数量。
   数量由 GET `/api/post/thumbsup/status/{id}`获取，`{id}`为当前发布事件内容的ID, 返回`ThumbsUp 及 Count`, `ThumbsUp`为当前登录用户是否已经👍过，如`true`,则👍按钮为实心略大，如`false`,则👍按钮为空心，略小。

2. 在点击👍按钮时，调用 PATCH `/api/post/thumbsup/{id}`, `{id}`为当前发布事件内容的ID (注意参数为path，不是query), 返回`ThumbsUp 及 Count`, `ThumbsUp`为当前登录用户的👍状态，如`true`,则👍按钮显示为实心略大，如`false`,则👍按钮为空心，略小。 此API 是个 toggle 操作，用户可以控制👍及取消👍。

3. 在每个发布内容栏的右下角👍按钮的旁边，添加评论图标按钮，可在google搜索comment icon找一款。评论图标旁边显示当前发布内容的评论数量。
   由 GET `api/post/follower/ids`获取， 该API返回id的数组，在前端取得数组的数量，将数量显示在评论图标按钮的边上。

4. 点击评论图标时，当前发布内容与下面的发布分割开，如![评论示意图](./comment%20style.png)。下端第一条为发布评论输入框。用户在此只可输入单段文本。输入内容后，将输入文本内容赋值如下发布内容模板的content->text，topic 为 `comment`,其他暂保留空。
```json
{
  "category": "",
  "topic": "comment",
  "content": [
    {
      "text": "what is in the input box",
      "path": ""
    }
  ]
}
```
点击发表评论后，同样调用 POST `/api/post/upload`,此时将`followee`参数设为所评论的发布内容ID。如评论发布成功，立刻返回此事件JSON，如ID等，取出"RawJSON"字段的content->text内容，添加一条新的已有回复在回复输入框的下端，其他回复的上端。

5. GET `api/post/follower/ids`获取若干回复内容的ID，针对每条ID，调用 `/api/post/one`，取出每个回复内容的content->text,依次如“已有回复1，2，3...”进行显示。

6. 如在评论内容展开情况下，再次点击评论图标按钮，则不显示评论内容，只显示发布内容。每条发布内容恢复紧邻。


* updated 2022-08-12

0. 最新 Swagger 参照 http://54.66.224.148:1323/swagger/index.html#/，同时 https://github.com/wismed-web/wisite-api/releases/tag/v0.0.11 有本地可执行二进制服务。上传日期为8月12日。

1. 后端Post的JSON结构有所调整；Post内容Upload后，原来返回其发布内容，现已调整为只返回事件ID。根据后端的此2处调整，更改前端，使其可以正常运行。(已在电报提及此点) 

2. 在"个人信息"菜单下，更改"真实姓名"为可编辑更新状态，允许用户更改注册时填写的真实姓名。

3. 发布内容的回复输入窗口改为多行输入框，运行回复文字包含多行。

4. 用户回复内容一旦成功提交，则将输入框的已有内容清空。

5. 在每个已有回复栏内，显示回复者的头像，用户名及姓名。样式同发布栏。


* updated 2022-09-05

0. 最新 Swagger 参照 http://54.66.224.148:1323/swagger/index.html#/，同时 https://github.com/wismed-web/wisite-api/releases/tag/v0.0.13 有本地可执行二进制服务。上传日期为9月5日。

1. 用户点击书签收藏图标后，调用`/api/post/bookmark/{id}`，id 为发布Post ID。该API为toggle功能，没有加入书签的加入书签；已加入书签的再次调用则取消书签。

2. 在每个发布内容显示时，调用`/api/post/bookmark/status/{id}`，id 为发布Post ID，返回该发布是否被当前用户加入了书签。 如果为true则高亮显示，为false则普通显示。

3. 在左侧“书签”菜单中，调用`/api/post/bookmark/bookmarked`，获取当前用户所有加入书签收藏的发布ID，根据每个ID，获取具体内容（每个发布的本身回复内容不用获取）,在该菜单内进行列表显示。注意，“书签”页面显示风格与“主页”，“我的分享”要保持一致。
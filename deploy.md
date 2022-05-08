# 部署说明
## 部署前端
1. 创建部署目录和日志目录 `mkdir /opt/wisite`、`mkdir /opt/wisite/log`
1. 把wisite-spa.zip传到/opt/wisite下面
2. 执行 `unzip wisite-spa.zip`解压到当前文件夹
3. 执行 `cd wiste-spa/linux`
4. 执行 `nohup ./wisite-spa-20220503 >>/opt/wisite/log/wisite-web.log &`


## 部署后端
1. 把wisite-api.tar.gz传到/opt/wisite下面
2. 执行 `tar zxvf wisite-api.tar.gz`解压到当前文件夹
3. 执行 `cd linux64`
4. 执行 `nohup ./server >>/opt/wiste/log/wisite-api.log &`
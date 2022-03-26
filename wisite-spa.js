const express = require('express')
const app = express()
var Server = require('http').Server
const path = require('path')
const {exec} = require("child_process")
const exePath = path.resolve(process.execPath + "/..")
const distPath = path.join(exePath,'www')
console.log("path:" + distPath)
var server = new Server(app)
server.listen(8888)
app.use('/', express.static(path.join(exePath,'www')))
app.get('/', function (req, res) {
    console.log(exePath + 'www/index.html')
    res.sendFile(path.join(exePath, 'www/index.html'))
})
console.log('服务启动成功，请打开浏览器访问:http://localhost:8888/')



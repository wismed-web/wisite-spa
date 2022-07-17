const express = require('express')
const app = express()
var Server = require('http').Server
var https = require('https')
const path = require('path')
const fs = require('fs')
const {exec} = require("child_process")
const exePath = path.resolve(process.execPath + "/..")
const distPath = path.join(exePath,'www')
console.log("path:" + distPath)
const privateKey  = fs.readFileSync('id_rsa', 'utf8');
const certificate = fs.readFileSync('id_rsa.pub', 'utf8')
const credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

var server = new Server(app)
server.listen(8888)
app.all('*', function (req, res, next) {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
})
app.use('/', express.static(path.join(exePath,'www')))
app.get('/', function (req, res) {
    console.log(exePath + 'www/index.html')

    res.sendFile(path.join(exePath, 'www/index.html'))
})
console.log('Service has started please visit:http://localhost:8888/')



const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const Router = require('./router/index');
const Mongodb = require('./util/mongodb');
Mongodb.init();

const PORT = 30004;
const SSLPORT = 3005;
const app = express();


app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use('/static/', express.static(path.join(__dirname, 'public/cliStart')));
app.use('/images/', express.static(path.join(__dirname, 'start_imgs')));

app.use(bodyParser.urlencoded({limit: "50mb", extended: false}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());

// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000*60*60*24*30, // 设置 session 的有效时间，单位毫秒
    },
}));


//SSH证书
const options = {
    key: fs.readFileSync("./code/code.key", 'utf-8'),
    cert: fs.readFileSync("./code/code.crt", 'utf-8')
};

app.all('*', (res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


const router = express.Router();
app.use(router);
Router(router);


//var httpServer = http.createServer(app);
//https
var httpsServer = https.createServer(options, app);

// httpServer.listen(PORT, function () {
//     console.log('HTTP Server is running on: http://localhost:%s', PORT);
// });
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

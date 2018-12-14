/**
 * Created by Bkz on 2018/12/13.
 */

const RouterConfig = require('../config/routeConfig');
const UserInfo  = require('../module/userInfo');
const StarInfo = require('../module/statInfo');
const Tools = require('../util/tools');

module.exports = (app)=>{

    app.use((req, res, next) => {
        let reqData = req.method === 'POST' ? req.body : req.query;
        if (!RouterConfig[req.path]) {
            res.send({state: 500, msg: "Unknown Request"});
            return;
        }
        let signData = {};
        if (RouterConfig[req.path].length > 0) {
            let routeConfigArr = RouterConfig[req.path];
            for (let i in routeConfigArr) {  //['username','pwd'],
                if (typeof reqData[routeConfigArr[i]] === 'undefined') {
                    res.send({
                        status: "501",
                        msg: "Missing Parameter"
                    });
                    return;
                } else {
                    if (routeConfigArr[i] == 'sign') {
                        continue;
                    }
                    signData[routeConfigArr[i]] = reqData[routeConfigArr[i]]
                }
            }
            if (RouterConfig[req.path].indexOf('sign') != -1 && Tools.checkMd5(signData) != reqData['sign']) {
                res.send({status: '501', msg: "Sign Error"});
                return;
            }
        }
        next();
    });

    app.get('/',(req,res)=>UserInfo.createUser(req,res)); //创建用户);
    app.get('/getBanner',(req,res)=>StarInfo.getBanner(req,res)) //banner数据
    app.get('/getStarList',(req,res)=>StarInfo.getStarList(req,res));//返回首页列表数据
};
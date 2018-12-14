/**
 * Created by Bkz on 2018/12/14.
 */


const mongodbHandle = require('../util/mongodb');

class StarInfo {

    async getBanner(req, res) {
        let data = await mongodbHandle.findInTableByQuery('pro', 'star_info', {}, {hot: -1}, 1);
        if (data && data.length > 0) {
            res.send({
                status: 1,
                msg: "ok",
                data: data
            });
        }
    }

    async getStarList(req,res){
        let data = req.query, page_size = 10, page_num = 1, skip_num = null, sort = null;
        if (data['page_size']) {
            page_size = Number(data['page_size']);
        }
        if (data['page_num']) {
            page_num = Number(data['page_num']);
        }
        skip_num = (page_num - 1) * page_size;
        sort = {'hot': 1};
        let tempData = await mongodbHandle.findInTableBySizeAndNum('pro','star_info',{},skip_num,page_size,sort);
        if(tempData ){
            res.send({
                status:1,
                msg:"ok",
                data:tempData
            })
        }else{
            res.send({
                status:-1,
                msg:"err",
                data:tempData
            })
        }


    }
}

module.exports = new StarInfo();
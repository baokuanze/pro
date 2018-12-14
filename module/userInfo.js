/**
 * Created by Bkz on 2018/12/13.
 */



const uuid = require('uuid');
const mongodbHandle = require('../util/mongodb');

class UserInfo {

    constructor() {
    }

    async createUser(req, res) {
        let uid = '';
        if (!req.session.uid) {
            uid = uuid.v1().replace(/\-/g, '');
            req.session.uid = uid;
        } else {
            uid = req.session.uid;
        }

        let findData = await mongodbHandle.findOneInTable('pro', 'user_info', {uid: uid, _id: uid});
        if (!findData) {
            let saveData = await mongodbHandle.saveTableData('pro', 'user_info', {uid: uid, _id: uid,new_user:true});
            if (saveData['uid']) {
                res.redirect(`https://nfbkz.top:3005/static/?uid=${uid}`);
            }
        } else {
            if (findData['uid']) {
                res.redirect(`https://nfbkz.top:3005/static/?uid=${uid}`);
            }
        }
    }
}

module.exports = new UserInfo();
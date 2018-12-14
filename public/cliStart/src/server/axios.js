/**
 * Created by Bkz on 2018/12/3.
 */

import Axios from 'axios';
import Md5 from './md5';

export default {
    /**
     * 普遍请求
     * @param url
     * @param data
     * @returns {*}
     */
    ev: "/",
    // ev:"https://fdtz.xintiao98.com/manager/",

    commonRequest(url, data,type) {
        data.sign = Md5(data);
        console.log('0000000000000')
        let tempUrl = this.ev + url;
        return this.request(tempUrl, data, type)
    },

    async request(url, data, type) {
        if (type) {
            let resData = Axios.post(url, data);
            return resData.data;
        }
        let resData = await Axios.get(url, {params: data});
        return resData.data
    }
}
/**
 * Created by Bkz on 2018/12/3.
 */


export  default {
    /**
     * unicode 解码
     * @param str
     */
    hexToDec: function (str) {
        str = str.replace(/\\/g, "%");
        return this.htmlDecode(unescape(str));
    },

    /**
     * unicode 编码
     * @param str
     * @returns {string}
     */
    decToHex: function (str) {
        var res = [];
        for (var i = 0; i < str.length; i++)
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    },
    /**
     * html实体转换
     * @param str
     * @returns {string}
     */
    htmlDecode: function (str) {
        var s = "";
        if (str.length == 0) return s;
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    },

    getQueryString:function (str) {
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
}
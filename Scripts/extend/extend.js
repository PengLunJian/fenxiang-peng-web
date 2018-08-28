/**
 * 截断文本空白
 * @param {} str 
 * @returns {} 
 */
function doTrim(str) {
    if (str == null)
        return null;
    str = str.trim();
    return str == "" ? null : str;
}

/**
 * 转转为日期对象
 * @param {} str 
 * @returns {} 
 */
function NewDate(str) {
    var date = new Date();
    if (!str || str === "0001-01-01T00:00:00")
        return date;
    var stra = str.split("T");
    if (stra.length < 2)
        return date;
    var ds = stra[0].split("-");
    if (parseInt(ds[0]) <= 1)
        return date;
    date.setUTCFullYear(ds[0], ds[1] - 1, ds[2]);
    var ts = stra[1].split(":");
    var ms = ts[2].split(".");
    date.setHours(parseInt(ts[0]), parseInt(ts[1]), parseInt(ms[0]), ms.length > 1 ? parseInt(ms[1]) : 0);
    return date;
}

/**
 * 日期格式化扩展
 * @param {} fmt 
 * @returns {} 
 */
Date.prototype.format = function (fmt) { //author: meizz 
    var year = this.getFullYear();
    if (!year || year <= 1900)
        return "";
    if (!this.fmta)
        this.fmta = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));
    for (var k in this.fmta) {
        if (this.fmta.hasOwnProperty(k)) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1,
                    (RegExp.$1.length == 1)
                    ? (this.fmta[k])
                    : (("00" + this.fmta[k]).substr(("" + this.fmta[k]).length)));
            }
        }
    }
    return fmt;
};

/**
 * 中文金额转换
 * @param {} n 
 * @returns {} 
 */
function ChinessMoneyInner(n) {
    var unit = "仟佰拾万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var p = n.indexOf(".");
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
/**
 * 中文金额转换
 * @param {} n 
 * @returns {} 
 */
function ChinessMoney(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "零元";
    if (n <= 0)
        return "零元";
    return ChinessMoneyInner(n);
}
/**
 * 中文金额转换
 * @param {} n 
 * @returns {} 
 */
function ChinessMoney2(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "零元";
    if (n <= 0)
        return "零元";
    return ChinessMoneyInner(n) + "(￥" + toThousands(n) + ")";
}

/**
 * /千分符数字表示法
 */
function toThousands(num) {
    if (!num || num == "")
        return "0.00";
    num = num.toString();
    if (num == "")
        return "0.00";

    var result;

    var ls;
    var p = num.indexOf(".");
    if (p >= 0) {
        result = num.substr(p, num.length - p);
        num = num.substring(0, p);
    } else {
        result = ".00";
    }
    while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/**
 * /千分符数字表示法
 */
function toThousandsInt(num) {
    if (!num || num == "")
        return "0";
    num = num.toString();
    if (num == "")
        return "0";

    var result;

    var ls;
    var p = num.indexOf(".");
    if (p >= 0) {
        result = num.substr(p, num.length - p);
        num = num.substring(0, p);
    } else {
        result = "";
    }
    while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}




/**
 * 通过数据取可读文本
 * @param {值} val 
 * @param {键值对应的数组} array 
 * @param {未命中的文本} err 
 * @returns {可读文本} 
 */
function arrayFormat(val, array, err) {
    if (!val)
        val = 0;
    for (var i = 0; i < array.length; i++)
        if (array[i].value == val)
            return array[i].text;
    return err == null ? "错误" + val : err;
}

/**
 * 星期几
 */
var weekDayType = [
    { value: 1, text: "星期一" },
    { value: 2, text: "星期二" },
    { value: 3, text: "星期三" },
    { value: 4, text: "星期四" },
    { value: 5, text: "星期五" },
    { value: 6, text: "星期六" },
    { value: 7, text: "星期天" }
];
/**
 * 星期几
 */
function weekDayTypeFormat(value) {
    return arrayFormat(value, weekDayType);
}

/**
 * 证件类型
 */
var certificateType2 = [
    { value: 0, text: "-" },
    { value: 1, text: "身份证" },
    { value: 2, text: "驾驶证" },
    { value: 3, text: "军官证" },
    { value: 4, text: "护照" },
    { value: 5, text: "营业执照" },
    { value: 6, text: "其它证件" }
];
/**
 * 证件类型
 */
function certificateTypeFormat(value,row) {
    return arrayFormat(value, certificateType2);
}

function boolFormat(val) {
    if (val)
        return "是";
    else
        return "否";
}
/**
 * 是否的类型
 */
var yesnoType = [
    { text: "是", value: 1 },
    { text: "否", value: 0 }
];
/**
 * 数据状态
 */
function yesnoFormat(value) {
    return arrayFormat(value, yesnoType);
}

/**
 * 是否的类型
 */
var okType = [
    { text: "★", value: 1 },
    { text: "", value: 0 }
];
/**
 * 数据状态
 */
function okFormat(value) {
    return arrayFormat(value, okType);
}
/**
 * 是否的类型
 */
var canType = [
    { text: "允许", value: true },
    { text: "拒绝", value: false }
];


/**
 * 性别类型
 */
function sexFormat(value) {
    switch (value) {
        case true:
            return "男";
        case false:
            return "女";
        default:
            return "-";
    }
}

/**
 * 性别类型
 */
var sexType = [
    { value: undefined, text: "-" },
    { value: null, text: "-" },
    { value: true, text: "男" },
    { value: false, text: "女" }
];
function thousandsFormat(value) {
    if (!value || value == 0)
        return ""; //"0.00";
    var txt = value.toString();
    var len = txt.length;
    var idx = txt.indexOf(".");
    if (idx <= 0) {
        txt += ".00";
        idx = len;
    } else if (len == idx + 1)
        txt += "00"; //补小数点后面两个0
    else if (len == idx + 2)
        txt += "0"; //补小数点后面一个0
    return toThousandsInt(txt.slice(0, idx)) + txt.slice(idx, idx + 3);
}

function moneyFormat(value) {
    return thousandsFormat(value);
}

function inputMoneyFormat(value) {
    if (!value || value == 0) return "0.00";
    var txt = value.toString();
    var len = txt.length;
    var idx = txt.indexOf(".");
    if (idx < 0)
        return txt + ".00";
    if (len == idx + 1)
        return txt + "00";
    if (len == idx + 2)
        return txt + "0";
    if (len == idx + 3)
        return txt;
    return txt.substr(0, txt.indexOf(".") + 3);
}

function dateFormat(value) {
    if (!value || value == "0001-01-01T00:00:00" || value == "1900-01-01T00:00:00")
        return "";
    var date = NewDate(value);
    if (!date)
        return "";
    return date.format("yyyy-MM-dd");
}

function dateTimeFormat(value) {
    if (!value || value == "0001-01-01T00:00:00" || value == "1900-01-01T00:00:00")
        return "";
    var date = NewDate(value);
    if (!date)
        return "";
    return date.format("yyyy-MM-dd hh:mm:ss");
}

function percentFormat(value) {
    var n = parseFloat(value);
    if (isNaN(n))
        return value;
    if (n === 0)
        return "-";
    return (Math.round(n * 10000) / 100).toFixed(2) + "%";
}
function percentFormat2(value) {
    var n = parseFloat(value);
    if (isNaN(n))
        return value;
    if (n === 0)
        return "-";
    return value + "%";
}

/**
 * 行级权限类型
 */
var dataScopeType = [
    { text: "无限制", value: 0 },
    { text: "本人", value: 1 },
    { text: "本区域", value: 4 },
    { text: "本区域及下级", value: 5 }
];

/**
 * 命令类型枚举类型
 */
var jobCommandType = [
    { value: 0, text: "未指定" },
    { value: 1, text: "新增" },
    { value: 10, text: "还原" },
    { value: 11, text: "审批" },
    { value: 12, text: "退回" },
    { value: 13, text: "通过" },
    { value: 14, text: "否决" },
    { value: 15, text: "归档" },
    { value: 16, text: "其它" },
    { value: 2, text: "编辑" },
    { value: 3, text: "阅读" },
    { value: 4, text: "校验" },
    { value: 5, text: "提交" },
    { value: 6, text: "删除" },
    { value: 7, text: "启用" },
    { value: 8, text: "禁用" },
    { value: 9, text: "废弃" }
];

/**
 * 命令类型枚举类型之表格格式化方法
 */
function jobCommandTypeFormat(value) {
    return arrayFormat(value, jobCommandType);
}

/**
 * 工作内容状态枚举类型
 */
var jobStatusType = [
    { value: 0, text: "未开始" },
    { value: 1, text: "已发出" },
    { value: 16, text: "完成" },
    { value: 17, text: "失败" },
    { value: 18, text: "未命中" },
    { value: 2, text: "已接受" },
    { value: 3, text: "挂起" }
];

/**
 * 工作内容状态枚举类型之表格格式化方法
 */
function jobStatusTypeFormat(value) {
    return arrayFormat(value, jobStatusType);
}


/**
 * 数据状态
 */
var dataStateType = [
    { value: 0x100, text: "-" },
    { value: 0, text: "草稿" },
    { value: 1, text: "启用" },
    { value: 2, text: "停用" },
    { value: 0xE, text: "查看" },
    { value: 0xF, text: "锁定" },
    { value: 0x10, text: "废弃" },
    { value: 0xFF, text: "删除" }
];
/**
 * 审核状态
 */
var auditType = [
    { value: 0x100, text: "-" },
    { value: 0, text: "草稿" },
    { value: 0x11, text: "未审核" },
    { value: 0x12, text: "未结束" },
    { value: 1, text: "重做" },
    { value: 2, text: "提交" },
    { value: 3, text: "否决" },
    { value: 4, text: "通过" },
    { value: 5, text: "结束" },
    { value: 0x10, text: "废弃" },
    { value: 0x13, text: "停用" },
    { value: 0xFF, text: "删除" }
];
/**
 * 数据状态
 */
function dataStateFormat(value) {
    return arrayFormat(value, dataStateType);
}

/**
 * 审核状态
 */
function auditFormat(value) {
    return arrayFormat(value, auditType);
}

function auditIconFormat(value, row) {
    if (row.IsFreeze) {
        return iconCell("icon_a_end", 16);
    }
    switch (row.AuditState) {
        case 0:
            return dataStateIcon(value, row);
        case 1:
            return dataStateIcon(value, row, "icon_a_again");
        case 2:
            return iconCell("icon_a_submit", 16);
        case 3:
            return iconCell("icon_a_deny", 16);
        case 4:
            return dataStateIcon(value, row, "icon_a_pass");
        case 5:
            return iconCell("icon_a_end", 16);
        default:
            return "icon-cus";
    }
}
function dataStateIconFormat(value, row) {
    return dataStateIcon(value, row, null);
}

function dataStateIcon(value, row, ena) {
    if (row.IsFreeze) {
        return iconCell("icon_a_end", 16, row._info_);
    }
    switch (row.DataState) {
        case 0:
            return iconCell("icon_a_none", 16, row._info_);
        case 1:
            return iconCell(ena ? ena : "icon-enable", 16, row._info_);
        case 2:
            return iconCell("icon-disable", 16, row._info_);
        case 0xE:
            return iconCell("icon-cus", 16, row._info_);
        case 0xF:
            return iconCell("icon_a_end", 16, row._info_);
        case 0x10:
            return iconCell("icon-discard", 16, row._info_);
        case 255:
            return iconCell("icon-delete", 16, row._info_);
        default:
            return "icon-cus";
    }
}
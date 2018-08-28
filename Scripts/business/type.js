
/**
 * Level短名字
 */
window.OrganizationAbbr = "org"; 
/**
 * Level短名字
 */
window.ConstructionLevel = "cp";
/**
 * Level短名字
 */
window.PlanLevel = "mp";
/**
 * Level短名字
 */
window.OperationLevel = "op"; 
/**
 * Level短名字
 */
window.NegotiateLevel = "ne";
/**
 * Level短名字
 */
window.ContractLevel = "co";
/**
 * 附件枚举类型
 */
var annexType = [
    { value: 0, text: "未知" },
    { value: 1, text: "Word文档" },
    { value: 2, text: "Excel文档" },
    { value: 3, text: "PDF文档" },
    { value: 4, text: "声音文件" },
    { value: 5, text: "视频文件" },
    { value: 6, text: "图片文件" },
    { value: 7, text: "PPT文件" },
    { value: 8, text: "WPS文件" },
    { value: 9, text: "文本文件" }
];

/**
 * 附件枚举类型之表格格式化方法
 */
function annexTypeFormat(value) {
    return arrayFormat(value, annexType);
}
/**
 * 栏目枚举类型
 */
var articleColumnType = [
    { value: 0, text: "其它" },
    { value: 1, text: "长白山概况" },
    { value: 2, text: "投资环境" },
    { value: 3, text: "投资政策" },
    { value: 4, text: "投资项目" },
    { value: 5, text: "投资案例" },
    { value: 6, text: "招商要闻" },
    { value: 7, text: "通知公告" },
    { value: 8, text: "关于我们" }
];

/**
 * 栏目枚举类型之表格格式化方法
 */
function articleColumnTypeFormat(value) {
    return arrayFormat(value, articleColumnType);
}
/**
 * 排序级别枚举类型
 */
var articleLevelType = [
    { value: 0, text: "未分级" },
    { value: 1, text: "一般" },
    { value: 2, text: "重要" },
    { value: 3, text: "热门" },
    { value: 4, text: "焦点" },
    { value: 5, text: "头条" },
    { value: 6, text: "栏目介绍" }
];

/**
 * 排序级别枚举类型之表格格式化方法
 */
function articleLevelTypeFormat(value) {
    return arrayFormat(value, articleLevelType);
}


/**
 * 评审结果枚举类型
 */
var attitudeType = [
    { value: 0, text: "无" },
    { value: 1, text: "赞成" },
    { value: 2, text: "反对" }
];

/**
 * 评审结果枚举类型之表格格式化方法
 */
function attitudeTypeFormat(value) {
    return arrayFormat(value, attitudeType);
}


/**
 * 会议类型枚举
 */
var meetingType = [
    { value: 0, text: "普通会议" },
    { value: 1, text: "洽谈会议" },
    { value: 2, text: "签约仪式" },
    { value: 3, text: "项目跟踪会议" },
    { value: 4, text: "项目跟踪会议" },
    { value: 5, text: "项目验收会议" },
    { value: 6, text: "项目清退会议" },
    { value: 7, text: "项目谋划会议" },
    { value: 8, text: "项目评价会议" }
];

/**
 * 会议类型枚举之表格格式化方法
 */
function meetingTypeFormat(value) {
    return arrayFormat(value, meetingType);
}

/**
 * 指标类型枚举类型
 */
var normType = [
    { value: 0, text: "无" },
    { value: 1, text: "文本" },
    { value: 2, text: "文章" },
    { value: 3, text: "数字" },
    { value: 4, text: "日期" },
    { value: 5, text: "日期时间" },
    { value: 6, text: "是否" },
    { value: 7, text: "单选" },
    { value: 8, text: "多选" },
    { value: 9, text: "文档" }
];

/**
 * 指标类型枚举类型之表格格式化方法
 */
function normTypeFormat(value) {
    return arrayFormat(value, normType);
}

/**
 * 机构类型
 */
var organizationType = [
    { value: 0, text: "未确定" },
    { value: 1, text: "行政区域" },
    { value: 2, text: "机构" },
    { value: 3, text: "部门" }
];

/**
 * 机构类型之表格格式化方法
 */
function organizationTypeFormat(value) {
    return arrayFormat(value, organizationType);
}

/**
 * 手续状态枚举类型
 */
var procedureRateType = [
    { value: 0, text: "-" },
    { value: 1, text: "办理中" },
    { value: 2, text: "办结" },
    { value: 3, text: "无法办理" }
];

/**
 * 手续状态枚举类型之表格格式化方法
 */
function procedureRateTypeFormat(value) {
    return arrayFormat(value, procedureRateType);
}


/**
 * 项目阶段枚举类型
 */
var projectLevelType = [
    { value: 0, text: "-" },
    { value: 1, text: "谋划项目" },
    { value: 2, text: "洽谈项目" },
    { value: 3, text: "签约项目" },
    { value: 4, text: "建设项目" },
    { value: 5, text: "投产项目" },
    { value: 6, text: "清退项目" },
    { value: 7, text: "关闭" }
];

/**
 * 项目阶段枚举类型之表格格式化方法
 */
function projectLevelTypeFormat(value) {
    return arrayFormat(value, projectLevelType);
}

/**
 * 项目步骤枚举类型
 */
var projectStepType = [
    { value: 0, text: "新增项目" },
    { value: 1, text: "项目填报" },
    { value: 2, text: "项目审核" },
    { value: 3, text: "项目推介" },
    { value: 4, text: "意向企业登记" },
    { value: 5, text: "项目洽谈" },
    { value: 6, text: "项目签约" },
    { value: 7, text: "签约仪式" },
    { value: 8, text: "前期手续办理" },
    { value: 9, text: "在建项目" },
    { value: 10, text: "项目建设" },
    { value: 11, text: "后期手续办理" },
    { value: 12, text: "竣工项目管理" },
    { value: 13, text: "投产项目" },
    { value: 15, text: "项目跟踪" },
    { value: 14, text: "项目评价" },
    { value: 16, text: "项目清退" },
    { value: 17, text: "重新招商" },
    { value: 18, text: "项目关闭" }
];

/**
 * 项目步骤枚举类型之表格格式化方法
 */
function projectStepTypeFormat(value) {
    return arrayFormat(value, projectStepType);
}

/**
 * 推荐枚举类型
 */
var recommendType = [
    { value: 0, text: "无" },
    { value: 1, text: "网站可见" },
    { value: 2, text: "首页推荐" }
];

/**
 * 推荐枚举类型之表格格式化方法
 */
function recommendTypeFormat(value) {
    return arrayFormat(value, recommendType);
}

/**
 * 用户任务分类枚举类型
 */
var userJobType = [
    { value: 0, text: "未指定" },
    { value: 1, text: "编辑任务" },
    { value: 2, text: "审核任务" },
    { value: 3, text: "数据维护" },
    { value: 4, text: "其它命令" }
];

/**
 * 用户任务分类枚举类型之表格格式化方法
 */
function userJobTypeFormat(value) {
    return arrayFormat(value, userJobType);
}

/**
 * 活动类型枚举类型
 */
var activityType = [
    { value: 0, text: '未知' },
    { value: 1, text: '走出去' },
    { value: 2, text: '请进来' }
];

/**
 * 活动类型枚举类型之表格格式化方法
 */
function activityTypeFormat(value) {
    return arrayFormat(value, activityType);
}

/**
 * 征集类型枚举类型
 */
var ideaType = [
    { value: 0, text: '项目征集' },
    { value: 1, text: '投资咨询' }
];

/**
 * 征集类型枚举类型之表格格式化方法
 */
function ideaTypeFormat(value) {
    return arrayFormat(value, ideaType);
}

/**
 * 办理阶段枚举类型
 */
var procedureLevelType = [
    { value: 0, text: '前后期均可' },
    { value: 1, text: '前期办理' },
    { value: 2, text: '后期办理' }
];

/**
 * 办理阶段枚举类型之表格格式化方法
 */
function procedureLevelTypeFormat(value) {
    return arrayFormat(value, procedureLevelType);
}

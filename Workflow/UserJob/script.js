﻿/*此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/23 17:46:57*/
/*
    用户工作列表的前端操作类对象,实现基本的增删改查的界面操作
*/
var UserJobPage = {
    /**
     * 表格对象
     */
    grid: null,
    /**
     * 标题
     */
    title:"用户工作列表",
    /**
     * 命令执行地址前缀
     */
    cmdPath: "",
    /**
     * 列表的URL
     */
    listUrl: "Action.aspx?action=list",
    /**
     * 列表的URL的扩展参数
     */
    urlArg: "",
    /**
     * 表单地址
     */
    formUrl: "Form.htm",
    /**
     * 表单参数
     */
    formArg: "_-_=1",
    /**
     * 是否自动载入数据
     */
    autoLoad: true,
    /**
     * 是否最小系统
     */
    isSmall: false,
    /**
     * 默认支持命令按钮的名称后缀
     */
    cmdElementEx: "",
    /**
     * 表节点名称
     */
    gridId: "#grid",
    /**
     * 工具栏节点名称
     */
    toolbarId: "#pageToolbarEx",
    /**
     * 当前录入是否校验正确
     */
    inputSucceed: true,
    /*
        用户工作列表的页面初始化
    */
    initialize: function() {
        var me = this;
        if(!me.isSmall)
            me.initHistoryQuery();
        me.initGrid();
        me.initToolBar();
    },
    /*
        初始化工具栏
    */
    initToolBar: function() {
        var me = this;
    },
    /*
        初始化列表表格
    */
    initGrid: function() {
        var me = this;
        var grid = new GridPanel();
        me.grid=grid;
        grid.ex = me;
        grid.auditData = false;
        grid.historyData = false;
        grid.stateData = true;
        grid.idField = "Id";
        grid.cmdPath = me.cmdPath;
        grid.pageSize = 20;
        grid.elementId = this.gridId;
        grid.toolbar = this.toolbarId;
        grid.elementEx = me.cmdElementEx;
        grid.columns = me.columns;
        grid.edit = me.edit;
        grid.addNew = me.addNew;
        if(!me.isSmall){
            grid.getQueryParams = function(){try {return me.getQueryParams();} catch (e) {return {};}};
        grid.historyData = false;
        grid.auditData = false;
        }
        if(me.autoLoad){
            me.setUrlArgs(me.urlArg);
        }
        grid.initialize();
    },
    /*
        改变列表参数
    */
    setUrlArgs: function (args) {
        var me = this;
        me.urlArg = args && args != "" ? args : "_-_=1";
        me.formArg = args && args != "" ? args : "_-_=1";
        me.grid.changedUrl(me.cmdPath + me.listUrl + "&" + args);
    },
    /*
        历史查询条件还原
    */
    initHistoryQuery: function() {
        $("#qKeyWord").textbox("setValue", preQueryArgs.keyWord);
        
        if (!preQueryArgs.dataState|| preQueryArgs.dataState > 0x100)
            preQueryArgs.dataState = 0x100;
        $("#qAudit").combobox("setValue", preQueryArgs.dataState); 
    },
    /*
        读取查询条件
    */
    getQueryParams: function () {
        return {
            keyWord:$("#qKeyWord").textbox("getValue")
            ,dataState: $("#qAudit").combobox("getValue")
        };
    },
    /*
        重新载入用户工作列表的列表数据
    */
    reload:function() {
        $(this.gridId).datagrid("reload");
    },
    /*
        录入界面载入时执行控件初始化
    */
    onFormUiLoaded: function (editor,callback) {
        var me = editor.ex;
        me.setFormValidate();
        //TO DO:控件初始化代码
        
        if (callback)
            callback();
    },
    /*
        录入界面数据载入后给Form赋值前,对数据进行预处理
    */
    onFormDataLoaded: function (data, editor) {
        //var me = editor.ex;
        //TO DO:数据预处理
    },
    /*
        录入界面数据载入后且已给Form赋值,对进行界面逻辑处理
    */
    afterFormDataLoaded: function (data, editor) {
        var me = editor.ex;
        me.inputSucceed = true;
        //TO DO:界面逻辑处理
    },
    /*
        录入界面数据校验
    */
    doFormValidate: function() {
        var me = this;
        //TO DO:数据校验
        return me.NoError;
    },
    /*
        设置校验规则
    */
    setFormValidate: function() {
        $("#Title").textbox({required:true,validType:["strLimit[0,50]"]});
        $("#Message").textbox({validType:["strLimit[0,50]"]});
        $("#ToUserId").combobox({validType:['selectNoZero["#ToUserId"]']});

    },

    /**
     * 生成用户工作列表的编辑器
     * @param {UserJobPage} me 当前页面对象
     * @returns {EditorDialog} 编辑器
     */
    createEditor: function (me) {
        var editor = new EditorDialog();
        editor.ex = me;
        editor.title = me.title;
        if(me.grid.auditData) {
            editor.showValidate = true;
            editor.validatePath = me.cmdPath + "Action.aspx";
            editor.setFormValidate= me.setFormValidate;
        }
        editor.onUiLoaded = function (ed, callback) {
            me.onFormUiLoaded(ed, callback);
        };
        editor.onDataLoaded = function (data, ed) {
            me.onFormDataLoaded(data, ed);
        };
        editor.afterDataLoaded = function (data, ed) {
            me.afterFormDataLoaded(data, ed);
        };
        editor.afterSave = function(succeed, data) {
            if (succeed)
            me.reload();
        };
        return editor;
    },
    /*
        新增一条用户工作列表的界面操作
    */
    addNew: function () {
        var me = this.ex;
        var editor = me.createEditor(me);
        editor.uiUrl = me.formUrl + "?" + me.formArg + "&id=0";
        if(me.urlArg)
            editor.dataUrl = me.cmdPath + "Action.aspx?action=details&" + me.urlArg + "&id=";
        else
            editor.dataUrl = me.cmdPath + "Action.aspx?action=details&id=";
        editor.saveUrl = me.cmdPath + "Action.aspx?action=addnew&id=";
        editor.dataId = 0;
        editor.show();
    },
    /*
        修改或查看用户工作列表的界面操作
    */
    edit: function (id) {
        var me = this.ex;
        var editor = me.createEditor(me);
        editor.uiUrl = me.formUrl + "?" + me.formArg + "&id=" + id;
        editor.dataUrl = me.cmdPath + "Action.aspx?action=details&id=";
        editor.saveUrl = me.cmdPath + "Action.aspx?action=update&id=";
        editor.dataId = id;
        editor.show();
    },
    /*
        列表表格的列信息
    */
    columns:
    [
       [
            { styler: vlStyle, halign: "center", align: "center", field: "IsSelected", checkbox: true}
            //, { styler: vlStyle, halign: 'center', align: 'center', sortable: true, field: 'Id', title: 'ID'}
            , { styler: vlStyle, halign: "center", align: "center", sortable: true, field: "DataState", title: "状态", formatter: dataStateIconFormat }
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "Title", title: "标题"}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "Date", title: "发生日期", formatter: dateFormat}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "Message", title: "工作消息"}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "JobType", title: "任务分类", formatter: userJobTypeFormat}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "JobStatus", title: "工作状态", formatter: jobStatusTypeFormat}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "CommandType", title: "命令类型", formatter: jobCommandTypeFormat}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "ToUserName", title: "目标用户名字"}
            , { styler: vlStyle,width:1, halign: "center", align: "left", sortable: true, field: "FromUserName", title: "来源用户名字"}
        ]
    ]
};
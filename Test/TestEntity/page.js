﻿/*此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2018/8/24 18:01:53*/
/*
    TestEntity的前端操作类对象,实现基本的增删改查的界面操作
*/
var TestEntityPage = {
    /**
     * 表格对象
     */
    grid: null,
    /**
     * 标题
     */
    title:'TestEntity',
    /**
     * 命令执行地址前缀
     */
    cmdPath: '',
    /**
     * 列表的URL
     */
    listUrl: 'Action.aspx?action=list',
    /**
     * 列表的URL的扩展参数
     */
    urlArg: '',
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
    cmdElementEx: '',
    /**
     * 表节点名称
     */
    gridId: '#grid',
    /**
     * 工具栏节点名称
     */
    toolbarId: '#pageToolbarEx',
    /**
     * 表单地址
     */
    formUrl: 'Form.htm',
    /**
     * 表单对象
     */
    formOption: null,
    /*
        TestEntity的页面初始化
    */
    initialize: function () {
        var me = this;
        if(!me.isSmall)
            me.initHistoryQuery();
        me.initForm();
        me.initToolBar();
        me.initGrid();
    },
    /*
        项目洽谈的录入对象初始化
    */
    initForm: function () {
        var me = this;
        me.formOption = Object.create(TestEntityForm);
        me.formOption.afterFormSaved = function (succeed) {
            if (succeed)
                me.reload();
        }
    },
    /*
        改变列表参数
    */
    setUrlArgs: function (args) {
        var me = this;
        me.urlArg = args && args != '' ? args : '_-_=1';
        me.formArg = args && args != '' ? args : '_-_=1';
        me.grid.changedUrl(me.cmdPath + me.listUrl + '&' + args);
    },
    /*
        初始化工具栏
    */
    initToolBar: function() {
        var me = this;
    },

    /*
        历史查询条件还原
    */
    initHistoryQuery: function() {
        $('#qKeyWord').textbox('setValue', preQueryArgs.keyWord);
        
    },
    /*
        读取查询条件
    */
    getQueryParams: function () {
        return {
            keyWord:$('#qKeyWord').textbox('getValue')
            
        };
    },
    /*
        重新载入TestEntity的列表数据
    */
    reload:function() {
        $(this.gridId).datagrid('reload');
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
        grid.stateData = false;
        grid.idField = 'Id';
        grid.cmdPath = me.cmdPath;
        grid.pageSize = 20;
        grid.elementId = me.gridId;
        grid.toolbar = me.toolbarId;
        grid.elementEx = me.cmdElementEx;
        grid.columns = me.columns;
        grid.edit = function(id){
            me.formOption.formUrl = me.formUrl;
            me.formOption.formArg = me.formArg;
            me.formOption.title = me.title;
            me.formOption.edit(id);
        };
        grid.addNew = function(){
            me.formOption.formUrl = me.formUrl;
            me.formOption.formArg = me.formArg;
            me.formOption.title = me.title;
            me.formOption.addNew();
        };
        if(!me.isSmall){
            grid.getQueryParams = me.getQueryParams;
        }
        if(me.autoLoad){
            me.setUrlArgs(me.urlArg);
        }
        grid.initialize();
    },
    /*
        列表表格的列信息
    */
    columns:
    [
       [
            { styler: vlStyle, halign: 'center', align: 'center', field: 'IsSelected', checkbox: true}
            //, { styler: vlStyle, halign: 'center', align: 'center', sortable: true, field: 'Id', title: 'ID'}
            , { styler: vlStyle,width:3, halign: 'center', align: 'left', sortable: true, field: 'Name', title: '名称'}
        ]
    ]
};
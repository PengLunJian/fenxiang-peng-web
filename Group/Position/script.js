﻿/*此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2018/8/26 22:58:49*/
/*
*   职位字典的前端操作类对象,实现基本的增删改查的界面操作
*/
var page = {
    /**
    表格对象
     */
    grid: null,
    /**
     * 标题
     */
    title:'职位字典',
    /**
     * 名称
     */
    name: 'PositionData',
    /**
     * API前缀
     */
    apiPrefix: 'org/pos/v1/',
    /**
     * 列表的URL
     */
    listUrl: 'edit/list',
    /**
     * 列表的URL的扩展参数
     */
    urlArg: '',
    /**
     * 表单地址
     */
    formUrl: 'Form.htm',
    /**
     * 表单参数
     */
    formArg: '_-_=1',
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
     * 当前录入是否校验正确
     */
    inputSucceed: true,
    /**
     * 职位字典的页面初始化
    */
    initialize: function() {
        var me = this;
        if(!me.isSmall)
            me.initHistoryQuery();
        me.initGrid();
        me.initToolBar();
    },
    /**
     * 初始化工具栏
    */
    initToolBar: function() {
        var me = this;
    },
    /**
     * 初始化列表表格
    */
    initGrid: function() {
        var me = this;
        var grid = new GridPanel();
        me.grid=grid;
        grid.tag = me;
        grid.idField = 'Id';
        grid.cmdPath = page.apiPrefix;
        grid.auditData = false;
        grid.historyData = false;
        grid.stateData = false;
        grid.pageSize = 20;
        grid.elementId = this.gridId;
        grid.toolbar = this.toolbarId;
        grid.elementEx = me.cmdElementEx;
        grid.columns = me.columns;
        grid.edit = me.edit;
        grid.addNew = me.addNew;
        if(!me.isSmall){
            grid.getQueryParams = me.getQueryParams;
        }
        if(me.autoLoad){
            me.setUrlArgs(me.urlArg);
        }
        grid.initialize();
    },
    /**
    * 改变列表参数
    */
    setUrlArgs: function (args) {
        var me = this;
        if (args && args != '') {
            me.urlArg = args;
            me.formArg = args;
            me.grid.changedUrl(me.apiPrefix + me.listUrl + '?' + args);
        } else {
            me.formArg = me.urlArg = '_-_=1';
            me.grid.changedUrl(me.apiPrefix + me.listUrl);
        }
    },
    /**
    *    历史查询条件还原
    */
    initHistoryQuery: function() {
        $('#qKeyWord').textbox('setValue', preQueryArgs.keyWord);
        
    },
    /**
    * 读取查询条件
    */
    getQueryParams: function () {
        return {
            keyWord:$('#qKeyWord').textbox('getValue')
            
        };
    },
    /**
    *  重新载入职位字典的列表数据
    */
    reload:function() {
        $(this.gridId).datagrid('reload');
    },
    /**
    *    录入界面载入时执行控件初始化
    */
    onFormUiLoaded: function (editor,callback) {
        var me = editor.ex;
        me.setFormValidate();
        //TO DO:控件初始化代码
        
        if (callback)
            callback();
    },
    /**
    *     录入界面数据载入后给Form赋值前,对数据进行预处理
    */
    onFormDataLoaded: function (data, editor) {
        //var me = editor.ex;
        //TO DO:数据预处理
    },
    /**
    *    录入界面数据载入后且已给Form赋值,对进行界面逻辑处理
    */
    afterFormDataLoaded: function (data, editor) {
        var me = editor.ex;
        me.inputSucceed = true;
        //TO DO:界面逻辑处理
    },
    /**
    *    录入界面数据校验
    */
    doFormValidate: function() {
        var me = this;
        //TO DO:数据校验
        return me.NoError;
    },
    /**
    *     设置校验规则
    */
    setFormValidate: function() {
        $('#Id').textbox({validType:['noZero[0]']});
        $('#FullName').textbox({validType:['strLimit[0,200]']});
        $('#ShortName').textbox({required:true,validType:['strLimit[0,200]']});

    },

    /**
     * 生成职位字典的编辑器
     * @param {PositionPage} me 当前页面对象
     * @returns {EditorDialog} 编辑器
     */
    createEditor: function (me) {
        var editor = new EditorDialog();
        editor.ex = me;
        editor.title = me.title;
        if(me.grid.auditData) {
            editor.showValidate = true;
            editor.validatePath = me.apiPrefix + 'audit/validate';
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
            me.reload();
        };
        return editor;
    },
    /*
        新增一条职位字典的界面操作
    */
    addNew: function () {
        var me = this.tag;
        var editor = me.createEditor(me);
        editor.uiUrl = me.formUrl + '?' + me.formArg + '&id=0';
        if(me.urlArg)
            editor.dataUrl = me.apiPrefix + 'edit/details?' + me.urlArg + '&id=';
        else
            editor.dataUrl = me.apiPrefix + 'edit/details?id=';
        editor.saveUrl = me.apiPrefix + 'edit/addnew?id=';
        editor.dataId = 0;
        editor.show();
    },
    /*
        修改或查看职位字典的界面操作
    */
    edit: function (id) {
        var me = this.ex;
        var editor = me.createEditor(me);
        editor.uiUrl = me.formUrl + '?' + me.formArg + '&id=' + id;
        editor.dataUrl = me.apiPrefix + 'edit/details?id=';
        editor.saveUrl = me.apiPrefix + 'edit/update?id=';
        editor.dataId = id;
        editor.show();
    },
    /*
        列表表格的列信息
    */
    columns:
    [
       [
            { styler: vlStyle, halign: 'center', align: 'center', field: 'IsSelected', checkbox: true}
            , { styler: vlStyle, halign: 'center', align: 'center', sortable: true, field: 'Id', title: 'ID'}
            , { styler: vlStyle,width:3, halign: 'center', align: 'left', sortable: true, field: 'FullName', title: '全称'}
            , { styler: vlStyle,width:3, halign: 'center', align: 'left', sortable: true, field: 'ShortName', title: '简称'}
            , { styler: vlStyle,width:3, halign: 'center', align: 'left', sortable: true, field: 'PositionLevel', title: '级别'}
            , { styler: vlStyle,width:3, halign: 'center', align: 'left', sortable: true, field: 'Memo', title: '备注'}
        ]
    ]
};

/**
 * 依赖功能扩展
 */
mainPageOptions.extend({
    doPageInitialize: function (callback) {
        ajaxLoadValue('载入', 'sys/page/v1/global/info', { value: page.name }, function (data) {
            mainPageOptions.currentPageId = data.pageId;
            mainPageOptions.userButtons = data.buttons;
            mainPageOptions.allButton = data.allButton;
            mainPageOptions.setPreQueryArgs(data.preQueryArgs);


            page.formUrl = '/Group/Position/Form.htm';
            page.initialize();
            callback();
        });
    },
    onCheckSize: function (wid, hei) {

                $('#grid').datagrid('resize', window.o99);
    }
});
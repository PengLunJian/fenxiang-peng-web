/**
* 系统用户的前端操作类对象,实现基本的增删改查的界面操作
*/
var page = {
    /**
     * 表格对象
     */
    grid: null,
    /**
     * 标题
     */
    title: "系统用户",
    /**
     * 名称
     */
    name: "UserData",

    /**
     * API前缀
     */
    apiPrefix: "sys/user/v1/",
    /**
     * 列表的URL
     */
    listUrl: "edit/list",
    /**
     * 列表的URL的扩展参数
     */
    urlArg: "",
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
     * 表单地址
     */
    formUrl: "Form.htm",
    /**
     * 表单对象
     */
    formOption: null,
    /*
        系统用户的页面初始化
    */
    initialize: function () {
        var me = this;
        if (!me.isSmall)
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
        me.formOption = Object.create(UserForm);
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
        if (args && args != '') {
            me.urlArg = args;
            me.formArg = args;
            me.grid.changedUrl(me.apiPrefix + me.listUrl + '?' + args);
        } else {
            me.formArg = me.urlArg = '_-_=1';
            me.grid.changedUrl(me.apiPrefix + me.listUrl);
        }
    },
    /*
        初始化工具栏
    */
    initToolBar: function () {
        var me = this;
        createRoleButton("重置密码", "edit/reset_pwd", "#btnResetPwd", "icon-flush", function () {
            me.grid.doRemote("重置密码", me.apiPrefix + "edit/reset_pwd");
        });
    },

    /*
        历史查询条件还原
    */
    initHistoryQuery: function () {
        $("#__txt_query").textbox("setValue", preQueryArgs.name);
    },
    /*
        读取查询条件
    */
    getQueryParams: function () {
        return {
            name: $("#__txt_query").textbox("getValue")
        };
    },
    /*
        重新载入系统用户的列表数据
    */
    reload: function () {
        $(this.gridId).datagrid("reload");
    },
    /*
        初始化列表表格
    */
    initGrid: function () {
        var me = this;
        var grid = new GridPanel();
        me.grid = grid;
        grid.ex = me;
        grid.auditData = true;
        grid.historyData = true;
        grid.stateData = true;
        grid.idField = "Id";
        grid.cmdPath = me.apiPrefix;
        grid.pageSize = 20;
        grid.elementId = me.gridId;
        grid.toolbar = me.toolbarId;
        grid.elementEx = me.cmdElementEx;
        grid.columns = me.columns;
        grid.edit = function (id) {
            me.formOption.formUrl = me.formUrl;
            me.formOption.formArg = me.formArg;
            me.formOption.title = me.title;
            me.formOption.edit(id);
        };
        grid.addNew = function () {
            me.formOption.formUrl = me.formUrl;
            me.formOption.formArg = me.formArg;
            me.formOption.title = me.title;
            me.formOption.addNew();
        };
        if (!me.isSmall) {
            grid.getQueryParams = function () { try { return me.getQueryParams(); } catch (e) { return {}; } };
        }
        if (me.autoLoad) {
            me.setUrlArgs(me.urlArg);
        }
        grid.initialize();
    },
    /*
        列表表格的列信息
    */
    columns: [[
        { styler: vlStyle, halign: "center", align: "center", field: "IsSelected", checkbox: true }
        //, { styler: vlStyle, halign: 'center', align: 'center', sortable: true, field: 'Id', title: 'ID'}
        , { styler: vlStyle, halign: "center", align: "center", sortable: true, field: "AuditState", title: "状态", formatter: auditIconFormat }
        , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "RealName", title: "姓名" }
        , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "UserName", title: "用户名" }
        , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "PassWord", title: "密码" }
        , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "Role", title: "角色" }
        , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "Memo", title: "备注" }
    ]]
};

/**
 * 依赖功能扩展
 */
mainPageOptions.extend({
    doPageInitialize: function (callback) {
        ajaxLoadValue("载入", "sys/page/v1/global/info", { value: page.name }, function (data) {
            mainPageOptions.currentPageId = data.pageId;
            mainPageOptions.userButtons = data.buttons;
            mainPageOptions.allButton = data.allButton;
            mainPageOptions.setPreQueryArgs(data.preQueryArgs);
            page.initialize();
            callback();
        });
    },
    onCheckSize: function (wid, hei) {
        $('#grid').datagrid('resize', window.o99);
    }
});
/*design by:agebull designer date:2017/5/26 22:15:18*/
/*
    人员职位设置的前端操作类对象,实现基本的增删改查
*/
var PositionPersonnelPage = {
    /**
     * 表格对象
     */
    grid: null,
    /**
     * 标题
     */
    title: "人员职位设置",
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
     * 是否自动载入数据
     */
    autoLoad: true,
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
        人员职位设置的页面初始化
    */
    initialize: function () {
        var me = this;
        me.initForm();
        this.initTree();
        this.initGrid();
        this.initHistoryQuery();
    },
    /**
     * 当前组织ID
     */
    curOid: 0,
    /**
     * 当前职位ID
     */
    curPid: 0,
    /*
        项目洽谈的录入对象初始化
    */
    initForm: function () {
        var me = this;
        me.formOption = Object.create(PositionPersonnelForm);
        //me.formOption.formUrl = me.formUrl;
        me.formOption.formArg = me.formArg;
        me.formOption.afterFormSaved = function (succeed) {
            if (succeed)
                me.reload();
        }
    },
    /**
     * 初始化组织树
     */
    initTree: function () {
        var me = this;
        $("#tree").tree({
            url: "Action.aspx?action=tree",
            iconCls: "icon-details",
            lines: true,
            //onDblClick
            onSelect: function (node) {
                if (node.attributes === "post") {
                    me.curOid = parseInt(node.tag);
                    me.curPid = parseInt(node.id);
                    me.setUrlArgs("pid=" + me.curPid);
                } else {
                    me.curPid = 0;
                    me.curOid = parseInt(node.tag);
                    me.setUrlArgs("oid=" + me.curOid);
                }
            }
        });
    },
    /*
        改变列表参数
    */
    setUrlArgs: function (args) {
        var me = this;
        me.urlArg = args && args != "" ? args : "_-_=1";
        me.formOption.formArg = args && args != "" ? args : "_-_=1";
        me.grid.changedUrl(me.cmdPath + me.listUrl + "&" + args);
    },
    /*
        重新载入职位组织关联的列表数据
    */
    reload: function () {
        $("#grid").datagrid("reload");
    },
    /*
        初始化列表表格
    */
    initGrid: function () {
        var me = this;
        var grid = new GridPanel();
        grid.ex = this;
        grid.auditData = true;
        grid.historyData = true;
        grid.stateData = true;
        grid.idField = "Id";
        //grid.cmdPath = '/';
        grid.pageSize = 20;
        grid.isListDetails = true;
        grid.elementId = "#grid";
        grid.toolbar = "#pageToolbarEx";
        grid.elementEx = "";
        grid.edit = function (id) {
            me.formOption.edit(id);
        };
        grid.addNew = function () {
            me.formOption.addNew();
        };
        grid.getQueryParams = this.getQueryParams;
        grid.remove = grid.doRemove;
        grid.columns = this.columns;
        grid.listUrl = "action.aspx?action=list";
        grid.initialize();
        this.grid = grid;
    },
    /*
        历史查询条件还原
    */
    initHistoryQuery: function () {
        if(!preQueryArgs.audit)
            preQueryArgs.audit = 0x100;;
        $("#qAudit").combobox("setValue", preQueryArgs.audit);
        $("#qKeyWord").textbox("setValue", preQueryArgs.keyWord);
    },
    /*
        读取查询条件
    */
    getQueryParams: function () {
        return {
            audit: $("#qAudit").combobox("getValue"),
            keyWord:$("#qKeyWord").textbox("getValue")
        };
    },
    /*
        列表表格的列信息
    */
    columns:
    [
        [
            { styler: vlStyle, halign: "center", align: "center", field: "IsSelected", checkbox: true }
            , { styler: vlStyle, halign: "center", align: "center", sortable: true, field: "DataState", title: "状态", formatter: auditIconFormat }
            , { styler: vlStyle, width: 3, halign: "center", align: "left", sortable: true, field: "Department", title: "机构" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Position", title: "职位" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Personnel", title: "姓名" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Appellation", title: "称谓" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Six", title: "性别", formatter: sexFormat }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Mobile", title: "手机" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Tel", title: "电话" }
            , { styler: vlStyle, width: 1, halign: "center", align: "left", sortable: true, field: "Birthday", title: "生日", formatter: dateFormat }
        ]
    ]
};
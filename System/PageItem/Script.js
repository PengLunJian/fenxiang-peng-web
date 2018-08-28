
/**
 * 当前页面
 */
var page = {
    grid: null,
    name: "PageItemData",
    apiPrefix: "sys/page/v1/",
    initialize: function () {
        this.initToolBar();
        this.initTree();
        this.initializeGrid();
    },
    curFolderId: 0,
    /*
        读取查询条件
    */
    getQueryParams: function () {
        return {
            keyWord: $("#qKeyWord").textbox("getValue")
        };
    },
    /**
     * 初始化树
     */
    initTree: function () {
        var me = this;
        $("#tree").tree({
            iconCls: "icon-details",
            lines: true,
            onLoadSuccess: function (node, data) {
                data.state = "open";
            },
            onSelect: function (node) {
                if (node.attributes === "Folder" || node.attributes === "Root") {
                    $("#cParent").textbox("setValue", node.tag);
                }
                me.curFolderId = node.id;
                me.grid.changedUrl(me.grid.listUrl = page.apiPrefix + "edit/list?fid=" + me.curFolderId);
            }
        });
        ajaxLoadValue("载入", page.apiPrefix + "edit/tree", null, function (data) {
            if (data)
                $("#tree").tree("loadData", data);
        });

    },
    initializeGrid: function () {
        var grid = new GridPanel();
        grid.tag = this;
        grid.cmdPath = page.apiPrefix;
        grid.idField = "ID";
        grid.listUrl = null;//page.apiPrefix + "list"
        grid.getQueryParams = this.getQueryParams;
        grid.edit = this.edit;
        grid.addNew = this.add;
        grid.remove = grid.doRemove;
        grid.columns = this.columns;
        grid.initialize();
        this.grid = grid;
    },
    add: function (page) {
        var editor = page.grid.createEditor();
        editor.isAddNew = true;
        editor.title = "页面节点";
        editor.uiUrl = "Form.htm";
        editor.saveUrl = page.apiPrefix + "edit/addnew?id=";
        editor.dataUrl = page.apiPrefix + "edit/details?fid=" + page.curFolderId + "&id=";
        editor.data = {};
        editor.afterSave = function (succeed, data) {
            if (succeed)
                $("#grid").datagrid("reload");
        };
        editor.show();
    },
    edit: function (id) {
        var editor = page.grid.createEditor();
        editor.title = "页面节点";
        editor.uiUrl = "Form.htm";
        editor.saveUrl = page.apiPrefix + "edit/update?id=";
        editor.dataUrl = page.apiPrefix + "edit/details?id=";
        editor.dataId = id;
        editor.afterSave = function (succeed, data) {
            if (succeed)
                $("#grid").datagrid("reload");
        };
        editor.show();
    },
    /*
        初始化工具栏
    */
    initToolBar: function () {

        createButton("#btnFlushTree", "icon-flush", function () {
            ajaxLoadValue("载入", page.apiPrefix + "tree", null, function (data) {
                if (data)
                    $("#tree").tree("loadData", data);
            });
        });
        createRoleButton("按钮完整性检查", "NormalButtons", "#btnButtons", "icon-code", function () {
            call_remote("按钮完整性检查", page.apiPrefix + "edit/normal_buttons",
                { id: page.curFolderId, type: "edit" }, function () {
                    $("#grid").datagrid("reload");
                });
        });
        createRoleButton("绑定类型", "BindType", "#btnBindType", "icon-code", function () {
            call_remote("绑定类型", "/api/data.aspx", "bind_type", { id: page.curFolderId | 0 }, function () {
                page.grid.reload();
            });
        });
        createRoleButton("刷新系统缓存", "FlushCache", "#btnFlushCache", "icon-flush", function () {
            page.doFlushCache();
        });
        createRoleButton("设置新分类", "setparent", "#btnSetParent", "icon-cmd", function () {
            page.doSetParent();
        });
    },
    /*
        删除一条项目模板节点的界面操作
    */
    delItem: function () {
        if (page.curFolderId === 0) {
            messager.alert("请选择一个节点");
            return;
        }
        call_remote("删除", page.apiPrefix + "edit/delete", { selects: page.curFolderId }, function () {
            $("#tree").tree("reload");
        });
    },
    doSetParent: function () {
        var cla = $("#cParent").textbox("getValue");
        if (!cla || cla == "") {
            $.messager.alert("设置新分类", "分类名称不能为空");
        } else {
            call_remote("设置新分类", page.apiPrefix + "set_parent", { parent: cla, selects: page.curFolderId });
        }
    },
    doFlushCache: function () {
        call_remote("刷新系统缓存", "v1/sys/flush_cache");
    },
    columns: [[
        { halign: "center", align: "center", field: "IsSelected", checkbox: true },
        { halign: "center", align: "center", field: "ID", title: "标识", sortable: true },
        { halign: "center", align: "center", sortable: true, field: "ItemType", title: "类型", formatter: itemTypeFormat },
        { halign: "center", align: "left", field: "Caption", title: "标题", sortable: true },
        { halign: "center", align: "center", field: "Index", title: "序号", sortable: true },
        { halign: "center", align: "left", field: "hide", title: "隐藏", formatter: okFormat },
        { halign: "center", align: "left", field: "audit", title: "审批", formatter: okFormat },
        { halign: "center", align: "left", field: "level_audit", title: "逐级审批", formatter: okFormat },
        { halign: "center", align: "left", field: "edit", title: "编辑", formatter: okFormat },
        { halign: "center", align: "left", field: "data_state", title: "数据管理", formatter: okFormat },
        { halign: "center", align: "left", field: "Url", title: "链接地址" },
        { halign: "center", align: "left", field: "Name", title: "系统名称", sortable: true },
        { halign: "center", align: "left", field: "type", title: "系统对象" },
        { halign: "center", align: "left", field: "ExtendValue", title: "扩展" }
    ]]

};

/**
 * 附件枚举类型
 */
var itemType = [
    { value: 0, text: "-" },
    { value: 1, text: "分组" },
    { value: 2, text: "页面" },
    { value: 3, text: "按钮" },
    { value: 4, text: "命令" }
];
/**
 * 附件枚举类型之表格格式化方法
 */
function itemTypeFormat(value) {
    return arrayFormat(value, itemType);
}

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
            page.initialize();
            callback();
        });
    },
    onCheckSize: function (wid, hei) {
        $('#layout').layout('resize', window.o99);
        $('#grid').datagrid('resize', window.o99);
    }
});

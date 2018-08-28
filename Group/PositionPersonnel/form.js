/*design by:agebull designer date:2017/6/21 16:25:18*/
/*
    人员职位设置的前端操作类对象,实现基本的编辑的界面操作
*/
var PositionPersonnelForm = {
    /**
     * 主键字段
     */
    idField : "Id",
    /**
     * 标题
     */
    title:"人员职位设置",
    /**
     * 命令执行地址前缀
     */
    cmdPath: "",
    /**
     * 表单地址
     */
    formUrl: "Form.htm",
    /**
     * 表单参数
     */
    formArg: "_-_=1",
    /*
        新增一条项目洽谈的界面操作
    */
    addNew: function () {
        var dialog = new EditDialog(this);
        dialog.showAddNew();
    },
    /*
        修改或查看项目洽谈的界面操作
    */
    edit: function (id) {
        var dialog = new EditDialog(this);
        dialog.showEdit(id);
    }
};
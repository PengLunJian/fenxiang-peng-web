/*此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/21 20:37:47*/
/*
    机构职位设置的前端操作类对象,实现基本的编辑的界面操作
*/
var OrganizePositionForm = {
    /**
     * 主键字段
     */
    idField : "Id",
    /**
     * 标题
     */
    title:"机构职位设置",
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
    },
    /*
        录入界面载入时执行控件初始化
    */
    onFormUiLoaded: function () {

/*
        $('#Position').textbox({required:true,validType:['strLimit[0,50]']});
*/
    }
};
/*
    系统用户的前端操作类对象,实现基本的编辑的界面操作
*/
var UserForm = {
    /**
     * 主键字段
     */
    idField : "Id",
    /**
     * 标题
     */
    title:"系统用户",
    /**
     * 命令执行地址前缀
     */
    cmdPath: "sys/user/v1/",
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
        $('#Id').textbox({validType:['noZero[0]']});
        $('#RealName').textbox({required:true,validType:['strLimit[0,50]']});
        $('#UserName').textbox({validType:['strLimit[0,50]']});
        $('#Memo').textbox({validType:['strLimit[0,50]']});
*/
    }
};
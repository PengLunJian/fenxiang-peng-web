allButton = true;
var version = 20160909001;
//Svar autoHide = false;
//function onFlushCache() {
//    var ws = document.getElementById('workSapce');
//    ws.src = 'home.htm';
//    reloadCache(window);
//}

$(document).ready(function () {
    //初始化函数
    $(window).resize();
    $('#tree').tree({
        url: '/Api/Data.aspx?action=tree',
        iconCls: 'icon-details',
        lines: true,
        onDblClick: function (node) {
            if (!node.attributes) {
                $.messager.alert('', browserInfo());
            }
        },
        onSelect: function (node) {
            onNodeClick(node);
        }
    });
    //createButton('#btnHome', 'icon-tip', function () {
    //    var ws = document.getElementById('workSapce');
    //    ws.src = 'home.htm';
    //});
    createButton('#btnModify', 'icon-cus', function () {
        $("#pwdDialog").dialog("open");

        var userName = $("#hiddenUserName").val();
        $("#userName").val(userName);
        $("#oldPwd").focus();
        //$.messager.changePwd('修改密码', "123", function (pwd) {
        //    ajaxOperator('修改密码', '/Api/Data.aspx?action=m', { pwd: pwd }, function () {
        //        $('#grid').datagrid('reload');
        //    });
        //});
    });
    //createButton('#btnFlush', 'icon-reload', onFlushCache);
    //onFlushCache();

    createButton('#btnLogout', 'icon-AuditDeny', onLogout);

    $(window).resize(function () {
        $("#clientSapce").height($(window).height());
    });
});
function onNodeClick(node) {
    //if (autoHide)
    //    $(document.body).layout('collapse', 'west');
    if (node.attributes && node.attributes != 'Folder') {
        var ws = $('#iframe');
        if (ws.length > 0) {
            ws[0].contentWindow.document.write('');//清空iframe的内容
            ws[0].contentWindow.close();//避免iframe内存泄漏
            ws.remove();//删除iframe
        }
        var name = GetTreePath(node);
        $('#txtPage').html(name);
        $('#txtPage').attr('title', name);
        $('#rBody').html('<iframe id="workSapce" style="border: black 0 solid; height: 100%; overflow: hidden; width: 100%;"></iframe>');
        ws = document.getElementById('workSapce');

        if (node.attributes.indexOf('?') > 0)
            ws.src = node.attributes + "&__t=" + version;
        else
            ws.src = node.attributes + "?__t=" + version;
       

        $('#txtPage').focus();
    } else {
        //$.messager.alert('', browserInfo());
    }
}
function onLogout() {
    $.messager.confirm('退出登录', '你确定要退出系统并后退到登录页面吗?', function (yn) {
        if (yn)
            location.href = '/Logout.aspx';
    });
}

//确认修改密码
function changeEnter() {
    var enterPwd = $("#enterPwd").val();
    var newPwd = $("#newPwd").val();
    var oldPwd = $("#oldPwd").val();

    if (oldPwd == "" || oldPwd == null) {
        $.messager.alert("提示", "原始密码未输入，请输入原始密码");
        $("#oldPwd").focus();
        return;
    }

    if (!(enterPwd === newPwd)) {
        $.messager.alert("提示", "密码确认不一致，请重新输入");
        $("#enterPwd").focus();
        return;
    }

    ajaxOperator('修改密码', '/Api/Data.aspx?action=m',
        {
            oldPwd: encodeURI(oldPwd),
            newPwd: encodeURI(enterPwd)
        },
        function () {
            $('#pwdDialog').window('close');
            $('#grid').datagrid('reload');
        });
}

//取消修改密码
function changeCancel() {
    $('#pwdDialog').window('close');
}
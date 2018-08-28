allButton = true;
var version = 201710108;
//function onFlushCache() {
//    var ws = document.getElementById('workSapce');
//    ws.src = 'home.htm';
//    reloadCache(window);
//}
var custom_options = {
    new_window: false,
    hide_menu: false
};
function onNewTab() {
    custom_options.new_window = !custom_options.new_window;
    $("#mm2-nt").linkbutton({
        text: (custom_options.new_window ? "√" : "") + "页面新标签打开"
    });
}
function onAutoHide() {
    custom_options.hide_menu = !custom_options.hide_menu;
    $("#mm2-mh").linkbutton({
        text: (custom_options.hide_menu ? "√" : "") + "菜单自动隐藏"
    });
    if (custom_options.hide_menu)
        $(document.body).layout("collapse", "west");
    else
        $(document.body).layout("expand", "west");
}
function openByTab(url) {

    var a = $("#newTab");
    a.attr("href", url);
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    a.get(0).dispatchEvent(e);
}
$(document).ready(function () {
    browserCheck();
    var user = globalOptions.user.info();
    $('#lbUserName').text(user.nickName);
    $('#lbUserInfo').text(user.nickName);
    //初始化函数
    $(window).resize();
    ajaxLoadValue("载入菜单", "v1/page/tree", {}, function (data) {
        if (data)
            $("#tree").tree('loadData', data);
    });
    $("#tree").tree({
        iconCls: "icon-details",
        lines: true,
        //onDblClick: function (node) {
        //    if (!node.attributes) {
        //        $.messager.alert('', browserInfo());
        //    }
        //},
        onSelect: function (node) {
            onNodeClick(node);
        }
    });
    createButton("#btnHome", "icon-web", function () {
        showIframe("home.aspx");
    });
    createButton("#btnFlow", "icon-help", function () {
        showIframe("flow.htm");
    });
    createButton("#btnJob", "icon-cmd", function () {
        showIframe("/workflow/center/index.aspx");
    });
    createButton("#btnChart", "icon-cmd", function () {
        showIframe("/chart/index.aspx");
    });
    //createButton('#btnMenu', 'icon-tip', function () {
    //    if (custom_options.new_window) {
    //        custom_options.new_window = false;
    //        $(document.body).layout('expand', 'west');
    //    }
    //    else {
    //        custom_options.new_window = true;
    //        $(document.body).layout('collapse', 'west');
    //    }
    //});
});

function showIframe(url) {
    if (custom_options.new_window) {
        openByTab(url);
        return;
    }
    $("#__content_loading__").css("visibility", "visible");

    var ws = document.getElementById("workSapce");
    ws.contentWindow.document.write("");//清空iframe的内容
    $(ws).one("load", onWorkSpaceLoad);
    if (url.indexOf("?") > 0)
        ws.src = url + "&__t=" + version;
    else
        ws.src = url + "?__t=" + version;
}
function onWorkSpaceLoad() {
    $("#__content_loading__").css("visibility", "hidden");
    return true;
}

function onNodeClick(node) {
    if (custom_options.hide_menu)
        $(document.body).layout("collapse", "west");
    if (node.attributes) {
        var name = GetTreePath(node);
        $("#txtPage").html(name);
        $("#txtPage").attr("title", name);

        showIframe(node.attributes);
    } else {
        //$.messager.alert('', browserInfo());
    }
}
function onLogout() {
    $.messager.confirm("退出登录", "你确定要退出系统并后退到登录页面吗?", function (yn) {
        if (yn)
            globalOptions.user.logout();
    });
}

function onModifyPassword() {
    $("#pwdDialog").dialog({
        iconCls: "pag-list",
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        closed: true,
        href: "/system/user/pwd.htm"
    });
    $("#pwdDialog").dialog("open");

    //var userName = $("#hiddenUserName").val();
    //$("#userName").val(userName);
    //$("#oldPwd").focus();
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

    ajaxOperator("修改密码", "/Api/Data.aspx?action=m",
        {
            oldPwd: encodeURI(oldPwd),
            newPwd: encodeURI(enterPwd)
        },
        function () {
            $("#pwdDialog").window("close");
            $("#grid").datagrid("reload");
        });
}

//取消修改密码
function changeCancel() {
    $("#pwdDialog").window("close");
}
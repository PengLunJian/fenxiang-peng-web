
$(document).ready(function () {
    browserCheck();
    //回车登录
    if (document.addEventListener) {
        document.addEventListener("keypress", fireFoxHandler, true);
    } else {
        document.attachEvent("onkeypress", ieHandler);
    }
    function fireFoxHandler(evt) {
        enterLogin(evt);
    }
    function ieHandler(evt) {
        enterLogin(evt);
    }
    ajaxOperator("初始化", "v1/oauth/getdid", {
        deviceId: globalOptions.user.getDeviceId(),
        app: "manage"
    }, function (r) {
        if (r.success) {
            globalOptions.user.setDeviceId(r.data);
        }
        else {
            console.log("getdid(error):" + r.status.msg);
        }
    });
});


function enterLogin(evt) {
    if (evt.keyCode == 13) {
        doLogin();
    }
    return false;
}
function doLogin() {
    var user = $("input[name='MobilePhone']").val();
    if (!user || user.trim() == "") {
        $("#cMsg").text("用户名密码不能为空");
        return false;
    }
    var pwd = $("input[name='UserPassword']").val();
    if (!pwd || pwd.trim() == "") {
        $("#cMsg").text("用户名密码不能为空");
        return false;
    }
    submitData("#fm", "v2/login/account", function (r) {
        if (r.success) {
            globalOptions.user.setUserInfo(r.data);
            window.location.href = "/index.aspx";
        }
        else
            $("#cMsg").text(r.status.msg);
    });
    return false;
} 

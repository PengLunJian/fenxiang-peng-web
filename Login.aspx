<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="true" Inherits="System.Web.UI.Page" %>

<!DOCTYPE html>
<html>
<head>
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=21">
    <title>欢迎登陆后台管理</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="/Styles/css/login.css?_t=20170619" />
    <script type="text/javascript" src="/scripts/jquery.min.js?_t=20170619"></script>
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/material/easyui.css?_t=20170619" />
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/icon.css?_t=20170619" />
    <script type="text/javascript" src="/Scripts/jquery.easyui.min.js?_t=20170619"></script>
    <script type="text/javascript" src="/Scripts/locale/easyui-lang-zh_CN.js?_t=20170619"></script>
    <script type="text/javascript" src="/Scripts/extend/core.js?_t=20170619"></script>
    <script type="text/javascript" src="/Scripts/business/login.js?_t=20170619"></script>
    <%--<script type="text/javascript" src="/Scripts/easyloader.js?v=20180826"></script>--%>
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/material/easyui.css?v=20180826" />
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/icon.css?v=20180826" />
    <script type="text/javascript" src="/Scripts/jquery.easyui.min.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/ajax.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/datagrid-detailview.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/locale/easyui-lang-zh_CN.js?v=20180826"></script>
    <!--Extend-->
    <script type="text/javascript" src="/Scripts/extend/core.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/button.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/ajax.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/extend.js?v=20180826"></script>
    <%--<script type="text/javascript" src="/Scripts/extend/cache.js?v=20180826"></script>--%>
    <script type="text/javascript" src="/Scripts/extend/page.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/dialog.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/tree.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/grid_panel.js"></script>
    <script type="text/javascript" src="/Scripts/extend/card_panel.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/type.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/ueditor_ex.js?v=20180826"></script>
    <!--Business-->
    <script type="text/javascript" src="/Scripts/business/type.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/business/business.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/business/userjob.js?v=20180826"></script>
    <link rel="stylesheet" type="text/css" href="/Styles/model/Site.css?v=20180826" />
    <link rel="stylesheet" type="text/css" href="/Styles/model/icon.css?v=20180826" />
</head>
<body>
    <div id="body">

        <div class="main-top-space"></div>
        <div class="wrap-sublevel">
            <div class="main-left-space"></div>
            <!-- main -->
            <div class="main">
                <div class="main-right fr">
                    <form id="fm" method="post">
                        <input type="hidden" name="mark" value="1" />

                        <div class="right-wecome">
                            <div class="right-wecome-c">后台管理</div>
                        </div>
                        <div class="right-user">
                            <span>账号：</span>
                            <input type="text" name="MobilePhone" placeholder="手机号/用户名/邮箱">
                        </div>
                        <div class="right-user right-pass">
                            <span>密码：</span>
                            <input type="password" name="UserPassword" placeholder="请输入0-10数字、字母">
                        </div>
                        <div id="cMsg" style="text-align: center; font-size: 12px; color: red; height: 16px; padding: 6px;"></div>
                        <button id="btnLogin" type="button" class="right-entry" onclick="return doLogin();">登录</button>
                    </form>
                </div>
            </div>
        </div>
        <div id="__loading__" style="visibility: hidden">
            <div class="panel-loading busy_body">正在拼命执行中...</div>
        </div>
        <footer class="login-bottom">
            <div class="copyright">
                <div>
                    <span>©Copyright 2015-2018</span>
                </div>
            </div>
        </footer>
    </div>
    <div style="visibility: hidden;">
        <div id="xx_dialog_region_xx"></div>
    </div>
</body>
</html>

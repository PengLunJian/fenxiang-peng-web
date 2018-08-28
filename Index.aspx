<%@ Page Language="C#" AutoEventWireup="true" Inherits="System.Web.UI.Page" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=21">
    <title>后台管理</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="/Styles/css/index.css?v=20180826"/>
    <link rel="stylesheet" type="text/css" href="/Styles/model/Site.css?v=20180826" />
    <link rel="stylesheet" type="text/css" href="/Styles/model/icon.css?v=20180826" />
    <!--JQuery-->
    <script type="text/javascript" src="/scripts/jquery.min.js?v=20180826"></script>
    <!--EasyUI-->
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/material/easyui.css?v=20180826" />
    <link rel="stylesheet" type="text/css" href="/Scripts/themes/icon.css?v=20180826" />
    <script type="text/javascript" src="/Scripts/jquery.easyui.min.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/datagrid-detailview.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/locale/easyui-lang-zh_CN.js?v=20180826"></script>
    <!--Extend-->
    <script type="text/javascript" src="/Scripts/extend/ajax.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/extend.js?v=20180826"></script>
    <%--<script type="text/javascript" src="/Scripts/extend/cache.js?v=20180826"></script>--%>
    <script type="text/javascript" src="/Scripts/extend/dialog.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/tree.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/page.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/type.js?v=20180826"></script>
    <!--Business-->
    <script type="text/javascript" src="/Scripts/extend/core.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/extend/button.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/business/type.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/business/business.js?v=20180826"></script>
    <script type="text/javascript" src="/Scripts/business/index.js?v=20180826"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false" style="overflow:hidden">
        <div  class="index_bar">
            <div class="imgLogo" ></div>
            <div class="index_path"><span>当前页面：</span><span id="txtPage">主页</span></div>
            <div class="index_tool">
                <a id="btnUser" href="#" class="easyui-menubutton" data-options="menu:'#mm1',iconCls:'icon-user'">
                    <span id="lbUserName"></span>
                </a>
                <div id="mm1" style="width:150px;">
                    <div>
                        <span>信息</span>
                        <div class="menu-content">
                            <span id="lbUserInfo" style="font-size:12px"></span>
                        </div>
                    </div>
                    <div class="menu-sep"></div>
                    <div data-options="iconCls:'icon-check'" onclick="return onModifyPassword();">修改密码</div>
                    <div data-options="iconCls:'icon-AuditDeny'" onclick="return onLogout();">退出登录</div>
                </div>
                
                <a id="btnCustomOption" href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-options'">
                    设置
                </a>
                <div id="mm2" style="width:150px;">
                    <div id="mm2-nt" data-options="iconCls:'icon-options'" onclick="return onNewTab();">页面新标签打开</div>
                    <div id="mm2-mh" data-options="iconCls:'icon-options'" onclick="return onAutoHide();">菜单自动隐藏</div>
                </div>
                <a id="btnHome" href="/home.htm" title="主页">主页</a>
                <%--<a id="btnMenu" href="#" title="菜单">菜单</a>
                <a id="btnJob" href="#" title="快捷任务">快捷任务</a>
                <a id="btnChart" href="#" title="图表查询">图表查询</a>
                <a id="btnFlow" href="#" title="流程说明">流程说明</a>--%>
            </div>
        </div>
    </div>
    <div data-options="hideCollapsedContent:false,collapsible:true,region:'west'" title="菜单" class="index_menu">
        <ul id="tree"></ul>
    </div>
    <div id="rBody" data-options="region:'center',border:false" class="index_work_body">
        <iframe id="workSapce" src="/home.htm"></iframe>
        <div id="__content_loading__">
            <div class="panel-loading busy_body">正在拼命执行中...</div>
        </div>
    </div>
    <div style="visibility: hidden">
        <a id="newTab" href="#" target="_blank">**</a>
        <div id="pwdDialog"title="修改密码" style="width: 300px; height: 220px;"></div>
    </div>
</body>
</html>

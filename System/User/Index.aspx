<%@ Page Title="" Language="C#" MasterPageFile="~/JquerySite.Master" AutoEventWireup="true" Inherits="System.Web.UI.Page" %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    系统数据 > 系统用户
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="form.js?v=20180826"></script>
    <script type="text/javascript" src="page.js?v=20180826"></script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="pageToolbarEx">
        <%--<a id="btnAdd" href="javascript:void(0)">新增</a>
        <a id="btnEdit" href="javascript:void(0)">修改/查看</a>
        <div style="display: inline;">
            <div class="toolbarSpace"></div>
        </div>--%>
        <a id="btnEnable" href="javascript:void(0)">启用</a>
        <a id="btnDisable" href="javascript:void(0)">禁用</a>
        <a id="btnResetPwd" href="javascript:void(0)">重置密码</a>
<%--        <div style="display: inline;">
            <div class="toolbarSpace"></div>
        </div>--%>
        <label id="regQuery" style="float: right">
            <input id="__txt_query" class="inputValue inputS easyui-textbox" />
            <a id="btnQuery" href="javascript:void(0)">查询</a>
        </label>
    </div>
    <div id="grid"></div>
</asp:Content>

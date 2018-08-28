<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='System.Web.UI.Page' %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    组织机构> 组织机构
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="Script.js?v=20180826"></script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="pageToolbarEx">
        <a id="btnAdd" href="javascript:void(0)">新增</a>
        <a id="btnEdit" href="javascript:void(0)">修改</a>
        <a id="btnDelete" href="javascript:void(0)">删除</a>
        <div style="display: inline;">
            <div class="toolbarSpace"></div>
        </div>
        <a id="btnFlush" href="javascript:void(0)">刷新</a>
    </div>
    <div id="grid"></div>
</asp:Content>

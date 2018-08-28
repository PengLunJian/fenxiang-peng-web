<%@ Page Title="" Language="C#" MasterPageFile="~/JquerySite.Master" AutoEventWireup="true" Inherits="System.Web.UI.Page" %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    系统数据 > 页面节点
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="Script.js?v=20180826"></script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="layout" class="easyui-layout">
        <div data-options="collapsible:false,region:'west',split:true,title:'目录与页面'" style="width: 200px;">
            <ul id="tree"></ul>
        </div>
        <div data-options="region:'center'" style="padding: 0px;overflow:hidden">
            <div id="pageToolbarEx">
                <div id="regCommand" style="display: block;">
                    <a id="btnAdd" href="javascript:void(0)">新增</a>
                    <a id="btnEdit" href="javascript:void(0)">修改</a>
                    <a id="btnDelete" href="javascript:void(0)">删除</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <a id="btnButtons" href="javascript:void(0)">按钮完整性检查</a>
                    <a id="btnBindType" href="javascript:void(0)">绑定类型</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <a id="btnFlushTree" href="javascript:void(0)">刷新目录</a>
                    <a id="btnFlushCache" href="javascript:void(0)">更新缓存</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <div style="display: inline;">
                        <input id="cParent" class="inputValue easyui-textbox" style="width: 160px; height: 22px; margin: 2px; border: solid silver 1px" />
                        <a id="btnSetParent" href="javascript:void(0)">设置新分类</a>
                    </div>
                </div>
                <div id="regQuery" class="toolbar_line" style="display: block;">
                    <input id="qKeyWord" class="inputValue inputS easyui-textbox" style="width: 300px; height: 22px; margin: 2px;border: solid silver 1px" />
                    <a id="btnQuery" href="javascript:void(0)">查询</a>
                </div>
            </div>
            <div id="grid"></div>
        </div>
    </div>
</asp:Content>

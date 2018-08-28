<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='System.Web.UI.Page' %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    组织机构> 职位组织关联
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="Script.js?v=20180826"></script>
    <script type="text/javascript">
        var page;
        doPageInitialize = function () {
            allButton = <%= this.AllAction.ToString().ToLower() %>;
            currentPageId = <%= this.PageItem.ID %>;
            userButtons = [<%= this.UiButtons %>];
            setPreQueryArgs(<%= PreQueryArgs %>);
            page = Object.create(OrganizePositionPage);
            page.initialize();
            onCheckSize = function (wid, hei) {
                $('#layout').layout('resize', window.o99);
                //$('#tree').tree('resize', opt);
                $('#grid').datagrid('resize', window.o99);
            }
        };
    </script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="layout" class="easyui-layout">
        <div data-options="collapsible:false,region:'west',split:true,title:'机构'" style="width: 200px;">
            <ul id="tree"></ul>
        </div>
        <div data-options="region:'center'" style="padding: 0px;">
            <div id="pageToolbarEx">
                <a id="btnAdd" href="javascript:void(0)">新增</a>
                <a id="btnEdit" href="javascript:void(0)">修改</a>
                <a id="btnDelete" href="javascript:void(0)">删除</a>
                <div style="display: inline;">
                    <div class="toolbarSpace"></div>
                </div>
                <a id="btnCreateAll" href="javascript:void(0)">添加管理员与审核员</a>
                <%--<div style='display: inline;'>
                    <div class='toolbarSpace'></div>
                </div>
                <a id='btnCreateSubjection' href='javascript:void(0)' class="easyui-tooltip"
                   title='将所有在上次启用后的修改应用到系统中'>启用所有修改</a>--%>
            </div>
            <div id="grid"></div>
        </div>
    </div>
</asp:Content>

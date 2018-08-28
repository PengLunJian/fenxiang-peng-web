<%--design by:agebull designer date:2017/5/26 19:40:56--%>

<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='System.Web.UI.Page' %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    Organization> 人员职位设置
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="form.js?v=20180826"></script>
    <script type="text/javascript" src="script.js?v=20180826"></script>
    <script type="text/javascript">
        var page;
        doPageInitialize = function () {
            allButton = <%= this.AllAction.ToString().ToLower() %>;
            currentPageId = <%= this.PageItem.ID %>;
            userButtons = [<%= this.UiButtons %>];
            setPreQueryArgs(<%= PreQueryArgs %>);
            page = Object.create(PositionPersonnelPage);
            page.initialize();
            onCheckSize = function (wid, hei) {
                $('#layout').layout('resize', window.o99);
                //$('#tree').tree('resize', window.o99);
                $('#grid').datagrid('resize', window.o99);
            }
        };
    </script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="layout" class="easyui-layout">
        <div data-options="collapsible:false,region:'west',split:true,title:'职位'" style="width: 200px;">
            <ul id="tree"></ul>
        </div>
        <div data-options="region:'center'" style="padding: 0px;">
            <div id="pageToolbarEx">
                <div id="regCommand" style="display: block;">
                    <a id="btnAdd" href="javascript:void(0)">新增</a>
                    <a id="btnEdit" href="javascript:void(0)">修改</a>
                    <a id="btnDelete" href="javascript:void(0)">删除</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <a id="btnValidate" href="javascript:void(0)">数据校验</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <a id="btnEnable" href="javascript:void(0)">启用</a>
                    <a id="btnDisable" href="javascript:void(0)">禁用</a>
                    <div style="display: inline;">
                        <div class="toolbarSpace"></div>
                    </div>
                    <a id="btnAuditSubmit" href="javascript:void(0)">提交</a>
                    <a id="btnAuditBack" href="javascript:void(0)">退回</a>
                    <a id="btnAuditPass" href="javascript:void(0)">通过</a>
                    <a id="btnAuditDeny" href="javascript:void(0)">否决</a>
                    <a id="btnReAudit" href="javascript:void(0)">重做</a>
                </div>
                <div id="regQuery" class="toolbar_line">
                    <label class="queryLabel">关键字</label>
                    <input id="qKeyWord" class="inputValue inputS easyui-textbox" />
                    <label class="queryLabel">状态:</label>
                    <label class="queryLabel">
                        <input id="qAudit" class="inputValue_SSS inputS easyui-combobox" 
                            data-options="valueField:'value',textField:'text',data:auditType,panelHeight:400" />
                    </label>
                    <a id="btnQuery" href="javascript:void(0)">查询</a>
                </div>
            </div>
            <div id="grid"></div>
        </div>
    </div>
</asp:Content>

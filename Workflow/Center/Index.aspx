<%--design by:agebull designer date:2017/5/31 11:01:27--%>

<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    招商项目信息库 > 工作列表
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="script.js?v=20180826"></script>
    <script type="text/javascript">
        var page;
        doPageInitialize = function () {
            page = Object.create(WorkFlowPage);
            page.formUrl = '<%= Path %>/Form.htm';
            page.cmdPath = '<%= Path %>/';
            page.autoLoad = false;
            page.dataType = '';//<%= Request["type"] ?? "" %>
            page.initialize();
            onCheckSize = function (wid, hei) {
                $('#layout').layout('resize', window.o99);
                $('#layout_c').layout('resize', window.o99);
                $('#tabs').tabs('resize', window.o99);
                $('#content').panel('resize', window.o99);
                $('#message').panel('resize', window.o99);
                $('#a').datalist('resize', { width: '100%', height: '33%' });
                $('#b').datalist('resize', { width: '100%', height: '33%' });
                $('#c').datalist('resize', { width: '100%', height: '33%' });
            }
            if (<%= GetIntArg("id",0) %>) {
                doSilentOperator2('读取', 'action.aspx', { action: 'details', id:<%= GetIntArg("id",0) %> }, function (r) {
                    page.loadJob(r.value);
                });
            }
            createButton("#btnFlush", "icon-flush", function () {
                page.reload();
            });
        };
    </script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="layout" class="easyui-layout" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;">
        <div data-options="region:'east',border:false,split:true,hideCollapsedContent:false,collapsible:true,tools:'#tt'"
            style="width: 260px; overflow: hidden">
            <div id="a" data-options="border:true,split:false" style="padding: 0; height: 33%; overflow: hidden">
            </div>
            <div id="b" data-options="border:true,split:false" style="padding: 0; height: 34%; overflow: hidden">
            </div>
            <div id="c" data-options="border:true,split:false" style="padding: 0; height: 33%; overflow: hidden">
            </div>
        </div>
        <div id="layout_c" class="easyui-layout my_panel" data-options="border: true,region:'center'">
            <div id="tabs" class="easyui-tabs" data-options="region:'center',border: false,tools:'#auditToolbar'">
                <div id="content" class="my_panel'" data-options="tabWidth:112,title:'数据'">
                    请在右侧列表中选择一条数据,选中后,将载入相应数据!
                </div>
                <div id="message" class="my_panel'" data-options="tabWidth:112,title:'消息'">
                    请在右侧列表中选择一条数据,选中后,将载入相应消息!
                </div>
            </div>
            <div id="auditToolbar">
                <span class="l-btn-text">数据校验</span><input id="blValidate"/>
                <a id="btnSave" href="javascript:void(0)">保存</a>
                <a id="btnAuditSubmit" href="javascript:void(0)">提交</a>
                <a id="btnAuditBack" href="javascript:void(0)">退回</a>
                <a id="btnAuditPass" href="javascript:void(0)">通过</a>
                <a id="btnAuditDeny" href="javascript:void(0)">否决</a>
                <a id="btnClose" href="javascript:void(0)">已读</a>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="HideRegion" runat="server">
    <div id="tt">
        <a id="btnFlush" href="javascript:void(0)"></a>
    </div>
</asp:Content>

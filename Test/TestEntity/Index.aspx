<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2018/8/24 18:01:53--%>
<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='System.Web.UI.Page'%>
<asp:Content ID='cPagePathRegion' ContentPlaceHolderID='PagePathRegion' runat='server'>
测试 > TestEntity
</asp:Content>
<asp:Content ID='cScriptRegion' ContentPlaceHolderID='ScriptRegion' runat='server'>
    <script type='text/javascript' src='/Test/TestEntity/script.js'></script>   
    <script type='text/javascript'>
        var page;
        doPageInitialize = function() {
            allButton = <%= this.AllAction.ToString().ToLower() %>;
            currentPageId = <%= this.PageItem.ID %>;
            userButtons = [<%= this.UiButtons %>];
            setPreQueryArgs(<%= PreQueryArgs %>);
            page = Object.create(TestEntityPage);
            page.formUrl = '/';
            page.cmdPath = '//'; 
            page.initialize();            
            onCheckSize = function (wid, hei) {
                $('#grid').datagrid('resize', window.o99);                
            }
        };
    </script>
</asp:Content>
<asp:Content ID='cBodyRegion' ContentPlaceHolderID='BodyRegion' runat='server'>
    <div id='pageToolbarEx'>
        <div id='regCommand' style='display: block;'>
            <a id='btnAdd' href='javascript:void(0)'>新增</a>
            <a id='btnEdit' href='javascript:void(0)'>修改</a>
            <a id='btnDelete' href='javascript:void(0)'>删除</a>
        </div>
        <div id='regQuery' class='toolbar_line'>
            <label class='queryLabel'>关键字</label>
            <input id = 'qKeyWord' class='inputValue inputS easyui-textbox' />
            <a id = 'btnQuery' href='javascript:void(0)'>查询</a>
        </div>
    </div>
    <div id='grid'></div>
</asp:Content>
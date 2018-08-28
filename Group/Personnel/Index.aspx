<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/25 10:46:07--%>
<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='System.Web.UI.Page'%>
<asp:Content ID='cPagePathRegion' ContentPlaceHolderID='PagePathRegion' runat='server'>
组织机构 > 职员
</asp:Content>
<asp:Content ID='cScriptRegion' ContentPlaceHolderID='ScriptRegion' runat='server'>
    <script type='text/javascript' src='/Group/Personnel/script.js'></script>   
    <script type='text/javascript'>
        var page;
        doPageInitialize = function() {
            allButton = <%= this.AllAction.ToString().ToLower() %>;
            currentPageId = <%= this.PageItem.ID %>;
            userButtons = [<%= this.UiButtons %>];
            setPreQueryArgs(<%= PreQueryArgs %>);
            page = Object.create(PersonnelPage);
            page.formUrl = '/Group/Personnel/Form.htm';
            page.cmdPath = '/Group/Personnel/'; 
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
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnValidate' href='javascript:void(0)'>数据校验</a>
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnAuditSubmit' href='javascript:void(0)'>提交</a>
        <a id='btnPullback' href='javascript:void(0)' title='拉回已提交的数据,仅在提交后十分钟内且上级未进行审核时有效' class='easyui-tooltip'>拉回</a>
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnAuditBack' href='javascript:void(0)'>退回</a>
        <a id='btnAuditPass' href='javascript:void(0)'>通过</a>
        <a id='btnAuditDeny' href='javascript:void(0)'>否决</a>
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnReAudit' href='javascript:void(0)'>重做</a>
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnEnable' href='javascript:void(0)'>启用</a>
        <a id='btnDisable' href='javascript:void(0)'>禁用</a>
        <div style='display: inline;'><div class='toolbarSpace'></div></div>
        <a id='btnDiscard' href='javascript:void(0)'>废弃</a>
        <a id='btnReset' href='javascript:void(0)'>还原</a>
        </div>
        <div id='regQuery' class='toolbar_line'>
            <label class='queryLabel'>关键字</label>
            <input id = 'qKeyWord' class='inputValue inputS easyui-textbox' />
            <label class='queryLabel'>状态:</label>
            <label class='queryLabel'>
                <input id='qAudit' class='inputValue_SSS inputS easyui-combobox' 
                       data-options="valueField:'value',textField:'text',data:auditType" />
            </label>
            <a id = 'btnQuery' href='javascript:void(0)'>查询</a>
        </div>
    </div>
    <div id='grid'></div>
</asp:Content>
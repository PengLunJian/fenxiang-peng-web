<%@ Page Title="" Language="C#" MasterPageFile="~/JquerySite.Master" AutoEventWireup="true" Inherits="System.Web.UI.Page" %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    系统数据 > 系统角色
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script type="text/javascript" src="script.js?v=20180826"></script>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="body2" class="easyui-layout" style="height: 100%; width: 100%">
        <div id="lyC" data-options="region:'center',title:'角色',collapsible:false,border:false" style="width: 20%; overflow: hidden">
            <div id="gridui">
                <div id="pageToolbarEx">
                    <a id="btnAdd" href="javascript:void(0)">新增</a>
                    <a id="btnEdit" href="javascript:void(0)">修改</a>
                </div>
                <div id="grid">
                </div>
            </div>
        </div>
        <div data-options="region:'east',split:true,title:'权限',collapsible:false,border:false" style="width: 70%">
            <div id="pageToolbarEx2">
                <a id="btnSaveRolePower" href="javascript:void(0)">保存</a>
                <a id="btnExpandAll" href="javascript:void(0)">展开</a>
                <div style="display: inline;">
                    <div class="toolbarSpace"></div>
                </div>
                <label>批量处理选中页面:</label>
                <label>编辑</label>
                <input class="easyui-switchbutton" data-options="checked: false,onChange:allEdit,onText:'允许',offText:'拒绝'">
                <label>审批</label>
                <input class="easyui-switchbutton" data-options="checked: false,onChange:allAudit,onText:'允许',offText:'拒绝'">
                <label>数据管理</label>
                <input class="easyui-switchbutton" data-options="checked: false,onChange:allData,onText:'允许',offText:'拒绝'">
                <label>扩展功能</label>
                <input class="easyui-switchbutton" data-options="checked: false,onChange:allCustom,onText:'允许',offText:'拒绝'">
            </div>
            <div id="tree">
            </div>
        </div>
    </div>
</asp:Content>

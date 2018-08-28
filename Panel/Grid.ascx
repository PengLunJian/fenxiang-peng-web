﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="System.Web.UI.UserControl" %>
<div id="pageToolbarEx">
    <div id="regCommand" style="display: block;">
        <a id="btnAdd" href="javascript:void(0)">新增</a>
        <a id="btnEdit" href="javascript:void(0)">修改</a>
        <a id="btnDelete" href="javascript:void(0)">删除</a>
        <div style="display: inline;"><div class="toolbarSpace"></div></div>
        <a id="btnValidate" href="javascript:void(0)">数据校验</a>
        <div style="display: inline;"><div class="toolbarSpace"></div></div>
        <a id="btnAuditSubmit" href="javascript:void(0)">提交</a>
        <a id="btnPullback" href="javascript:void(0)" title="拉回已提交的数据,仅在提交后十分钟内且上级未进行审核时有效" class="easyui-tooltip">拉回</a>
        <div style="display: inline;"><div class="toolbarSpace"></div></div>
        <a id="btnAuditBack" href="javascript:void(0)">退回</a>
        <a id="btnAuditPass" href="javascript:void(0)">通过</a>
        <a id="btnAuditDeny" href="javascript:void(0)">否决</a>
        <div style="display: inline;"><div class="toolbarSpace"></div></div>
        <a id="btnReAudit" href="javascript:void(0)">重做</a>
    </div>
    <div id="regQuery" class="toolbar_line">
        <label class="queryLabel">关键字</label>
        <input id = "qKeyWord" class="inputValue inputS easyui-textbox" />
        <label class="queryLabel">状态:</label>
        <label class="queryLabel">
            <input id="qAudit" class="inputValue_SSS inputS easyui-combobox" 
                   data-options="valueField:'value',textField:'text',data:auditType" />
        </label>
        <a id = "btnQuery" href="javascript:void(0)">查询</a>
    </div>
</div>
<div id="grid"></div>

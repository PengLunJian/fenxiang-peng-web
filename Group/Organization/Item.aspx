<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/21 15:53:14--%>
<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<%@ Import Namespace = "Gboxt.Common.DataModel" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.BusinessLogic" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.DataAccess" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new OrganizationBusinessLogic();
    var details = business.Details(id);
    string style = null;
    if (details.AuditState == AuditStateType.Pass)
    {
        style = @"background-image: url(""/Styles/model/icons/audit_pass.png""); ";
    }
    else if (details.AuditState == AuditStateType.Deny)
    {
        style = @"background-image: url(""/Styles/model/icons/audit_deny.png"");";
    }
%>
<div class="details_range" style="<%=style%>">
        <div class="details_block">
            <div class="details_label_s">机构类型：</div>
            <span><%= details.Type_Content %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">编码：</div>
            <span><%= details.Code %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">全称：</div>
            <span><%= details.FullName %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">简称：</div>
            <span><%= details.ShortName %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">树形名称：</div>
            <span><%= details.TreeName %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">级别：</div>
            <span><%= details.OrgLevel %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">上级标识：</div>
            <span><%= details.ParentId %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">机构标识：</div>
            <span><%= details.OrgId %></span>
        </div><br/>
<br/>

        <div class="details_block">
            <span class="details_label_s">备注</span><br />
            <span class="details_value"><%= ToHtmlParagraph(details.Memo) %></span>
        </div>
</div>
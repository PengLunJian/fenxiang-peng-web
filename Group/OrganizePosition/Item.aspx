<%--design by:agebull designer date:2017/6/10 13:25:14--%>
<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<%@ Import Namespace = "Gboxt.Common.DataModel" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.BusinessLogic" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.DataAccess" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new OrganizePositionBusinessLogic();
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
            <div class="details_label_s">称谓：</div>
            <span><%= details.Appellation %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">角色：</div>
            <span><%= details.Role %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">部门：</div>
            <span><%= details.Department %></span>
        </div>
        <div class="details_block">
            <span class="details_label_s">备注</span><br />
            <span class="details_value"><%= ToHtmlParagraph(details.Memo) %></span>
        </div>
</div>
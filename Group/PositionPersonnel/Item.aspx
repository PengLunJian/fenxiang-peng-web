<%--design by:agebull designer date:2017/6/15 0:42:47--%>

<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>

<%@ Import Namespace="Gboxt.Common.DataModel" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations.BusinessLogic" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations.DataAccess" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new PositionPersonnelBusinessLogic();
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
        <div class="details_label_s">职员：</div>
        <span><%= details.Personnel %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">职位：</div>
        <span><%= details.Appellation %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">角色：</div>
        <span><%= details.Role %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">性别：</div>
        <span><%= (details.Six ?"是" : "否") %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">生日：</div>
        <span><%= ToHtmlDate(details.Birthday) %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">电话：</div>
        <span><%= details.Tel %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">手机：</div>
        <span><%= details.Mobile %></span>
    </div>
    <div class="details_block">
        <div class="details_label_s">机构：</div>
        <span><%= details.Organization %></span>
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

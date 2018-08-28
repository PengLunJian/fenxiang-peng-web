<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/21 16:25:18--%>
<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<%@ Import Namespace = "Gboxt.Common.DataModel" %>
<%@ Import Namespace="Agebull.SystemAuthority.Organizations" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.BusinessLogic" %>
<%@ Import Namespace = "Agebull.SystemAuthority.Organizations.DataAccess" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new PersonnelBusinessLogic();
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
<div class='details_range' style='<%=style%>'>
        <div class='details_block'>
            <div class='details_label_s'>姓名：</div>
            <span><%= details.FullName %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>性别：</div>
            <span><%= (details.Six ?"是" : "否") %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>生日：</div>
            <span><%= ToHtmlDate(details.Birthday) %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>电话：</div>
            <span><%= details.Tel %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>手机：</div>
            <span><%= details.Mobile %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>角色：</div>
            <span><%= details.Role %></span>
        </div>
        <div class='details_block'>
            <div class='details_label_s'>系统用户外键：</div>
            <span><%= details.UserId %></span>
        </div><br/>
<br/>

        <div class='details_block'>
            <span class='details_label_s'>备注</span><br />
            <span class='details_value'><%= ToHtmlParagraph(details.Memo) %></span>
        </div>
</div>
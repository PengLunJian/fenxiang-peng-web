<%--design by:agebull designer date:2017/6/14 17:12:21--%>

<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>

<%@ Import Namespace="Gboxt.Common.Workflow.BusinessLogic" %>
<%
    var business = new UserJobBusinessLogic();
    var job = business.GetJobData(GetIntAnyArg("id", "_a_"));
%>
<div id="audit_details" style="width: 100%; overflow-x: hidden; overflow-y: auto">
    <%=job == null ? 0 :(int)job.AuditState %>
</div>

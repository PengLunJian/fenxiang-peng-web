<%--design by:agebull designer date:2017/6/14 17:12:21--%>

<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>

<%@ Import Namespace="Gboxt.Common.Workflow.BusinessLogic" %>
<%
    var business = new UserJobBusinessLogic();
    var job = business.GetJobInfo(GetIntAnyArg("id", "_a_"));
%>
<div class="job_message_range">
    <% foreach (var item in job.Items)
       {%>
        <div class="job_message_border">
            <div class="job_message_item">
                <img src="/Styles/model/icons/<%=item.Icon %>" style="float: left; margin: 2px 5px 5px 2px" />
                <%= item.Title%><br />
                <%= ToHtml(item.Message) %>
            </div>
        </div>
    <% } %>
</div>

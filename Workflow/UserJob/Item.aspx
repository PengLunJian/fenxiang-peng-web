<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2017/6/21 15:32:06--%>
<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<%@ Import Namespace = "Gboxt.Common.Workflow.BusinessLogic" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new UserJobBusinessLogic();
    var details = business.Details(id);
%>
<div class="details_range">
        <div class="details_block">
            <div class="details_label_s">标题：</div>
            <span><%= details.Title %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">发生日期：</div>
            <span><%= ToHtmlDate(details.Date) %></span>
        </div>
        <div class="details_block">
            <span class="details_label_s">工作消息</span><br />
            <span class="details_value"><%= ToHtmlParagraph(details.Message) %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">任务分类：</div>
            <span><%= details.JobType_Content %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">工作状态：</div>
            <span><%= details.JobStatus_Content %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">命令类型：</div>
            <span><%= details.CommandType_Content %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">关联标识：</div>
            <span><%= details.LinkId %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">连接类型：</div>
            <span><%= details.EntityType %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">目标用户名字：</div>
            <span><%= details.ToUserName %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">来源用户标识：</div>
            <span><%= details.FromUserId %></span>
        </div>
        <div class="details_block">
            <div class="details_label_s">来源用户名字：</div>
            <span><%= details.FromUserName %></span>
        </div><br/>
<br/>

</div>
<%--此标记表明此文件可被设计器更新,如果不允许此操作,请删除此行代码.design by:agebull designer date:2018/8/24 18:01:53--%>
<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<%@ Import Namespace = "Gboxt.Common.DataModel" %>
<%@ Import Namespace="TestApp" %>
<%@ Import Namespace = "TestApp.BusinessLogic" %>
<%@ Import Namespace = "TestApp.DataAccess" %>
<%
    var id = GetIntAnyArg("id", "_a_");
    var business = new TestEntityBusinessLogic();
    var details = business.Details(id);
    string style = null;
%>
<div class='details_range' style='<%=style%>'>
        <div class='details_block'>
            <div class='details_label_s'>名称：</div>
            <span><%= details.Name %></span>
        </div><br/>
<br/>

</div>
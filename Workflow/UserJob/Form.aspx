<%@ Page Language='C#' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>
<form name="userJobForm" id="userJobForm" method="POST" enctype="multipart/form-data">
    <input name="UserWorkId" type="hidden"/>
    <input name="JobStatus" type="hidden"/>
    <input name="CommandType" type="hidden"/>
    <input name="LinkId" type="hidden"/>
    <input name="EntityType" type="hidden"/>
    <input name="FromUserId" type="hidden"/>
    <input name="FromUserName" type="hidden"/>
    <input name="ToUserName" type="hidden"/>
    <input name="Argument" type="hidden"/>
    <input name="JobType" type="hidden"/>
    <div id="userJobRegion" class="formRegion" style="width: 480px;">
        <div class="inputField" id="fr_ToUserId">
            <div class="inputRegion" id="ir_ToUserId">
                <div class="inputLabel">目标用户:</div>
                <input id="ToUserIds" name="ToUserIds" class="inputValue inputS easyui-combotree"
                       data-options="prompt:'接收用户名字',required:true,valueField:'id', textField:'text',multiple:true,url:'/Api/Index.aspx?action=submit_user&pid=<%= GetIntArg("pid") %>'"/>
            </div>
        </div>
        <div class="inputField" id="fr_Title">
            <div class="inputRegion" id="ir_Title">
                <div class="inputLabel">任务标题:</div>
                <input id="__title" name="Title" class="inputValue inputS easyui-textbox"
                       data-options="buttonText:'*',onClickButton:function(){$('#__title').textbox('setValue','*');}
                                    ,prompt:'任务标题,其中特殊字符*号会被替换成实际数据的标题',required:true"/>
            </div>
        </div>
        <div class="inputField" id="fr_Date">
            <div class="inputRegion" id="ir_Date">
                <div class="inputLabel">发生日期:</div>
                <input id="Date" name="Date" class="inputValue inputS easyui-datebox"
                       data-options="prompt:'发生日期',readonly:true"/>
            </div>
        </div>
        <div class="inputField" id="fr_Message">
            <div class="inputRegion" id="ir_Message">
                <div class="inputLabel">工作消息:</div>
                <br/><input id="Message" name="Message" class="inputValue_Memo_S easyui-textbox"
                            data-options="prompt:'工作消息',multiline:true,height:60"/>
            </div>
        </div>
    </div>
</form>
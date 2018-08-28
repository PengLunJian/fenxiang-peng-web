/*design by:agebull designer date:2017/6/9 12:21:22*/
/*
    工作流操作容量对象
*/
var WorkFlowPage = {
    /*
        用户工作列表的页面初始化
    */
    initialize: function () {
        var me = this;
        me.initList();
        me.initToolBar();
    },
    //buttons: [],
    createJobButton: function (eid, title, action, icon, eventFunc) {
        createButton(eid, icon, eventFunc);
        //me.buttons.push(btn);
    },
    /*
        初始化工具栏
    */
    initToolBar: function () {

        var me = this;
        $("#blValidate").switchbutton({
            checked: true,
            onText: "打开",
            offText: "关闭",
            onChange: function (ck) {
                me.enableValidation = ck;
                me.checkValdate();
            }
        });
        me.createJobButton("#btnSave",
            "保存",
            "save",
            "icon-save",
            function () {
                me.doSave();
            });
        //me.createJobButton("#btnValidate",
        //    "校验",
        //    "validate",
        //    "icon-validate",
        //    function () {
        //        me.doValidate("校验", "validate");
        //    });
        me.createJobButton("#btnAuditSubmit",
            "提交",
            "submit",
            "icon_a_submit",
            function () {
                doSubmitJob(me.job.id, me.job.action_url, function () {
                    me.showEmpty();
                });
            });
        me.createJobButton("#btnAuditBack",
            "退回",
            "back",
            "icon_a_back",
            function () {
                me.doAudit("退回", "back");
            });
        me.createJobButton("#btnAuditPass",
            "通过",
            "pass",
            "icon_a_pass",
            function () {
                me.doAudit("通过", "pass");
            });
        me.createJobButton("#btnAuditDeny",
            "否决",
            "deny",
            "icon_a_deny",
            function () {
                me.doAudit("否决", "deny");
            });
        me.createJobButton("#btnClose",
            "关闭",
            "close",
            "icon-discard",
            function () {
                me.doClose();
            });

        //$('#pagination').pagination({
        //    total: 0,
        //    beforePageText: '第',
        //    afterPageText: '共{pages}行',
        //    showPageInfo: false,
        //    showPageList: false,
        //    pageSize: 1,
        //    pageList: [1],
        //    buttons: me.buttons,
        //    onSelectPage: function (page, size) {

        //    },
        //    onRefresh: function () {
        //        showBusy();
        //        me.reload();
        //    }
        //});
        me.hideCommand();
    },
    showCommand: function () {
        var me = this;
        if (!me.job) {
            me.hideCommand();
            return;
        }
        $("#btnClose").linkbutton("enable");
        switch (me.jobState) {
            case 0:
            case 1:
                $("#btnSave").linkbutton("enable");
                //$('#btnValidate').linkbutton('enable');
                if (this.enableValidation)
                    $("#btnAuditSubmit").linkbutton("enable");
                else
                    $("#btnAuditSubmit").linkbutton("enable");
                break;
            case 2:
                $("#btnAuditBack").linkbutton("enable");
                $("#btnAuditPass").linkbutton("enable");
                $("#btnAuditDeny").linkbutton("enable");
                $("#btnAuditSubmit").linkbutton("enable");
                break;
            default:
                break;
        }
    },
    hideCommand: function () {
        $("#btnAuditBack").linkbutton("disable");
        $("#btnAuditPass").linkbutton("disable");
        $("#btnAuditDeny").linkbutton("disable");
        $("#btnSave").linkbutton("disable");
        //$('#btnValidate').linkbutton('disable');
        $("#btnAuditSubmit").linkbutton("disable");
        $("#btnClose").linkbutton("disable");
    },
    //disableCommand: function () {
    //    hideButton('#btnAuditBack');
    //    hideButton('#btnAuditPass');
    //    hideButton('#btnAuditDeny');
    //    hideButton('#btnSave');
    //    hideButton('#btnValidate');
    //    hideButton('#btnAuditSubmit');
    //    hideButton('#btnClose');
    //},
    /*
        初始化列表
    */
    initList: function () {
        var me = this;
        $("#content").panel({
            onLoad: function () {
                me.onPanelLoaded();
            }
        });
        $("#a").datalist({
            url: "/Workflow/Center/action.aspx?type=edit&size=99",
            checkbox: false,
            valueField: "Id",
            loadMsg: "",
            textField: "Title",
            title: "待办事宜",
            lines: true,
            //textFormatter: function (val, row, inndex) {
            //    return (row.job === 'edit' ? '〖编辑〗' : row.job === 'audit' ? '〖审批〗' : '〖通知〗') + val;
            //},
            onSelect: function (idx, row) {
                me.loadJob(row);
            },
            onLoadSuccess: function () {
                hideBusy();
            },
            onLoadError: hideBusy
        });
        $("#b").datalist({
            url: "/Workflow/Center/action.aspx?type=audit&size=99",
            checkbox: false,
            valueField: "Id",
            loadMsg: "",
            textField: "Title",
            title: "快速审批",
            lines: true,
            //textFormatter: function (val, row, inndex) {
            //    return (row.job === 'edit' ? '〖编辑〗' : row.job === 'audit' ? '〖审批〗' : '〖通知〗') + val;
            //},
            onSelect: function (idx, row) {
                me.loadJob(row);
            },
            onLoadSuccess: function () {
                hideBusy();
            },
            onLoadError: hideBusy
        });
        $("#c").datalist({
            url: "/Workflow/Center/action.aspx?type=msg&size=99",
            checkbox: false,
            valueField: "Id",
            loadMsg: "",
            textField: "Title",
            title: "消息通知",
            lines: true,
            //textFormatter: function (val, row, inndex) {
            //    return (row.job === 'edit' ? '〖编辑〗' : row.job === 'audit' ? '〖审批〗' : '〖通知〗') + val;
            //},
            onSelect: function (idx, row) {
                me.loadJob(row);
            },
            onLoadSuccess: function () {
                hideBusy();
            },
            onLoadError: hideBusy
        });
    },
    /*
        重新载入用户工作列表的列表数据
    */
    reload: function () {
        var me = this;
        $("#a").datalist("reload");
        $("#b").datalist("reload");
        $("#c").datalist("reload");
        if (me.job)
            me.loadJob(me.job);
    },
    job: null,
    jobData: null,
    form: null,
    bodyId: null,
    jobState: 255,
    loadJob: function (row) {
        var me = this;
        me.destroy();
        me.hideCommand();
        me.job = row;
        if (!me.job) {
            $("#content").panel("refresh", "/home.htm");
            $("#message").panel("refresh", "/home.htm");
            return;
        }
        $("#message").panel("refresh", "History.aspx?id=" + me.job.Id);
        $("#content").panel("refresh", "item.aspx?id=" + me.job.Id);
    },
    onPanelLoaded: function () {
        var me = this;
        me.form = null;
        if (!me.job) {
            me.hideCommand();
            return;
        }
        $("#btnClose").linkbutton("enable");
        me.bodyId = "#audit_details";
        me.jobState = parseInt($("#audit_details").text());
        if (me.jobState <= 1) {
            $(me.bodyId).panel({
                href: me.job.form_url,
                onLoad: function () {
                    me.loadJobForm();
                }
            });
        } else {
            $(me.bodyId).panel({
                href: me.job.read_url,
                onLoad: function () {
                    me.showCommand();
                }
            });
        }
    },
    formOptions: null,
    loadJobForm: function () {
        var me = this;
        me.formOptions = null;
        me.loadJobData();

    },
    loadJobData: function () {
        var me = this;
        ajaxLoadValue("载入数据", me.job.action_url + "&action=details&id=" + me.job.id, null, function (result) {
            me.onJobDataLoaded(result);
        });
    },
    onJobDataLoaded: function (data) {
        var me = this;
        if (data.value)
            me.jobData = data.value;
        else
            me.jobData = data;
        if (me.job.script_url) {
            $.getScript(me.job.script_url, function (js, state) {
                if (state == "success")
                    me.formOptions = window.currentFormOptions || {};
                else
                    me.formOptions = {};
                me.showData();
            });
        } else {
            me.formOptions = {};
            me.showData();
        }
    },
    enableValidation: true,
    checkValdate: function () {
        var me = this;
        if (me.form) {
            if (me.enableValidation) {
                $("#btnAuditSubmit").linkbutton("enable");
                me.form.form("enableValidation").form("validate");
            } else {
                me.form.form("disableValidation").form("validate");
                $("#btnAuditSubmit").linkbutton("enable");
            }
        }
    },
    showData: function () {
        var me = this;
        me.form = $(me.bodyId).children("form");
        try {
            var input_body = $(me.form).children("div");
            $(input_body).css("width", "100%");
            $(input_body).css("overflow-x", "hidden");
            $(input_body).css("overflow-y", "auto");
        } catch (e) {
            console.error("%s.%s() ： %s", "WorkFlowPage", "showData", e);
        }
        if (me.formOptions && me.formOptions.onFormUiLoaded)
            me.formOptions.onFormUiLoaded();

        syncFormInput(me.jobData.readonly, me.bodyId);
        setUeditorData(me.jobData, me.bodyId);

        if (me.formOptions && me.formOptions.onFormDataLoaded)
            me.formOptions.onFormDataLoaded(me.jobData);

        me.form.form("load", me.jobData);

        if (me.formOptions && me.formOptions.afterFormDataLoaded)
            me.formOptions.afterFormDataLoaded(me.jobData);
        me.checkValdate();
        me.showCommand();
    },
    destroy: function () {
        var me = this;
        try {
            if (me.form) {
                destroyUeditor(me.bodyId);
                destroyFormInput(me.bodyId);
                $(me.bodyId).panel("destroy");
                $(me.bodyId).remove();
            }
        } catch (e) {
            alert(e);
        }
        me.form = null;
    },
    showEmpty: function () {
        var me = this;
        me.job = null;
        me.destroy();
        me.hideCommand();
        $("#a").datalist("reload");
        $("#b").datalist("reload");
        $("#c").datalist("reload");
        $("#content").panel("refresh", "/home.htm");
    },
    doFormValidate: function () {
        var me = this;
        if (!me.job)
            return false;
        if (!me.form || !me.jobData)
            return false;
        //me.setFormValidate();
        if (!me.form.form("validate"))
            return false;
        if (me.formOptions && me.formOptions.beforeFormSave && !me.formOptions.beforeFormSave())
            return false;
        return true;
    },
    doSave: function () {
        var me = this;
        if (me.enableValidation && !me.doFormValidate())
            return;

        me.form.form("submit", {
            type: "POST",
            dataType: "json",
            url: me.job.action_url + "&action=update&id=" + me.job.id,
            success: function (r) {
                var result = ajaxComplete("保存", r);
                if (result) {
                    if (me.formOptions && me.formOptions.afterFormSaved)
                        me.formOptions.afterFormSaved(result.succeed, result.value);
                    if (result.succeed) {
                        me.reload();
                    }
                }
            }
        });
    },
    doValidate: function () {
        var me = this;
        me.doByValidate();
    },
    doByValidate: function (title, action) {
        var me = this;
        if (!me.doFormValidate())
            return;
        doOperator("校验", me.job.action_url, { action: "validate", selects: me.job.id },
            function (result) {
                hideBusy();
                if (result.succeed) {
                    me.doAction2(title, action);
                } else {
                    syncFormValidate(me.bodyId, result.value, me.form);
                }
            });
    },
    doAction: function (title, action) {
        var me = this;
        if (!me.job)
            return;
        me.doAction2(title, action);
    },
    doAction2: function (title, action) {
        var me = this;
        $.messager.confirm(title, "确定要对<b>" + me.job.Title + "</b>执行<b>" + title + "</b>吗?", function (s) {
            if (s) {
                doOperator(title, me.job.action_url, { action: action, selects: me.job.id },
                    function (result) {
                        hideBusy();
                        if (result.succeed) {
                            me.showEmpty();
                        }
                    });
            }
        });
    },
    doAudit: function (title, action) {
        var me = this;
        $.messager.confirm(title, "确定要对<b>" + me.job.Title + "</b>执行<b>" + title + "</b>吗?", function (s) {
            if (s) {
                doOperator(title, me.job.action_url, { action: action, selects: me.job.id },
                    function (result) {
                        hideBusy();
                        if (result.succeed) {
                            me.showEmpty();
                        }
                    });
            }
        });
    },
    doClose: function () {
        var me = this;
        $.messager.confirm("关闭", "确定关闭此工作消息吗?", function (s) {
            if (s) {
                doOperator("关闭", "action.aspx", { action: "close", id: me.job.Id }, function (result) {
                    hideBusy();
                    if (result.succeed) {
                        me.showEmpty();
                    }
                });
            }
        });
    }
};

/*
    createJobButton: function (eid, title, action, icon, eventFunc) {
        var btn = $(eid).linkbutton({
            text: title,
            iconCls: icon,
            disabled: true,
            handler: function () {
                eventFunc();
            }
        });
        this[eid] = btn;
        me.buttons.push(btn);
    },
var me = this;
        me.createJobButton("#btnSave", "保存", "save", "icon-save", function () {
            me.doSave();
        });
        me.createJobButton("#btnValidate", "校验", "validate", "icon-validate", function () {
            me.doValidate("校验", "validate");
        });
        me.createJobButton("#btnAuditSubmit", "提交", "submit", "icon_a_submit", function () {
            me.doByValidate("提交", "submit");
        });
        me.createJobButton("#btnAuditBack", "退回", "back", "icon_a_back", function () {
            me.doAction("退回", "back");
        });
        me.createJobButton("#btnAuditPass", "通过", "pass", "icon_a_pass", function () {
            me.doAction("通过", "pass");
        });
        me.createJobButton("#btnAuditDeny", "否决", "deny", "icon_a_deny", function () {
            me.doAction("否决", "deny");
        });
*/
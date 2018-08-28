

/**
 * 报表类型
 */
var reportType = [
    { value: "dist", text: "项目分布" },
    { value: "active", text: "项目走势" },
    { value: "query", text: "查询" }
];
/**
 * 图表类型
 */
var chartType = [
    { value: "pie", text: "饼图" },
    { value: "column", text: "柱状图" },
    { value: "bar", text: "条形图" },
    { value: "line", text: "线图" }
];
/**
 * 图表筛选
 */
var chartFilter = [
    { value: "ae", text: "按区域筛选" },
    { value: "in", text: "按企业筛选" },
    { value: "pl", text: "按招商项目筛选" },
    { value: "ne", text: "按洽谈项目筛选" },
    { value: "co", text: "按在建项目筛选" },
    { value: "op", text: "按投产项目筛选" }
];
/*
    用户工作列表的前端操作类对象,实现基本的增删改查
*/
var ChartPage = {
    report: "active",
    filter: "ae",
    chart: "pie",
    field: 0,
    title: "形势分析",
    small: false,
    unit: "",
    fieldtext: "",
    /*
        初始化
    */
    initialize: function (full) {
        var me = this;
        me.small = !full;
        me.resize();
        me.initSelect();
        me.init3dBar();
        me.load();
    },
    options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 20,
        viewDistance: 0
    },
    init3dBar: function () {
        var me = this;
        if (me.small) {
            $("#chart_3d").hide();
            $("#chart_alpha").hide();
            $("#chart_beta").hide();
            $("#chart_viewDistance").hide();
            $("#chart_depth").hide();
            return;
        }
        $("#chart_3d").switchbutton({
            checked: true,
            height: 26,
            onText: "3D",
            offText: "平面",
            onChange: function (ck) {
                me.options3d.enabled = ck;
                $("#chart_beta").slider(ck ? "enable" : "disable");
                $("#chart_alpha").slider(ck ? "enable" : "disable");
                $("#chart_viewDistance").numberspinner(ck ? "enable" : "disable");
                $("#chart_depth").numberspinner(ck ? "enable" : "disable");
                me.show();
            }
        });
        $("#chart_alpha").slider({
            showTip: true,
            mode: "v",
            max: 90,
            min: -90,
            value: me.options3d.alpha,
            reversed: false,
            onComplete: function (v) {
                me.options3d.alpha = v;
                me.show();
            },
            rule: [-90, "|", -60, "|", -30, "|", 0, "|", 30, "|", 60, "|", 90]
        });
        $("#chart_beta").slider({
            showTip: true,
            mode: "h",
            max: 90,
            min: -90,
            value: me.options3d.beta,
            reversed: false,
            onComplete: function (v) {
                me.options3d.beta = v;
                me.show();
            },
            rule: [-90, "|", -60, "|", -30, "|", 0, "|", 30, "|", 60, "|", 90]
        });
        $("#chart_depth").numberspinner({
            max: 999,
            min: 0,
            value: me.options3d.depth,
            width: 60,
            onChange: function (v) {
                me.options3d.depth = v;
                me.show();
            }
        });
        $("#chart_viewDistance").numberspinner({
            max: 360,
            min: -360,
            width: 60,
            value: me.options3d.viewDistance,
            onChange: function (v) {
                me.options3d.viewDistance = v;
                me.show();
            }
        });
    },
    initSelect: function () {
        var me = this;

        $("#chart_report").combobox({
            editable: false,
            prompt: "报表类型",
            valueField: "value",
            panelHeight: 100,
            textField: "text",
            data: reportType,
            onSelect: function (rec) {
                me.onReportChanged(rec);
            }
        });
        if (!me.small) {
            $("#chart_type").combobox({
                editable: false,
                prompt: "图表类型",
                panelHeight: 100,
                valueField: "value",
                textField: "text",
                data: chartType,
                onSelect: function (rec) {
                    if (me.chart === rec.value)
                        return;
                    me.chart = rec.value;
                    me.load();
                }
            });
            $("#chart_filter").combobox({
                editable: false,
                prompt: "筛选视角",
                valueField: "value",
                textField: "text",
                panelHeight: 200,
                data: chartFilter,
                onSelect: function (rec) {
                    if (me.filter === rec.value)
                        return;
                    me.filter = rec.value;
                    me.load();
                }
            });
            $("#chart_field").combobox({
                editable: false,
                prompt: "筛选字段",
                valueField: "id",
                panelHeight: 500,
                textField: "text",
                url: "/api/index.aspx?action=chart_fields",
                onSelect: function (rec) {
                    if (me.field === rec.id)
                        return;
                    me.field = rec.id;
                    me.fieldtext = rec.text;
                    me.unit = rec.tag || "";
                    me.load();
                }
            });
        }
        $(".panel-tool").css("margin", "-1px");
        $(".panel-tool").css("top", "0");
        $(".panel-tool").css("height", "24px");
        $(".combo").css("border-top-left-radius", "0");
        $(".combo").css("border-top-right-radius", "0");
        $(".combo").css("border-bottom-left-radius", "0");
        $(".combo").css("border-bottom-right-radius", "0");

        $("#chart_report").combobox("setValue", me.report);
        if (!me.small) {
            $("#chart_type").combobox("setValue", me.chart);
            $("#chart_filter").combobox("setValue", me.filter);
            $("#chart_field").combobox("setValue", me.field);
        }
    },

    onReportChanged: function (rec) {
        var me = this;
        if (me.report === rec.value)
            return;
        me.title = rec.text;
        me.report = rec.value;
        if (!me.small) {
            if (me.report === "dist") {
                $("#chart_type").combobox("readonly", true);
                $("#chart_filter").combobox("readonly", true);
                $("#chart_field").combobox("readonly", true);
                $("#chart_type").combobox("setValue", me.chart = "pie");
                $("#chart_filter").combobox("setValue", me.filter = "ae");
                $("#chart_field").combobox("setValue", me.field = 0);
            } else if (me.report === "active") {
                $("#chart_type").combobox("readonly", false);
                $("#chart_filter").combobox("readonly", true);
                $("#chart_field").combobox("readonly", true);
                $("#chart_filter").combobox("setValue", me.filter = "ae");
                $("#chart_field").combobox("setValue", me.field = 0);
            } else {
                $("#chart_type").combobox("readonly", false);
                $("#chart_filter").combobox("readonly", false);
                $("#chart_field").combobox("readonly", false);
            }
        }
        else if (me.report === "query") {
            location.href = "/chart/index.aspx";
            return;
        }
        me.load();
    },
    setChartType: function (type) {
        this.chart = type;
        if (!this.small)
            $("#chart_type").combobox("setValue", this.chart);
    },
    resize: function () {
        if (this.chart === "pie" && this.datas && this.datas.length) {
            var wid = $("#char_panel").width() / 2 - 20;
            var charts = $("#chart_body").children(".chart_body");
            charts.each(function () {
                $(this).width(wid);
                $(this).height(wid);
                var child = $(this).children("div");
                child.each(function () {
                    $(this).width(wid - 2);
                    $(this).height(wid - 2);
                });
            });
        } else {
            $("#chart_body").css("top", 5);
            $("#chart_body").css("left", 5);
            $("#chart_body").width($("#char_panel").width() - 10);
            $("#chart_body").height($("#char_panel").height() - 10);
        }
    },
    load: function () {
        var me = this;
        doSilentOperator2(me.title, "/chart/action.aspx",
            { action: me.report, chart: me.chart, field: me.field, filter: me.filter },
            function (result) {
                try {
                    if (result.succeed) {
                        if (me.report === "active")
                            me.initActive(result.value);
                        else if (me.report === "dist")
                            me.initDist(result.value);
                        else if (me.report === "query")
                            me.initQuery(result.value);
                    }
                } catch (e) {
                    console.error("%s.%s() ： %s", "ChartPage", "load", e);
                }
            });
    },
    datas: null,
    initQuery: function (data) {
        if (this.chart === "pie") {
            this.datas = [];
            this.datas.push({
                type: "pie",
                text: data.title,
                value: {
                    type: "pie",
                    name: data.name,
                    data: data.data
                }
            });
        } else {
            this.datas = data;
        }
        this.show();
    },
    initActive: function (res) {
        if (!this.chart || this.chart === "pie") {
            this.setChartType("column");
        }
        this.datas = res;
        this.show();
    },
    initDist: function (res) {
        this.setChartType("pie");
        this.datas = [];
        for (var idx = 0; idx < res.length; idx++) {
            var data = res[idx];
            this.datas.push({
                type: "pie",
                text: data.title,
                value: {
                    type: "pie",
                    name: data.name,
                    data: data.data
                }
            });
        }
        this.show();
    },

    show: function () {
        $("#chart_data").html("");
        if (this.chart === "column")
            this.showColumn();
        else if (this.chart === "pie")
            this.showPie();
        else if (this.chart === "bar")
            this.showBar();
        else if (this.chart === "line")
            this.showLine();
        $(".highcharts-credits").css("display", "none");
    },
    showColumn: function () {
        var me = this;
        $("#chart_body").html("");
        this.resize();
        if (!this.datas)
            return;
        Highcharts.chart("chart_body", {
            chart: {
                type: "column",
                options3d: me.options3d
            },
            title: {
                text: me.title
            },
            xAxis: {
                categories: me.datas.categories
            },
            credits: {
                enabled: false
            },
            series: me.datas.data
        });
        this.showData(me.datas);
    },
    showBar: function () {
        var me = this;
        $("#chart_body").html("");
        this.resize();
        if (!this.datas)
            return;
        Highcharts.chart("chart_body", {
            chart: {
                type: "bar",
                options3d: me.options3d
            },
            title: {
                text: me.title
            },
            xAxis: {
                categories: me.datas.categories
            },
            credits: {
                enabled: false
            },
            series: me.datas.data
        });
        this.showData(me.datas);
    },
    showLine: function () {
        var me = this;
        $("#chart_body").html("");
        this.resize();
        if (!this.datas)
            return;
        Highcharts.chart("chart_body", {
            chart: {
                type: "line",
                options3d: me.options3d
            },
            title: {
                text: me.title
            },
            xAxis: {
                categories: me.datas.categories
            },
            credits: {
                enabled: false
            },
            series: me.datas.data
        });
        this.showData(me.datas);
    },
    showPie: function () {
        $("#chart_body").html("");
        $("#chart_body").css("height", "auto");
        if (!this.datas || !this.datas.length)
            return;
        if (this.datas.length === 1) {
            this.datas = this.datas[0];
            this.resize();
            $("#chart_body").html("");
            this.showPieChart("chart_body", this.datas);
            return;
        }
        var html = "";
        var idx;
        for (idx = 0; idx < this.datas.length; idx++) {
            html += "<div class='chart_body'><div id='chart" + idx + "' style='margin: 0 auto'></div></div>";
        }
        $("#chart_body").html(html);
        this.resize();
        for (idx = 0; idx < this.datas.length; idx++) {
            this.showPieChart("chart" + idx, this.datas[idx]);
        }
    },
    showPieChart: function (eid, data) {
        if (!data)
            return;
        var me = this;
        Highcharts.chart(eid, {
            chart: {
                type: "pie",
                options3d: me.options3d
            },
            title: {
                text: data.text
            },
            tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    depth: me.options3d.depth,
                    viewDistance: me.options3d.viewDistance,
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}"
                    }
                }
            },
            series: [data.value]
        });
        this.showData(data);
    },
    showData: function (data) {
        if (this.small)
            return;
        var html = "";
        var i;
        if (data.data) {
            for (var id = 0; id < data.data.length; id++) {
                var value = data.data[id];
                html += "<table><caption>" + (value.title || value.text) + "</caption><colgroup><col style='width: 69%;'/><col style='width: 30%;'/></colgroup>";
                html += "<tr class='title'><td>名称</td><td >数值</td></tr>";
                for (i = 0; i < value.data.length; i++) {
                    html += "<tr><td class='name'>" + data.categories[i] + "</td>";
                    html += "<td class='value'>" + value.data[i] + this.unit + "</td></tr>";
                }
                html += "</table>";
            }
        }
        else if (data.value) {
            html = "<table><caption>" + (data.title || data.text) + "</caption><colgroup><col style='width: 69%;'/><col style='width: 30%;'/></colgroup>";
            html += "<tr class='title'><td>名称</td><td >比例</td></tr>";
            var values = data.value.data;
            for (i = 0; i < values.length; i++) {
                html += "<tr><td class='name'>" + values[i].name + "</td>";
                html += "<td class='value'>" + (parseFloat(values[i].y) * 100).toFixed(2) + "%</td></tr>";
            }
            html += "</table>";
        }
        $("#chart_data").append(html);
    }
};
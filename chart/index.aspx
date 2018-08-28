<%--design by:agebull designer date:2017/5/30 1:03:01--%>

<%@ Page Title='' Language='C#' MasterPageFile='~/JquerySite.Master' AutoEventWireup='true' Inherits='Gboxt.Common.WebUI.PublishPage' %>

<asp:Content ID="cPagePathRegion" ContentPlaceHolderID="PagePathRegion" runat="server">
    招商项目信息库 > 首页
</asp:Content>
<asp:Content ID="cScriptRegion" ContentPlaceHolderID="ScriptRegion" runat="server">
    <script src="/chart/highcharts.js?v=20180826"></script>
    <script src="/chart/highcharts-3d.js?v=20180826"></script>
    <script src="/chart/exporting.js?v=20180826"></script>
    <script src="/chart/chart.js?v=20180826"></script>
    <script type="text/javascript">
        var my_chart;
        doPageInitialize = function () {
            my_chart = Object.create(ChartPage);
            my_chart.initialize(true);
            onCheckSize = resetSize;
        };
        function resetSize() {
            $('#char_body').layout('resize', window.o99);
            my_chart.show();
        }
    </script>

</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="CssRegion">
    <style type="text/css">
        table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 0px;
            empty-cells: show;
            padding: 0px;
            margin: 0px;
            border: 0;
            text-align: center;
        }

            table caption {
                font-size: 18px;
                padding: 5px;
            }

        td {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            padding: 5px;
        }

        .value {
            text-align: right;
            padding-right: 5px
        }

        .name {
            text-align: left;
            padding-left: 5px
        }

        .title {
            background-color: whitesmoke;
        }
    </style>
</asp:Content>
<asp:Content ID="cBodyRegion" ContentPlaceHolderID="BodyRegion" runat="server">
    <div id="char_body" class="easyui-layout">
        <div data-options="region:'east',split:true, title:'结果数据'" style="padding: 0; width: 280px; overflow-x: hidden">
            <div id="chart_data" style="width: 100%"></div>
        </div>
        <div style="position: relative;overflow: hidden;" data-options="region:'center',split:true,title:'数据查询',collapsible:false,border:true,split:false,tools:'#tt'">
            <div id="char_panel" style="position: absolute; top: 70px; left: 50px; bottom: 0; right: 0; overflow-x: hidden; overflow-y: auto">
                <div id="chart_body" style="width: 100%"></div>
            </div>
            <div style="position: absolute; top: 10px; left: 5px; width: 90px;height: 80px;">
                <input id="chart_3d" />
                <input id="chart_depth" />
                <input id="chart_viewDistance" />
            </div>
            <div style="position: absolute; left: 120px; top: 15px; right: 20px; height: 30px;">
                <input id="chart_beta" style="width:100%">
            </div>
            <div style="position: absolute; top:120px ; left: 25px; bottom: 80px; width: 30px;">
                <input id="chart_alpha" style="height:100%">
            </div>
        </div>
    </div>
    <div id="tt">
        <input id="chart_report" type="text" class="easyui-combobox" style="width: 100px" />
        <input id="chart_filter" type="text" class="easyui-combobox" style="width: 100px" />
        <input id="chart_field" type="text" class="easyui-combobox" style="width: 100px" />
        <input id="chart_type" type="text" class="easyui-combobox" style="width: 100px" />
    </div>
</asp:Content>

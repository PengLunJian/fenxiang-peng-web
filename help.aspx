﻿<!DOCTYPE html>
<html>
<head>
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=21">
    <title>后台管理</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="/scripts/jquery.min.js?v=20180826"></script>
    <link rel="stylesheet" type="text/css" href="/Styles/css/default.css" />
    <script type="text/javascript">
        function sizeLogin() {
            var hei = $(document).height();
            $("#rBody").height(hei);
        }

        $(document).ready(function () {
            $(window).resize(sizeLogin);
            setTimeout(sizeLogin, 1);
        });
    </script>
</head>
<body style="overflow: hidden;">
    <Table style="text-align:center;table-layout: fixed; border-collapse: collapse; border-spacing: 0px; empty-cells: show; padding: 0px; margin: 0px; border:1px solid silver">
        <Colgroup>
            <col style="width: 200px;"/>
            <col style="width: 200px;"/>
        </Colgroup>
        <TR>
            <td style="border:1px solid silver">名称</td>
            <td  style="border:1px solid silver">值</td>
        </TR>
    </Table>
</body>
</html>

function cacheRemote(url, callback) {
    var win = getWindow();
    var idx = win.keyDictionary.indexOf(url.toLowerCase());
    if (idx < 0) {
        doSilentOperator("", url, null, function (data) {
            win.keyDictionary.push(url.toLowerCase());
            win.valDictionary.push(data);
            callback(data);
        });
    } else {
        callback(win.valDictionary[idx]);
    }
}

function getWindow() {
    var win = window.parent === null ? window : window.parent.window;
    if (win.keyDictionary === null) {
        win.valDictionary = [];
        win.keyDictionary = [];
    }
    return win;
}

function loadCache(win, url) {
    doSilentOperator2("更新缓存", url, null, function (data) {
        win.keyDictionary.push(url.toLowerCase());
        win.valDictionary.push(data);
    });
}

function reloadCache(win) {
    var urls = win.keyDictionary;
    win.valDictionary = [];
    win.keyDictionary = [];
    if (!urls)
        return;
    for (var i = 0; i < urls.length; i++) {
        loadCache(win, urls[i]);
    }
}

function flushCache() {
    reloadCache(getWindow());
}

function clearCache() {
    var win = getWindow();
    win.valDictionary = [];
    win.keyDictionary = [];
}

function checkRemoteData(url, callback) {
    var win = getWindow();

    var idx = win.keyDictionary.indexOf(url.toLowerCase());
    if (idx < 0) {
        doSilentOperator("", url, null, function (data) {
            win.keyDictionary.push(url.toLowerCase());
            win.valDictionary.push(data);
            if (callback)
                callback(data);
        });
    } else {
        setTimeout(function () {
            if (callback)
                callback(win.valDictionary[idx]);
        }, 1);
    }
}

function comboRemote(eid, url, callback) {
    var win = getWindow();

    var idx = -1;//win.keyDictionary.indexOf(url.toLowerCase());
    if (idx < 0) {
        doSilentOperator("", url, null, function (data) {
            win.keyDictionary.push(url.toLowerCase());
            win.valDictionary.push(data);
            setComboData(eid, data, callback);
        });
    } else {
        setTimeout(function () {
            setComboData(eid, win.valDictionary[idx], callback);
        }, 1);
    }
}

function setComboData(eid, data, callback) {
    try {
        var vl = $(eid).combobox("getValue");
        $(eid).combobox({ valueField: 'id', textField: 'text', data: data });
        $(eid).combobox("setValue", vl);
        if (callback)
            callback(data);
    } catch (e) {
        alert(eid + "***" + e);
    }
}

function textboxRemoteValidate(eid, title, url, data, succeed) {
    $(eid).textbox({ iconCls: "icon-reload", iconWidth: 16 });
    doSilentOperator(title, url, data, function (res) {
        $(eid).textbox({ iconCls: res.succeed ? "icon-ok" : "icon-cancel", iconWidth: 16 });
        if (succeed)
            succeed(res);
        $(eid).textbox("validate");
    });
}

function comboboxRemoteValidate(eid, title, url, data, succeed) {
    $(eid).combobox({ iconCls: "icon-reload", iconWidth: 16 });
    doSilentOperator(title, url, data, function (res) {
        $(eid).combobox({ iconCls: res.succeed ? "icon-ok" : "icon-cancel", iconWidth: 16 });
        if (succeed)
            succeed(res);
        $(eid).combobox("validate");
    });
}
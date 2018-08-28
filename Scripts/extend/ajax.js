var globalOptions = {
    /**
     * api访问配置
     */
    api: {
        /**
         * api访问基地址
         */
        host: "http://localhost:19777/",
        /**
         * 超时时间设置为10秒
         */
        timeOut: 30000
    },

    /**
	 * 系统操作
	 */
    user: {
		/**
		 * 客户端设备标识
		 */
        getToken: function () {
            if (localStorage.sys_access_token && localStorage.sys_access_token !== 'undefined')
                return localStorage.sys_access_token;
            if (localStorage.sys_device_id && localStorage.sys_device_id !== 'undefined')
                return localStorage.sys_device_id;
            return "%";
        },
		/**
		 * 客户端设备标识
		 */
        getDeviceId: function () {
            return localStorage.sys_device_id;
        },
		/**
		 * 客户端设备标识
		 */
        setDeviceId: function (did) {
            localStorage.sys_device_id = did;
            console.log("DeviceId:" + did);
        },
		/**
		 * 保存客户端缓存登录者信息
		 */
        setUserInfo: function (loginInfo) {
            localStorage.sys_access_token = (loginInfo.AccessToken);
            localStorage.sys_refresh_token = (loginInfo.RefreshToken);
            if (loginInfo.Profile) {
                localStorage.sys_user_id = (loginInfo.Profile.UserId);
                localStorage.sys_phone = (loginInfo.Profile.PhoneNumber);
                localStorage.sys_nick_name = (loginInfo.Profile.NickName);
                localStorage.sys_avatar_url = (loginInfo.Profile.AvatarUrl);
                if (loginInfo.ExpiresIn)
                    localStorage.sys_expires_in = (loginInfo.ExpiresIn);
            }
        },
		/**
		 * 登录状态检查
		 * @returns {} 
		 */
        isLogin: function () {
            return localStorage.sys_access_token;
        },
        logout: function () {
            localStorage.removeItem("sys_access_token");
            localStorage.removeItem("sys_refresh_token");
            localStorage.removeItem("sys_user_id");
            localStorage.removeItem("sys_phone");
            localStorage.removeItem("sys_nick_name");
            localStorage.removeItem("sys_avatar_url");
            localStorage.removeItem("sys_expires_in");
            localStorage.removeItem("sys_diacounts");
            localStorage.removeItem("sys_usercounts");
            location.href = "/Login.aspx";
        },
		/**
		 * 清除运行时缓存信息
		 * @returns {} 
		 * type:1 指刚进去app时，有些缓存信息只有在刚进入app时才清除一次
		 */
        clearTempValue: function (type) {
            localStorage.removeItem("temp");
            localStorage.removeItem("tmp_nav_paths");
            localStorage.removeItem("tmp_diamondNum");
            localStorage.removeItem("tmp_diamondSource");
            localStorage.removeItem("tmp_everyId");
            localStorage.removeItem("tmp_everyVerSion");
            localStorage.removeItem("tmp_VerifyImgId");
            localStorage.removeItem("tmp_VerifyCodeContent");
            localStorage.removeItem("tmp_pho_num");
            localStorage.removeItem("tmp_verifyImgId");
            localStorage.removeItem("tmp_typid");
            localStorage.removeItem("tmp_images_check");

            if (type === 1) {
                localStorage.removeItem("tmp_did_lock");
                localStorage.removeItem("tmp_token_lock");
                localStorage.removeItem("tmp_tokenOK");
                localStorage.removeItem("tmp_hasInviteShow");
                localStorage.removeItem("tmp_sdkIsShow");
                localStorage.removeItem("tmp_backdoor_lock");
            }
        },
		/**
		 * 缓存NickName
		 */
        setNickName: function (value) {
            localStorage.sys_nick_name = value;
        },
		/**
		 * 取缓存NickName
		 */
        getNickName: function () {
            return plus.storage.getItem("sys_nick_name");
        },
		/**
		 * 缓存用户头像
		 */
        setAvatarUrl: function (value) {
            localStorage.sys_avatar_url = value;
        },
		/**
		 * 取缓存用户头像
		 */
        getAvatarUrl: function () {
            return localStorage.sys_avatar_url;
        },
		/**
		 * 取得登录用户信息
		 * @returns {} 
		 */
        info: function () {
            return {
                userId: localStorage.sys_user_id,
                phone: localStorage.sys_phone,
                nickName: localStorage.sys_nick_name,
                avatarUrl: localStorage.sys_avatar_url,
                expiresIn: localStorage.sys_expires_in
            };
        },
		/**
		 * 取得用户ID
		 * @returns {} 
		 */
        userId: function () {
            return localStorage.sys_user_id;
        }
    }
};

function ajax_post(title, api, data, onSucceed, onFailed) {
    showBusy(title);
    $.ajax({
        url: globalOptions.api.host + api,
        type: 'post',
        dataType: 'json',
        data: data,
        timeout: globalOptions.api.timeout,
        headers: {
            "Authorization": "Bearer " + globalOptions.user.getToken()
        },
        /**
         * 成功回调
         * @param {} data 
         * @returns {} 
         */
        success: function (jsonStr) {
            try {
                if (onSucceed)
                    onSucceed(jsonStr);
            } catch (ex) {
                showMessage(title, "操作失败!" + ex);
            }
        },
        /**
         * 异常回调
         * @param {} xhr 
         * @param {} type 
         * @param {} errorThrown 
         * @returns {} 
         */
        error: function (xhr, type, errorThrown) {
            console.log(api + "(error):" + type);
            if (onFailed)
                onFailed();
            else
                showServerNoFind(title);
        },
        complete: function () {
            hideBusy();
        }
    });
}
function doOperator(title, url, data, onSucceed) {
    ajax_post(title, url, data, function (jsonStr) {
        var result = evalResult(jsonStr);
        if (!result) {
            showMessage(title, "未知结果");
        }
        else if (!result.success) {
            showMessage(title, result.status.msg);
        }
        else if (result.status && result.status.msg) {
            showTip(title, result.status.msg);
        }
        if (onSucceed)
            onSucceed(result);
    });
}

function ajaxOperator(title, url, data, onSucceed) {
    ajax_post(title, url, data, function (jsonStr) {
        var result = evalResult(jsonStr);
        if (result && onSucceed)
            onSucceed(result);
    });
}

function ajaxLoadValue(title, url, args, onSucceed) {
    ajax_post(title, url, args, function (jsonStr) {
        var result = evalResult(jsonStr);
        if (!result) {
            showMessage(title, "未知结果");
        } else if (!result.success) {
            showMessage(title, result.status.msg);
        } else if (onSucceed) {
            onSucceed(result.data);
        }
    });
}

function ajaxLoadScript(title, url, args, onSucceed) {
    ajax_post(title, url, args, function (jsonStr) {
        var result = eval(jsonStr);
        if (result && onSucceed)
            onSucceed(result);
    });
}

function ajaxLoadString(title, url, onSucceed, arg) {
    ajax_post(url, arg, onSucceed);
}

//执行无结果提示操作
function doSilentOperator(title, url, data, onSucceed, onFailed) {
    ajax_post(title, url, data, function (jsonStr) {
        if (onSucceed) {
            onSucceed(evalResult(jsonStr));
        }
    }, onFailed);
}

//执行无结果提示操作
function doSilentOperator2(title, url, data, onSucceed, onFailed) {
    ajax_post(title, url, data, function (jsonStr) {
        onSucceed(evalResult(jsonStr));
    }, onFailed);
}

/*
异步交互的提示
*/
function evalResult(result) {
    try {
        if (typeof (result) == "string") {
            console.log(result);
            result = eval("(" + result + ")");
        }
        if (result.status && result.status.code === 1) {
            console.log("服务器返回登录无效");
            /*if (window.parent)
                window.parent.location.href = "/Login.aspx";
            else
                window.location.href = "/Login.aspx";*/
            return null;
        }
    } catch (ex) {
        return null;
    }
    return result;
}

function ajaxComplete(title, jsonStr) {
    try {
        var result = evalResult(jsonStr);
        if (result == null) {
            showTip(title, "未知错误!");
            return false;
        }
        else if (result.success) {
            showTip(title, "操作成功!");
            return result;
        } else if (result.status && result.status.msg) {
            showMessage(title, result.status.msg + ', 操作失败!');
        } else {
            showMessage(title, "发生未知错误，操作失败!");
        }
    } catch (ex) {
        showMessage(title, "发生未知错误，操作失败!");
    }
    return false;
}

function ajaxCompleteByOrgMessage(title, jsonStr) {
    try {
        var result = evalResult(jsonStr);
        if (result && result.success) {
            return result;
        } else if (result.status && result.status.msg) {
            showTip(title, result.status.msg);
        } else {
            showMessage(title, "操作失败!");
        }
    } catch (ex) {
        showMessage(title, "操作失败!");
    }
    return false;
}

/**
 * 执行远程操作
 * @public 
 * @param {string} title 操作标题
 * @param {string} url 远程URL
 * @param {string} 远程URL的action参数
 * @param {object} arg 参数
 * @param {string} confirmMessage 确认操作的消息
 * @param {function} callBack 执行完成后的回调方法
 * @param {function} checkSelect 操作前置条件检查（参数为当前选择对象）
 * @returns {void} 
 */
function call_remote(title, url, arg, callBack, confirmMessage) {

    if (!confirmMessage)
        confirmMessage = "确定要执行操作吗?";
    $.messager.confirm(title, confirmMessage, function (s) {
        if (s) {
            doOperator(title, url, arg, callBack);
        }
    });
}
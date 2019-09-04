define(function(require, exports, module){

    function initCode(){
        wht.codeInit({
            // 活动通用的错误，！！！改动时只可改动value值，不可改动key值
            SUCCESS: 0, // 成功
            NO_LOGIN: 11000, // 未登录
            ERROR_UNIFY: 20001, // 统一未知错误
            ERROR_PARAM: 20101, // 请求参数错误
            NO_START: 20002, // 活动未开始
            END: 20003, // 活动已结束
            NOT_BUDGET: 20004, // 活动预算不足
            ERROR_OTHER: -1 // 其他错误

            // 活动具体的错误
        });
    }

    function initAjax(){
        wht.ajax({
            error: function () {
                wht.dialog({
                    body: {
                        content: '人品爆发啦，请稍后重试',
                        isWeak: true,
                        weakType: 2
                    }
                });
            }
        });
    }

    function init() {
        initCode();
        initAjax();
    }

    module.exports = {
        init:init
    }
});
/**
 * 活动初始化操作
 */
define(function (require, exports, module) {
    var url = require('../../config/url');
    var commdata = require('./commdata'); // 全局数据
    var a1Main = require('../a1/a1-main'); // 活动1初始化
    // var a2Main = require('./a2/a2-main'); // 活动2初始化
    // var actSwitch = require('common-handle/act-switch'); // 切换到指定页面
    var judgestate = require('../../tool/judgestate');

    function showActPage(r) {
        // 显示活动1
        var isA1 = r[0].Status === 1 && r[1].Status === 0 && r[2].Status === 0 && r[3].Status === 0;
        // 显示活动2
        var isA2 = r[0].Status === 2 && r[1].Status === 1 && r[2].Status === 1 && r[3].Status === 0;

        if (isA1) {
            a1Main.init();
            // 设置当前活动为活动n
            commdata.setCurActId(1);
            // actSwitch.setActShow(1);
        } else if (isA2) {
            // a2Main.init();
            // actSwitch.setActShow(2);
        }
    }

    function dealfn(result) {
        if (result.Code === wht.code.SUCCESS) {
            commdata.setActTime(result.Data.ActTime);
            showActPage(result.Data.actList);
        } else {
            // 出错的情况，直接显示预热页面，但是无法进行其他操作（其他优化方式：调整为 【网络异常，请重新加载，附带猴子图片和重新加载按钮】）
            judgestate.commonHandle({Code:wht.code.ERROR_UNIFY});
            // actSwitch.setActShow(1);
        }
    }

    function initPage() {
        // 不管是否登录都需要请求
        wht.ajax({
            url: url.api.actinfos,
            success: function (result) {
                dealfn(result);
            }
        });
    }

    function init() {
        initPage();
    }

    module.exports = {
        init: init
    }
});




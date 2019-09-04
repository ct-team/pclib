// 渲染页面
define(function (require, exports, module) {
    var countDown = require('../../tool/countdown'); // 倒计时
    var islogin = require('../../tool/islogin'); // 是否登录
    var url = require('../../config/url');
    var judgestate = require('../../tool/judgestate'); // 判断
    var renderActTime = require('../common-handle/render-acttime'); // 活动时间渲染
    var renderPersonal = require('../common-handle/render-personal'); // 个人排名渲染
    // var a2Main = require('../a2/a2-main');
    // var actSwitch = require('../common-handle/act-switch'); // 切换到指定页面

    function getRankId(n) {
        return n == 0 ? '暂无排名' : '第' + n + '名';
    }

    // 渲染地区信息
    function dealfnAreaInfo(result) {
        var $JareaName = $('.J-area-name');
        var $JareaRankId = $('.J-area-rankid');
        var areaName;
        var areaRankId;
        if (result.Code === wht.code.SUCCESS) {
            areaName = result.Data.AreaRank.AreaName;
            areaRankId = getRankId(result.Data.AreaRank.RankId);
        } else {
            areaName = '暂无信息';
            areaRankId = getRankId(0);
        }
        $JareaName.html(areaName);
        $JareaRankId.html(areaRankId);
    }

    function handleAreaInfo() {
        wht.ajax({
            url: url.api.areainfo,
            success: function (result) {
                dealfnAreaInfo(result);
            }
        });
    }

    function formateNum(n) {
        return parseInt(n) < 10 ? '0' + n : n;
    }

    function PopTips() {
        wht.dialog({
            title: '提示',
            close: function () {
                layer.closeAll();
                alert('前往个人Pk活动');
                // 前往个人PK活动
                // a2Main.init();
                // actSwitch.setActShow(2);
            },
            body: {
                content: '<span class="h3-1">活动已开始<br/>请前往参加竞技</span>',
                btn: [{
                    text: '确定'
                }]
            }
        });
    }

    // 渲染倒计时
    function dealfnCountDown(result) {
        var $JcountDownTime = $('.J-counttime');
        var time;
        if (result.Code === wht.code.SUCCESS) {
            var countDownTime = countDown.CountDown;  //result.Data.Time = 3000;
            new countDownTime({
                offset: result.Data.Time
            }).on('running', function (h, m, s, d) {
                // console.log(h, m, s);
                // console.log(formateNum(h), formateNum(m), formateNum(s));
                time = formateNum(h) + '<span class="semicolon">:</span>' + formateNum(m) + '<span class="semicolon">:</span>' + formateNum(s);
                $JcountDownTime.html(time);
            }).on('end', function () {
                time = '00:00:00';
                $JcountDownTime.html(time);
                // 倒计时结束做弹窗操作
                PopTips();
            });
        } else {
            time = '00:00:00';
            $JcountDownTime.html(time);
        }
    }

    function handleCountTime() {   
        wht.ajax({
            url: url.api.countdown,
            success: function (result) { 
                dealfnCountDown(result);
            }
        });
    }

    function initRank() {
        handleAreaInfo();
        renderPersonal.init();
    }

    function init() {
        // 先确定初始化数据的接口是否和登陆有关系，是否是纯展示用的，在活动各个期间表现状态是否一样
        // 先判断是否登陆，登陆则请求，否则不请求

        var isLogin = islogin.init();
        if (!isLogin) {
            judgestate.init(wht.code.NO_LOGIN);
            return;
        }

        handleCountTime();
        renderActTime.handleActTimeA1();
        initRank();
    }

    module.exports = {
        init: init,
        initRank: initRank
    };
});

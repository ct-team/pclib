// 绑定和逻辑处理

define(function(require, exports, module){
    var islogin = require('../../tool/islogin'); // 是否登录
    var postdata = require('../../tool/postdata'); // 公用数据
    var url = require('../../config/url');
    var judgestate = require('../../tool/judgestate'); // 判断
    var a1DrawPopSuccess = require('./a0-draw-pop-success'); // 弹窗成功
    var a1DrawPopFail = require('./a0-draw-pop-fail'); // 弹窗失败
    var pmd1; // 跑马灯1
    var isBind = false; // 按钮绑定

    function dealfn(result){
        // 先初始化数据
        // ...

        // 先通用的判断
        var judsta = judgestate.init(result.Code);
        if(judsta){
            return;
        }

        // 再具体针对这个活动判断
        if(result.Code == wht.code.SUCCESS){
            pmd1.stop(result.Data[0].PrizeId, function(){
                isBind = false;
                a1DrawPopSuccess.init(result.Data);
                pmd1.reset();
            });
        }else if(result.Code === 90001001){
            // 次数不足,未登陆游戏
            a1DrawPopFail.init(result.Data);
        }else{
            // 其他
        }
    }

    function btnDealing(n){
        // 先确定是否登录，没有登陆先登陆
        var isLogin = islogin.init();
        if(!isLogin){
            return;
        }

        if(isBind){
            return;
        }
        isBind = true;
        // 启动跑马灯
        pmd1.start();

        // 与后台交互请求数据处理
        var _postdata = postdata.init();
        _postdata.type = 1;
        wht.ajax({
            url: url.api.doLottery,
            data: _postdata,
            success: function(result){
                dealfn(result);
            }
        });
    }

    function bindBtn(){
        $('#J-pmd1 .J-prizebtn').click(function(){
            var dataid = $(this).attr('data-id');
            pmd1 = wht.game('pmd1');
            btnDealing(dataid);
        });

        // 假设页面上存在两个跑马灯组件
        $('#J-pmd2 .J-prizebtn').click(function(){
            var dataid = $(this).attr('data-id');
            pmd1 = wht.game('pmd2');
            btnDealing(dataid);
        });
    }

    function init(){
        bindBtn();
    }

    module.exports = {
        init:init
    }
});
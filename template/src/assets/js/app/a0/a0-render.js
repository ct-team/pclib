// 渲染页面
define(function (require, exports, module) {
    var islogin = require('../../tool/islogin'); // 是否登录
    var postdata = require('../../tool/postdata'); // 公用数据
    var url = require('../../config/url');

    function dealfn1(result){
        // 一般初始化的数据有未开始、已结束、活动期间、未登录、其他错误的情况
        if(result.Code === wht.code.SUCCESS){
            // ....
            // ....
        }else{
            // 处理其他情况
            // ....
            // ....
        }
    }

    function dealfn(result){
        // 一般初始化的数据有未开始、已结束、活动期间、未登录、其他错误的情况
        if(result.Code === wht.code.SUCCESS){
            // ....
            // ....
        }else{
            // 处理其他情况
            // ....
            // ....
        }
    }

    function ajaxHandle(){
        var _postdata = postdata.init();

        wht.ajax({
            url: url.api.getDrawCount,
            data: _postdata,
            success: function(result){
                dealfn(result);
            }
        });

        wht.ajax({
            url: url.api.getDrawCount1,
            data: _postdata,
            success: function(result){
                dealfn1(result);
            }
        });
    }

    function handle(){
        // 先确定初始化数据的接口是否和登陆有关系，是否是纯展示用的，在活动各个期间表现状态是否一样
        // 先判断是否登陆，登陆则请求，否则不请求

        var isLogin = islogin.init();
        if(!isLogin){
            return;
        }

        // 与后台交互请求
        ajaxHandle();
    }

    function init() {
        handle();
    }

    module.exports = {
        init: init
    };
});

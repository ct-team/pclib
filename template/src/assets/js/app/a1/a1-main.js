// 入口文件
define(function (require, exports, module) {
    var a1Render = require('./a1-render'); // 渲染数据
    var a1Controller = require('./a1-controller'); // 绑定和处理逻辑

    function init(){
        a1Render.init();
        a1Controller.init();
    }

    module.exports = {
        init: init
    };
});


// 入口文件
define(function (require, exports, module) {
    var a0Render = require('./a0-render'); // 渲染数据
    var a0Controller = require('./a0-controller'); // 绑定和处理逻辑

    function init(){
        a0Render.init();
        a0Controller.init();
    }

    module.exports = {
        init: init
    };
});
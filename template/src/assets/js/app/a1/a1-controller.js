// 绑定和逻辑处理

define(function (require, exports, module) {
    var a1Render = require('./a1-render'); // 渲染数据
    var handleRecharge = require('../common-handle/handle-recharge'); // 处理充值
    var handleRule = require('../common-handle/handle-rule'); // 处理规则

    function init() {
        handleRule.init(); // 处理规则
        handleRecharge.init(a1Render.initRank); // 处理充值
    }

    module.exports = {
        init: init
    };
});


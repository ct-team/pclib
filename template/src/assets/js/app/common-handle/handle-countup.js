/**
 * 数字滚动动画
 */

define(function (require, exports, module) {

    function init(idCls, number) {
        new countUp(idCls, 0, number, 0, .4, {
            useEasing: true,
            useGrouping: true,
            separator: '',
            decimal: '.'
        }).start();
    }

    module.exports = {
        init: init
    }
});
// 抽奖失败弹窗
define(function(require, exports, module){

    function popDealing(result){
        var popIndex = wht.dialog({
            body: {
                content: '您的积分不足',
                simContent: '完成任务可获得积分哦',
                btn: [{
                    text: '任务中心',
                    css: '', /*skin-btn-1*/
                    href: 'http://www.yaodou.com',
                    target: '_blank',
                    // 默认为false,执行关闭事件
                    isExeCloseE: true,
                    action: function () {
                    }
                }, {
                    text: '取消'
                }]
            }
        });
        return popIndex;
    }

    function init(result){
        return popDealing(result);
    }

    module.exports = {
        init:init
    };
});
// 抽奖成功弹窗
define(function(require, exports, module){

    function popDealing(result){
        var popIndex = wht.dialog({
            type: 'img',
            body: {
                content: '<span style="color: red;margin-bottom: 10px;">恭喜您，获得'+result[0].PrizeName+'</span>',
                simContent: '直接到<a href="www.baidu.com" target="_blank">我的奖励</a>中查看',
                imgCss: 'msg-img-1',
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
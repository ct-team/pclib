define(function (require, exports, module) {
    var url = require('../../config/url');
    var formatTime = require('../../tool/format-time');
    var commdata = require('./commdata');

    function handleIsRecharge(fn){
        wht.dialog({
            title: '提示',
            close: function(){
                if(typeof fn === 'function'){
                    fn();
                }
            },
            body: {
                content: '<span class="h3-1">是否完成充值</span>',
                btn: [{
                    text: '取消',
                    css: 'skin-btn-2'
                }, {
                    text: '确定',
                    css: 'skin-btn-1'
                }]
            }
        });
    }

    function handle(fn){
        $('.J-recharge').click(function(){
            var timeCode = formatTime.formatJoin(commdata.getActTime().StartTime)+'01';
            $(this).attr('href', url.other.recharge+'actCode='+timeCode);
            handleIsRecharge(fn);
        });
    }

    function init(fn) {
        handle(fn);
    }

    module.exports = {
        init: init,
        handleIsRecharge: handleIsRecharge
    }
});
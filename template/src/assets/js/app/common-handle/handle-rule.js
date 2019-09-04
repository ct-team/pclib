define(function (require, exports, module) {
    var url = require('../../config/url');
    var rule1Tpl = require('../../tpl/rule1-tpl');
    var rule2Tpl = require('../../tpl/rule2-tpl');
    var rule3Tpl = require('../../tpl/rule3-tpl');

    function handle(){
        var aArea = [[695,543],[420,515],[591,320]]; // 440,390
        var ruleTpl = [rule1Tpl, rule2Tpl, rule3Tpl];

        $('.J-rule').click(function(){
            var dataId = $(this).attr('data-id');
            wht.dialog({
                type: 'personal',
                skin: 'layer-ext-rule'+dataId,
                area: aArea[dataId-1],
                close: function(){},
                complete: function(){
                    $('.J-qqserver').attr('href', url.other.qqCustomServer);
                },
                body: {
                    content: ruleTpl[dataId-1]
                }
            });
        });
    }

    function init() {
        handle();
    }

    module.exports = {
        init: init
    }
});

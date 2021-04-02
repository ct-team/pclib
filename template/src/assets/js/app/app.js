define(function (require, exports, module) {
    var actInit = require('./test/a'); // 初始化各个活动


        // 初始化万花筒

        // 初始化各个活动
        
        
        actInit.init();
        alert('ok')

});


























/*
var _html = '<div class="whtui-top">\n' +
    '    <div class="title">[title]</div>\n' +
    '    <a href="javascript:;" class="layui-layer-close layui-layer-close1"></a>\n' +
    '</div>\n' +
    '<div class="whtui">\n' +
    '    <div class="msg-con msg-con-list">\n' +
    '        <div class="msg-center clearfix">\n' +
    '            <h3 class="h3">[con]</h3>\n' +
    '            <ul class="msg-ul-list J-msgList">[msg-ul-list]</ul>\n' +
    '            <span class="sim">[sim]</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>';
// 个性化弹窗
$('.J-btn4').click(function () {
    wht.dialog({
        type: "personal",
        complete: function () {
            // $('')
        },
        body: {
            // 可选，可以是html模板，dom节点
            // content: '<div>hello word</div>',
            content: _html,
            // 可选，默认是【[]】
            btn: [{
                text: '任务中心',
                css: '', /!*skin-btn-1*!/
                href: 'http://www.yaodou.com',
                target: '_blank',
                // 默认为false,执行关闭事件（场景：有的弹窗操作了按钮后不需要关闭当前弹窗）
                isExeCloseE: true,
                action: function () {
                }
            }, {
                text: '取消'
            }]
        }
    });
});*/

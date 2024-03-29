/**
 * 2018.06.14
 * 1.弹窗延迟了20s，目的是解决同城游大厅弹窗图片元素显示不完整的情况
 * 2.弹窗进行了初始化配置，目的是解决同城游大厅内弹窗效果抖动的情况
 */

var wht = {};
(function () {
    var oAjax = {};

    function Ajax(opts) {
        var _this = this;
        if (_this.isRequest) {
            return
        }
        _this.isRequest = true;
        var _type = (typeof opts.type == 'undefined') ? oAjax.type : opts.type;
        $.ajax({
            type: _type,
            url: opts.url,
            data: (typeof opts.data == 'undefined') ? '' : opts.data,
            dataType: opts.dataType || 'json',
            contentType: _type == 'post' ? 'application/json' : '',
            cache: typeof opts.cache == 'undefined' ? false : opts.cache,
            async: typeof opts.async == 'undefined' ? true : opts.async,
            success: function (result) {
                if (typeof opts.success === 'function') {
                    opts.success(result)
                }
            },
            error: function () {
                if (typeof opts.error === 'function') {
                    opts.error()
                }
            },
            complete: function () {
                if (typeof opts.complete === 'function') {
                    opts.complete()
                }
                _this.isRequest = false
            }
        })
    }

    function ajaxInit(opts) {
        oAjax = $.extend({}, {
            type: 'get',
            url: '',
            data: '',
            dataType: 'json',
            contentType: '',
            cache: false,
            async: true
        }, opts)
    }

    function init(opts) {
        if (typeof opts !== 'undefined') {
            ajaxInit(opts)
        }
        wht.ajax = function (params) {
            return new Ajax(params)
        }
    }

    wht.ajaxInit = init;
    init()
})();
(function () {
    function whtCode() {
        var o = {
            SUCCESS: 0,
            NO_LOGIN: 2000,
            NO_START: 3000,
            END: 4000,
            ERROR_SYSTEM: 5000
        };
        return o
    }

    function init(opts) {
        wht.code = $.extend({}, whtCode(), opts)
    }

    wht.codeInit = init;
    init()
})();
(function () {
    var popBaseTpl = '<div class="whtui-wrap">\n' + '    <div class="whtui-top">\n' + '        <div class="title">[title]</div>\n' + '        <a href="javascript:;" class="layui-layer-close layui-layer-close1"></a>\n' + '    </div>\n' + '    <div class="whtui">\n' + '        <div class="msg-con">\n' + '            <i class="i i-sorry"></i>\n' + '            <div class="[msgPositionIndex] clearfix">\n' + '                <h3 class="h3">[con]</h3>\n' + '                <span class="sim">[sim]</span>\n' + '            </div>\n' + '        </div>\n' + '        <div class="select">\n' + '            <input type="checkbox" checked="true" id="nottip"/><label for="nottip">不再提示</label>\n' + '        </div>\n' + '    </div>\n' + '    <div class="whtui-bottom"></div>\n' + '</div>';
    var popImgTpl = '<div class="whtui-wrap">\n' + '    <div class="whtui-top">\n' + '        <div class="title">[title]</div>\n' + '        <a href="javascript:;" class="layui-layer-close layui-layer-close1"></a>\n' + '    </div>\n' + '    <div class="whtui">\n' + '        <div class="msg-con msg-con-img">\n' + '            <div class="msg-center clearfix">\n' + '                <h3 class="h3">[con]</h3>\n' + '                <span class="msg-img [msg-img-index]"></span>\n' + '                <div>[sim]</div>\n' + '            </div>\n' + '        </div>\n' + '    </div>\n' + '    <div class="whtui-bottom"></div>\n' + '</div>';
    var popWeakTpl = '<div class="whtui">\n' + '        <div class="msg-weak">\n' + '            <i class="i i-warn"></i>\n' + '            <div class="msg-left clearfix">\n' + '                <h3 class="h3">[con]</h3>\n' + '                <span class="sim">[sim]</span>\n' + '            </div>\n' + '        </div>\n' + '    </div>';

    function commonFn(_html, opts, personalMark) {
        var _bottomBtn = [];
        if (!opts.body.isWeak && typeof opts.body.btn != 'undefined') {
            $.each(opts.body.btn, function (index, ele) {
                _bottomBtn.push(ele.text)
            })
        }
        var dispearTime = 0;
        if (opts.body.isWeak) {
            dispearTime = opts.body.weakTime || 3000
        }
        setTimeout(function () {
            layer.open({
                type: 1,
                title: opts.title || '提示',
                content: _html,
                skin: typeof opts.skin != 'undefined' ? opts.skin : 'layer-ext-baseskin',
                area: typeof opts.area != 'undefined' ? opts.area : '',
                move: false,
                btn: _bottomBtn,
                scrollbar: typeof opts.body.scrollbar != 'undefined' ? opts.body.scrollbar : true,
                time: dispearTime,
                shadeClose: opts.body.shadeClose || false,
                shade: opts.body.shade == 0 ? 0 : (opts.body.shade || [0.3, '#000']),
                isOutAnim: (typeof opts.body.isOutAnim == 'undefined') ? layerParamter.isOutAnim : opts.body.isOutAnim,
                anim: typeof opts.body.anim != 'undefined' ? 1 : layerParamter.anim,
                success: function (layero, index) {
                    _popIndex = index;
                    /* 此方法ie8及其以下都无法正确处理
                    if (Object.prototype.toString.call(personalMark) == '[object Object]') {
                        $('.' + personalMark.cls + ' .layui-layer-content').css({
                            'height': $('.' + personalMark.cls).height(),
                            'width': $('.' + personalMark.cls).width()
                        })
                    }*/
                    if (typeof personalMark != 'undefined') {
                        $('.' + personalMark.cls + ' .layui-layer-content').css({
                            'height': $('.' + personalMark.cls).height(),
                            'width': $('.' + personalMark.cls).width()
                        })
                    }
                    if (typeof opts.body.closeBtn != 'undefined' && opts.body.closeBtn == false) {
                        $('.layui-layer-close').hide()
                    }
                    var _btnHtml = '';
                    if (typeof opts.body.btn != 'undefined') {
                        _btnHtml = '<div class="layui-layer-btn layui-layer-btn-">';
                        $.each(opts.body.btn, function (index, ele) {
                            if (typeof ele.href != 'undefined') {
                                _btnHtml += '<a class="layui-layer-btn' + index + '" target="_blank" href="' + ele.href + '">' + opts.body.btn[index].text + '</a>'
                            } else {
                                _btnHtml += '<a class="layui-layer-btn' + index + '">' + opts.body.btn[index].text + '</a>'
                            }
                        });
                        _btnHtml += '</div>'
                    }
                    $('.whtui-bottom').html(_btnHtml);
                    if (opts.body.isNotTip) {
                        $('.select').show()
                    }
                    if (opts.body.isSorry) {
                        $('.i-sorry').show()
                    } else {
                        $('.i-sorry').hide()
                    }
                    executefn(opts.complete);
                    if (typeof opts.body.btn != 'undefined') {
                        $.each(opts.body.btn, function (index, ele) {
                            if (index == 0) {
                                $('.layui-layer-btn a').eq(index).addClass('mr')
                            }
                            if (typeof ele.css != 'undefined') {
                                $('.layui-layer-btn a').eq(index).addClass(ele.css)
                            }
                        })
                    }
                    var iconCss = opts.body.iconCss || false;
                    if (!iconCss && opts.body.isWeak && opts.body.weakType == 2) {
                        $('.msg-weak div').removeClass('msg-left').addClass('msg-center');
                        $('.msg-weak i').hide();
                        // 弱提示弹窗关闭向上消失
                        setTimeout(function () {
                            // console.log(layero);
                            $(layero).animate({
                                'top': '-2px',
                                'opacity': 0
                            });
                        }, dispearTime - 500);
                    }
                    if (opts.body.isWeak && opts.body.weakType != 2) {
                        $('.whtui-wrap').addClass('msg-weak');
                        $('.msg-weak .layui-layer-close').hide();
                        $('.layui-layer-btn').hide();
                    }
                },
                end: function () {
                    executefn(opts.close)
                },
                btn1: function (index) {
                    var _isExeCloseE = false;
                    $.each(opts.body.btn, function (index, ele) {
                        if (index == 0 && typeof ele.href != 'undefined') {
                            _isExeCloseE = ele.isExeCloseE;
                            $('.layui-layer-btn0').attr('href', ele.href).attr('target', '_blank')
                        }
                        if (index == 0 && typeof ele.action == "function") {
                            ele.action()
                        }
                        if (index == 0 && typeof ele.css != 'undefined') {
                            $('.layui-layer-btn a').eq(index).addClass(ele.css)
                        }
                    });
                    if (_isExeCloseE) {
                        return false
                    }
                    layer.close(index)
                },
                btn2: function (index) {
                    var _isExeCloseE = false;
                    $.each(opts.body.btn, function (index, ele) {
                        if (index == 1 && typeof ele.href != 'undefined') {
                            _isExeCloseE = ele.isExeCloseE;
                            $('.layui-layer-btn1').attr('href', ele.href).attr('target', '_blank')
                        }
                        if (index == 1 && typeof ele.action == "function") {
                            ele.action()
                        }
                        if (index == 1 && typeof ele.css != 'undefined') {
                            $('.layui-layer-btn a').eq(index).addClass(ele.css)
                        }
                    });
                    if (_isExeCloseE) {
                        return false
                    }
                    layer.close(index)
                }
            });
            return _popIndex;
        }, 20);
    }

    function executefn(fn) {
        if (typeof fn == "function") {
            fn()
        }
    }

    function popNormalTplFn(opts) {
        var _html = '';
        var _popIndex = 0;
        var msgPosition = ['msg-left', 'msg-center'];
        var msgPositionIndex = 0;
        if (opts.body.isWeak && opts.body.weakType == 2) {
            _html = popWeakTpl
        } else {
            _html = popBaseTpl
        }
        if (opts.body.isSorry) {
            msgPositionIndex = 0
        } else {
            msgPositionIndex = 1
        }
        _html = _html.replace(/\[msgPositionIndex\]/g, msgPosition[msgPositionIndex]);
        if (typeof opts.title != 'undefined') {
            _html = _html.replace(/\[title\]/g, opts.title)
        } else {
            _html = _html.replace(/\[title\]/g, '')
        }
        _html = _html.replace(/\[con\]/g, opts.body.content);
        if (typeof opts.body.simContent != 'undefined') {
            _html = _html.replace(/\[sim\]/g, opts.body.simContent)
        } else {
            _html = _html.replace(/\[sim\]/g, '')
        }
        _popIndex = commonFn(_html, opts);
        return _popIndex
    }

    function popImgTplFn(opts) {
        var _popIndex = 0;
        var _html = popImgTpl;
        if (typeof opts.title != 'undefined') {
            _html = _html.replace(/\[title\]/g, opts.title)
        } else {
            _html = _html.replace(/\[title\]/g, '')
        }
        _html = _html.replace(/\[con\]/g, opts.body.content);
        _html = _html.replace(/\[msg-img-index\]/g, opts.body.imgCss);
        if (typeof opts.body.simContent != 'undefined') {
            _html = _html.replace(/\[sim\]/g, opts.body.simContent)
        } else {
            _html = _html.replace(/\[sim\]/g, '')
        }
        _popIndex = commonFn(_html, opts);
        return _popIndex
    }

    function popListTplFn(opts) {
    }

    function popPersonalFn(opts) {
        var _popIndex = 0;
        var _html = opts.body.content;
        var personalMark = {
            type: 'personal',
            cls: opts.skin
        };
        _popIndex = commonFn(_html, opts, personalMark);
        return _popIndex
    }

    var aTpl = ['base', 'img', 'list', 'personal'];

    function init(opts) {
        if (typeof opts == 'undefined') {
            return
        }
        var nPopId = 0;
        if (typeof opts.type == 'undefined') {
            opts.type = 'base'
        }
        switch (opts.type) {
            case 'base':
                nPopId = popNormalTplFn(opts);
                break;
            case 'img':
                nPopId = popImgTplFn(opts);
                break;
            case 'list':
                nPopId = popListTplFn(opts);
                break;
            case 'personal':
                nPopId = popPersonalFn(opts);
                break
        }
        return nPopId
    }

    var layerParamter = {};

    function initParameter(opts){
        layerParamter = $.extend({}, {
            anim: 1,
            isOutAnim: true
        }, opts);
    }

    wht.dialog = function (o) {
        return init(o)
    };
    wht.dialogInit = initParameter;
    init();
})();
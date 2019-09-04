define(function (require, exports, module) {
    var successCallback = null;

    function Lottery(options) {
        //获取初始化参数；
        this._options = options || {};
        //默认值或者退出执行；
        this._options.awardNum = options.awardNum || 6;
        // this._options.awardNum = options.awardNum || return;
        this._options.duration = options.duration || 5000;
        this._options.circles = options.circles || 8;
        this._options.excursion = options.excursion || 0;
        this._options.pointerName = options.pointerName || ".lottery-pointer";

        //回调方法；
        this._options.start = options.start || function () {
        };
        this._options.success = options.success || function () {
        };
        this._options.reset = options.reset || function () {
        };
        this._options.error = options.error || function () {
        };

        //初始化
        this._init(this._options);

    }

    Lottery.prototype = {
        //初始化
        _init: function (options) {
            this.isRotate = false;
            //内部变量；
            this.handlers = {};
            this.sub = 0;
            //记录每次指针停止转动时的角度值；
            this.angleInit = 0;
            this.pointer = this._options.pointerName;

        },
        //开始函数，触发loading效果；
        start: function () {
            if (!this.isRotate) {
                // console.log("开始loading");
                this.isRotate = true;
                if (typeof this._options.start != 'function' && this._options.start != null) {
                    //.warn("参数错误，start");
                } else {
                    this._loading();
                    this._options.start();
                }
            }
        },
        //loading效果；匀速转动；
        _loading: function () {
            var that = this;
            $(this.pointer).rotate({
                angle: that.angleInit,
                duration: 1000 / that._options.circles * 100000000,
                animateTo: 360 * 100000000,
                easing: function (x, t, b, c, d) {
                    return b + (t / d) * c;
                },
                step: function () {
                    that.angleInit = Number($(that.pointer).getRotateAngle() + "");
                }
            });
        },
        _success: function (data) {
            this.isRotate = false;
            if (typeof this._options.stop != 'function' && this._options.stop != null) {
                // console.warn("参数错误，stop");
            } else {
                this._options.success(data);
                successCallback();
            }
        }
        ,
        reset: function () {
            this.isRotate = false;
            $(this.pointer).stopRotate();
            $(this.pointer).rotate(0);
            this.angleInit = 0;
            if (typeof this._options.reset != 'function' && this._options.reset != null) {
                // console.warn("参数错误，stop");
            } else {
                this._options.reset();
            }

        }
        ,
        error: function (data) {
            this._options.error(data);
        },

        gotoIndex: function (id, data, fn) {
            successCallback = fn;
            var that = this;
            var angleNow = this.angleInit;
            //一圈之内指向中奖区域；
            var angleTarget = (Math.floor(this.angleInit / 360) + that._options.circles) * 360 + 360 / that._options.awardNum * (id + 1 - 0.5) - this._options.excursion;
            // console.log(angleTarget);
            $(that.pointer).stopRotate();
            $(that.pointer).rotate({
                angle: angleNow,
                duration: that._options.duration,
                animateTo: angleTarget,
                easing: function (x, t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
                callback: function () {
                    that.angleInit = Number($(that.pointer).getRotateAngle() + "");
                    that._success(data);

                }
            });
        }
    };

    function handle(opt) {
        var o = new Lottery(opt.param);

        /**
         * 给这个游戏组件对象新增stop方法
         * @param prizeid 获奖的id
         * @param fn 获奖后的回调事件
         */
        o.stop = function (prizeid, fn) {
            o.gotoIndex(prizeid, '', fn);
        };

        return o;
    }

    function init(opt) {
        return handle(opt);
    }

    module.exports = {
        init: init
    };
});
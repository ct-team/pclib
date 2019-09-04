define(function (require, exports, module) {
    var successCallback = null;
    var startFn = null;

    var gObj = null;

    var Pounds = function (options) {
        this._options = options;
        this.eggs = $(options.eggs);
        this.hummer = $(options.hummer);
        this.shakeEgg = null;
        this.objEgg = null;

        this.anniNumMax = options.anniNumMax || 6;
        this.speed = options.speed || 300;
        this.anniNum = 0;
        this.isHummer = false;
        this.isRun = false;

        this.arr = [];
        this.orignLeftArr = [];

        // this.hummer = $("#hummer");
        // console.log(options.hummer)
        //回调方法；
        this._options.start = options.start || function () {
        };
        this._options.success = options.success || function () {
        };
        this._options.error = options.error || function () {
        };
        this._options.reset = options.reset || function () {
        };

        this.init();

    }
    Pounds.prototype = {
        handle: function(fn){
            startFn = fn;
        },
        start:function(){
            var self = this;
            if (!self.isRun) {
                this.initAnnimation();
                self.isRun = true;

            }
        },
        error:function(data){
            this._options.error(data);
        },
        reset:function(){
            var self = this;
            if (self.shakeEgg) {
                self.shakeEgg.stop();
            }

            self.isRun = false;


            this._options.reset();
            // 只有在一轮游戏结束的情况下才可以重置；
            if (!self.isRun) {
                this.anniNum = 0;
                for (var i = 0; i < self.eggs.length; i++) {
                    self.eggs.eq(i).removeClass("curr"); //蛋碎效果
                    self.eggs.eq(i).find("div").css('visibility', 'hidden'); //金花四溅
                    self.eggs.eq(i).find("div").html("");
                }
            }
        },

        init: function () {
            var self = this;
            self.hummer.hide();
            self.eggs.hover(function () {
                var posL = $(this).position().left + $(this).width();
                if (self.isHummer) {
                    self.hummer.show().css('left', posL);
                }
            }, function () {
                self.hummer.hide();
            });

            self.eggs.click(function () {
                if(self.isHummer){
                    self.eggClick($(this));
                };

            });

            for (var i = 0; i < self.eggs.length; i++) {
                self.arr[i] = i;
                self.orignLeftArr[i] = self.eggs.eq(i).position().left;
            }

        },
        initAnnimation: function () {
            var self = this;
            self.anniNum++;
            if (self.anniNum == self.anniNumMax) {
                self.arr = [0, 1, 2];
            } else {
                self.arr.sort(randomsort);
            };

            self.eggs.each(function () {
                var sub = getNum($(this).attr('id'));
                $(this).animate({
                    "left": self.orignLeftArr[self.arr[sub]],
                }, self.speed);
            });

            setTimeout(function () {
                if (self.anniNum < self.anniNumMax) {
                    self.initAnnimation();
                } else {
                    // console.log("初始化动画完成");
                    self.isHummer = true;
                }
            }, 310);

        },

        eggClick: function (obj) {
            var _this = obj;
            var self = this;
            self.isHummer = false;  //console.log('----换掉：'); console.log(obj);
            self.objEgg = obj;
            if (_this.hasClass("curr")) {
                return false;
            }
            //_this.unbind('click');
            self.shakeEgg = new Shake(obj.attr('id'), {
                margin: 3
            });


            $(".hammer").css({"top": _this.position().top - 55, "left": _this.position().left + 185});
            $(".hammer").animate({
                    "top": _this.position().top - 25,
                    "left": _this.position().left + 125
                }, 300, function () {
                    $(".hammer").hide();
                    self.shakeEgg.start();
                    self._options.start();
                    if(typeof startFn === 'function'){
                        startFn();
                    }
                }
            );

            gObj = self; // edit by 91

        },
        gotoIndex: function (data, fn) {
            successCallback = fn;

            // var self = this;
            var self = gObj; // edit by 91
            // var oldLeft = self.objEgg.position().left+"px";
            self.shakeEgg.stop();
            self.objEgg.addClass("curr"); //蛋碎效果
            var awardArea = self.objEgg.find("div");
            awardArea.css('visibility', 'visible'); //金花四溅
            awardArea.html(data.award[0]);
            setTimeout(function () {
                self.showOthers(data);
            }, 1000);

        }
        ,
        showOthers: function (data) {
            var self = this;
            var sub = 0;
            for (var i = 0; i < self.eggs.length; i++) {
                if (i != getNum(self.objEgg.attr('id'))) {
                    sub++;
                    self.eggs.eq(i).addClass("curr"); //蛋碎效果
                    self.eggs.eq(i).find("div").css('visibility', 'visible'); //金花四溅
                    self.eggs.eq(i).find("div").html(data.award[sub]);

                };
            }
            self.isRun = false;
            self._options.success(data);

            if(typeof successCallback === 'function'){
                successCallback();
            }
        }
    };

    //外部使用工具函数或者方法；
    function randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }

    function getNum(text) {
        var value = text.replace(/[^0-9]/ig, "");
        return value;
    }

    function handle(opt){
        var o = new Pounds(opt.param);

        /**
         * 给这个游戏组件对象新增stop方法
         * @param prizeid 获奖的id
         * @param fn 获奖后的回调事件
         */
        o.stop = function (prizeid, fn) {
            o.handle(function(){
                setTimeout(function(){
                    o.gotoIndex(prizeid, fn);
                }, 1000);
            });
        };
        return o;
    }

    function init(opt){
        return handle(opt);
    }

    module.exports = {
        init: init
    }

});
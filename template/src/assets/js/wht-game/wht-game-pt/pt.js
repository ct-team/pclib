define(function (require, exports, module) {
    var successCallback = null;

    var Puzzle = function (options) {

        //参数预处理与变量声明
        this._options = options;
        this.isStart = false;
        //参数：难度，图片路径，分割等份
        /************* 参数处理 ******************/
        this.imgUrl = options.img || '';//待操作的图片
        this.pieceArr = options.pieces;

        /************* 节点 ******************/
        this.imgArea = $(options.area);//图片显示区域
        this.imgCells = '';//用于记录碎片节点的变量

        /************* 变量 ******************/
        this.imgOrigArr = [];//图片拆分后，存储正确排序的数组
        this.imgRandArr = [];//图片打乱顺序后，存储当前排序的数组

        //图片整体的宽高
        this.imgWidth = parseInt(this.imgArea.css('width'));
        this.imgHeight = parseInt(this.imgArea.css('height'));
        this.moveTime = options.movetime || 400;//记录animate动画的运动时间，默认400毫秒

        //回调方法；
        this._options.start = options.start || function () {
        };
        this._options.success = options.success || function () {
        };
        this._options.reset = options.reset || function () {
        };

        this.init(this.imgUrl, this.pieceArr);
    }

    Puzzle.prototype = {
        init: function (url, arr) {
            this.isStart = false;
            this.img = url;//待操作的图片
            this.levelArr = arr;
            this.cellWidth = this.imgWidth / arr[1];
            this.cellHeight = this.imgHeight / arr[0];
            this.imgSplit();
        },

        /**
         * [imgSplit 将图片拆分为碎片]
         * @param  obj    [图片,路径+名称]
         * @param  cellW  [碎片宽度]
         * @param  cellH  [碎片高度]
         * @return        [记录正确排序的数组]
         */
        imgSplit: function () {
            this.imgOrigArr = [];//清空正确排序的数组
            //必须清空图片区域的碎片代码，否则每一次拆分图片是与之前拆分的累积
            //例如第一次拆分3x3,插入了9个div，但没有清空，第二次拆分4x4，此时是在前9个div之后再插入14个div，共9+16个div
            this.imgArea.html("");

            var cell = '';//记录单个图片碎片的变量
            for (var i = 0; i < this.levelArr[0]; i++) {
                for (var j = 0; j < this.levelArr[1]; j++) {
                    //将碎片所属div的下标存入数组，用于最终校验是否排序完成
                    this.imgOrigArr.push(i * this.levelArr[1] + j);

                    cell = document.createElement("div");
                    cell.className = "imgCell";
                    $(cell).css({
                        'width': (this.cellWidth - 2) + 'px',
                        'height': (this.cellHeight - 2) + 'px',
                        'left': j * this.cellWidth + 'px',
                        'top': i * this.cellHeight + 'px',
                        "background": "url('" + this.img + "')",
                        'backgroundPosition': (-j) * this.cellWidth + 'px ' + (-i) * this.cellHeight + 'px'
                    });
                    this.imgArea.append(cell);
                }
            }
            // this.imgCells = $('.cube div.imgCell');//碎片节点
            this.imgCells = $(this._options.pieceClass);//碎片节点
        },

        start: function (fn) {
            var self = this;
            if (!self.isStart) {
                //打乱图片
                self.randomArr();
                self.cellOrder(self.imgRandArr);
                //图片事件
                self.imgCells.css({
                    'cursor': 'pointer'
                }).bind('mouseover', function () {
                    $(this).addClass('hover');
                }).bind('mouseout', function () {
                    $(this).removeClass('hover');
                }).bind('mousedown', function (e) {
                    /*此处是图片移动*/
                    $(this).css('cursor', 'move');

                    //所选图片碎片的下标以及鼠标相对该碎片的位置
                    var cellIndex_1 = $(this).index();
                    var cell_mouse_x = e.pageX - self.imgCells.eq(cellIndex_1).offset().left;
                    var cell_mouse_y = e.pageY - self.imgCells.eq(cellIndex_1).offset().top;

                    $(document).bind('mousemove', function (e2) {
                        self.imgCells.eq(cellIndex_1).css({
                            'z-index': '40',
                            'left': (e2.pageX - cell_mouse_x - self.imgArea.offset().left) + 'px',
                            'top': (e2.pageY - cell_mouse_y - self.imgArea.offset().top) + 'px'
                        });
                    }).bind('mouseup', function (e3) {
                        //被交换的碎片下标
                        var cellIndex_2 = self.cellChangeIndex((e3.pageX - self.imgArea.offset().left), (e3.pageY - self.imgArea.offset().top), cellIndex_1);

                        //碎片交换
                        if (cellIndex_1 == cellIndex_2) {
                            self.cellReturn(cellIndex_1);
                        } else {
                            self.cellExchange(cellIndex_1, cellIndex_2);
                        }
                        //移除绑定
                        $(document).unbind('mousemove').unbind('mouseup');
                    });
                }).bind('mouseup', function () {
                    $(this).css('cursor', 'pointer');
                });
                self.isStart = true;
            }

            this._options.start();
            if(typeof fn === 'function'){
                successCallback = fn;
            }

        },
        reset: function () {
            var self = this;
            //复原图片
            self.cellOrder(self.imgOrigArr);
            //取消事件绑定
            self.imgCells.css('cursor', 'default').unbind('mouseover').unbind('mouseout').unbind('mousedown');
            self.isStart = false;
            self._options.reset();
        },


        /**
         * [randomArr 生成不重复的随机数组的函数]
         * @return [无]
         */
        randomArr: function () {
            //清空数组
            this.imgRandArr = [];
            var order;//记录随机数，记录图片放置在什么位置
            for (var i = 0, len = this.imgOrigArr.length; i < len; i++) {
                order = Math.floor(Math.random() * len);
                if (this.imgRandArr.length > 0) {
                    while (jQuery.inArray(order, this.imgRandArr) > -1) {
                        order = Math.floor(Math.random() * len);
                    }
                }
                this.imgRandArr.push(order);
            }
            return;
        },

        /**
         * [cellOrder 根据数组给图片排序的函数]
         * @param  arr [用于排序的数组，可以是正序或乱序]
         * @return     [无]
         */
        cellOrder: function (arr) {
            for (var i = 0, len = arr.length; i < len; i++) {
                this.imgCells.eq(i).animate({
                    'left': arr[i] % this.levelArr[1] * this.cellWidth + 'px',
                    'top': Math.floor(arr[i] / this.levelArr[1]) * this.cellHeight + 'px'
                }, this.moveTime);
            }


        },
        cellChangeIndex: function (x, y, orig) {
            //鼠标拖动碎片移至大图片外
            if (x < 0 || x > this.imgWidth || y < 0 || y > this.imgHeight) {
                return orig;
            }
            //鼠标拖动碎片在大图范围内移动
            var row = Math.floor(y / this.cellHeight), col = Math.floor(x / this.cellWidth), location = row * this.levelArr[1] + col;
            var i = 0, len = this.imgRandArr.length;
            while ((i < len) && (this.imgRandArr[i] != location)) {
                i++;
            }
            return i;
        },

        /**
         * [cellExchange 两块图片碎片进行交换]
         * @param  from [被拖动的碎片]
         * @param  to   [被交换的碎片]
         * @return      [交换结果，成功为true,失败为false]
         */
        cellExchange: function (from, to) {
            var self = this;
            //被拖动图片、被交换图片所在行、列
            var rowFrom = Math.floor(this.imgRandArr[from] / this.levelArr[1]);
            var colFrom = this.imgRandArr[from] % this.levelArr[1];
            var rowTo = Math.floor(this.imgRandArr[to] / this.levelArr[1]);
            var colTo = this.imgRandArr[to] % this.levelArr[1];

            var temp = this.imgRandArr[from];//被拖动图片下标，临时存储

            //被拖动图片变换位置
            this.imgCells.eq(from).animate({
                'top': rowTo * this.cellHeight + 'px',
                'left': colTo * this.cellWidth + 'px'
            }, this.moveTime, function () {
                $(this).css('z-index', '10');
            });
            //表交换图片变换位置
            this.imgCells.eq(to).css('z-index', '30').animate({
                'top': rowFrom * this.cellHeight + 'px',
                'left': colFrom * this.cellWidth + 'px'
            }, this.moveTime, function () {
                $(this).css('z-index', '10');

                //两块图片交换存储数据
                self.imgRandArr[from] = self.imgRandArr[to];
                self.imgRandArr[to] = temp;

                //判断是否完成全部移动，可以结束游戏
                if (self.checkPass(self.imgOrigArr, self.imgRandArr)) {
                    self.success();
                }
            });
        },

        /**
         * [cellReturn 被拖动图片返回原位置的函数]
         * @param  index [被拖动图片的下标]
         * @return       [无]
         */
        cellReturn: function (index) {
            var row = Math.floor(this.imgRandArr[index] / this.levelArr[1]);
            var col = this.imgRandArr[index] % this.levelArr[1];

            this.imgCells.eq(index).animate({
                'top': row * this.cellHeight + 'px',
                'left': col * this.cellWidth + 'px'
            }, this.moveTime, function () {
                $(this).css('z-index', '10');
            });
        },

        /**
         * [checkPass 判断游戏是否成功的函数]
         * @param  rightArr  [正确排序的数组]
         * @param  puzzleArr [拼图移动的数组]
         * @return           [是否完成游戏的标记，是返回true，否返回false]
         */
        checkPass: function (rightArr, puzzleArr) {
            if (rightArr.toString() == puzzleArr.toString()) {
                return true;
            }
            return false;
            // return true;
        },

        /**
         * [success 成功完成游戏后的处理函数]
         * @return [description]
         */
        success: function () {
            //取消样式和事件绑定
            for (var i = 0, len = this.imgOrigArr.length; i < len; i++) {
                if (this.imgCells.eq(i).has('mouseOn')) {
                    this.imgCells.eq(i).removeClass('mouseOn');
                }
            }
            this.imgCells.unbind('mousedown').unbind('mouseover').unbind('mouseout');
            this.isStart = false;
            this._options.success();
            successCallback();
        },

        getState: function () {
            return this.isStart;
        }
    };

    function handle(opt){
        var o = new Puzzle(opt.param);

        /**
         * 给这个游戏组件对象新增stop方法
         * @param prizeid 获奖的id
         * @param fn 获奖后的回调事件
         */
        o.stop = function (prizeid, fn) {
            o.start(fn);
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




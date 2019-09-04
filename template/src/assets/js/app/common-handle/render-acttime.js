define(function (require, exports, module) {
    var commdata = require('./commdata'); // 公用数据
    var formatTime = require('../../tool/format-time'); // 格式化时间

    function handleActTimeA4() {
        // 这里从全局变量去取数据
        var exgTimeS = formatTime.formatYearMonthDay(commdata.getActTime().ExgStartTime);
        var exgTimeE = formatTime.formatYearMonthDay(commdata.getActTime().ExgEndTime);
        var time = exgTimeS + ' - ' + exgTimeE;
        // $('.J-exg-time').html(time);
        // 返回的时间用于弹窗显示
        return time;
    }

    function handleActTimeA2() {
        // 这里从全局变量去取数据
        var actTimeS = formatTime.format(commdata.getActTime().StartTime);
        var actTimeE = formatTime.format(commdata.getActTime().EndTime);
        var exgTimeS = formatTime.format(commdata.getActTime().ExgStartTime);
        var exgTimeE = formatTime.format(commdata.getActTime().ExgEndTime);
        $('.J-pk-time').html(actTimeS + ' - ' + actTimeE);
        $('.J-exg-time').html(exgTimeS + ' - ' + exgTimeE);
    }

    function handleActTimeA1() {
        // 这里从全局变量去取数据
        var actTimeS = formatTime.formatYearMonthDay(commdata.getActTime().StartTime);
        var exgTimeE = formatTime.formatYearMonthDay(commdata.getActTime().ExgEndTime);
        $('.J-act-time').html(actTimeS + ' - ' + exgTimeE);
    }

    module.exports = {
        handleActTimeA1: handleActTimeA1,
        handleActTimeA2: handleActTimeA2,
        handleActTimeA4: handleActTimeA4
    }
});
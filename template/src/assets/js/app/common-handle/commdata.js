/**
 * 公用数据
 */
define(function (require, exports, module) {
    var actTime; // 活动时间
    var curActId; // 当前活动ID值
    var areaRankId; // 所在地区排名

    function getActTime() {
        return this.actTime;
    }

    function setActTime(t) {
        this.actTime = t;
    }

    function getCurActId(){
        return this.curActId;
    }

    function setCurActId(t){
        this.curActId = t;
    }

    function setAreaRankId(t){
        this.areaRankId = t;
    }

    function getAreaRankId(){
        return this.areaRankId;
    }

    module.exports = {
        getActTime: getActTime,
        setActTime: setActTime,
        getCurActId: getCurActId,
        setCurActId: setCurActId,
        setAreaRankId: setAreaRankId,
        getAreaRankId: getAreaRankId
    }
});
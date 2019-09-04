define(function (require, exports, module) {
    var url = require('../../config/url');
    var commdata = require('./commdata');
    var handleCountup = require('./handle-countup');

    function getRankId(n) {
        return n == 0 ? '暂无排名' : '第' + n + '名';
    }

    function dealfnPersonInfo(result){
        var $JyddCount = $('.J-yddcount');
        var $JPersonRankId = $('.J-person-rankid');
        var yddCount;
        var personRankId;
        var areaId;
        if (result.Code === wht.code.SUCCESS) {
            yddCount = result.Data.PersonRank.YddCount;
            personRankId = getRankId(result.Data.PersonRank.RankId);
            areaId = result.Data.PersonRank.AreaId;
        } else {
            yddCount = '0';
            personRankId = getRankId(0);
        }
        
        // 妖豆豆数量加载需要动画效果
        handleCountup.init('J-yddcount'+commdata.getCurActId(),yddCount);  
        // $JyddCount.html(yddCount);
        $JPersonRankId.html(personRankId);

        // 如果是活动2的话，则需要显示个人省份信息的图片
        var curActId = commdata.getCurActId();
        if(curActId === 2){
            $('.J-personal-info-img').css('background-image', 'url('+url.imgUrl.personnalImg+'p'+areaId+'.jpg)').load(function () {
                $(this).fadeIn();
            });
        }
    }

    function handlePersonInfo() {
        wht.ajax({
            url: url.api.personinfo,
            success: function (result) {
                dealfnPersonInfo(result);
            }
        });
    }

    function init() {
        handlePersonInfo();
    }

    module.exports = {
        init: init
    }
});
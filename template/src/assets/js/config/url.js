define(function (require, exports, module) {
    // var vport = window.location.port == '1505' ? 'org:1505' : 'com';

    var gvport = window.location.port;
    var vport = {
        '1505': 'org:1505',
        '1506': 'org:1506',
        '1507': 'org:1507',
        '2505': 'com:2505',
        '': 'com'
    };

   var host = window.location.host;
   var isLocalHost = host == 'a.yaodou.org:1505';
   var pcHallUrlPre = 'tcynew://login.yaodou.com/halllogin.html?gourl=http:';
    module.exports = {
        // 和接口相关
        api: {
            //------------------use-----------------------
            actinfos: '/api/jjc/actinfos', // 活动基本信息
            personinfo: '/api/jjc/personinfo', // 个人信息
            areainfo: '/api/jjc/areainfo', // 地区信息
            countdown: '/api/jjc/countdown', // 得到倒计时时间
            //------------------use-----------------------
        },
        imgUrl: {
            personnalImg: isLocalHost ? '/src/assets/img/a2/persons-info/' : '//static.tcy365.'+ vport[gvport] +'/yd/action/jjc2018/assets/img/a2/persons-info/',
            areaImg: isLocalHost ? '/src/assets/img/a3/area-info/' :  '//static.tcy365.'+ vport[gvport] +'/yd/action/jjc2018/assets/img/a3/area-info/',
            gifUrl: isLocalHost ? '/src/assets/img/pk.gif':'//static.tcy365.'+ vport[gvport] +'/yd/action/jjc2018/assets/img/pk.gif',
            bar: isLocalHost? '/src/assets/img/a3/bar.png':'//static.tcy365.'+ vport[gvport] +'/yd/action/jjc2018/assets/img/a3/bar.png'
        },
        // 其他链接地址
        other:{
            YD_SITE: pcHallUrlPre+'//www.yaodou.com/',
            recharge: pcHallUrlPre+'//pay.yaodou.' + vport[gvport] + '/?', // 充值，需要在conf.js 配置具体活动日期,eg:actCode=2017070601
            recharge1: pcHallUrlPre+'//pay.yaodou.' + vport[gvport] + '/?actCode=201801', // 未使用：活动1 充值
            recharge2: pcHallUrlPre+'//pay.yaodou.' + vport[gvport] + '/?actCode=2017101002', // 未使用：活动2 充值
            vipcenter: pcHallUrlPre+'//vip.yaodou.' + vport[gvport]+'/', // 会员中心
            // qqCustomServer: 'http://crm2.qq.com/page/portalpage/wpa.php?uin=800059011&aty=1&a=1003&curl=&ty=1',
            qqCustomServer: pcHallUrlPre+'//talk.tcy365.com/client/?f=16', // 妖豆客服中心
            gameCenter: pcHallUrlPre+'//www.yaodou.' + vport[gvport] + '/gcenter/', // 游戏中心
            myCoupons: pcHallUrlPre+'//pay.yaodou.' + vport[gvport] + '/mycoupon/' //我的优惠券
        }
    };
});

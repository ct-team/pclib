var baseUrl = '';
// @if NODE_ENV = 'stable'
baseUrl = '//static.tcy365.org:1505/static/xxx/'; // @endif

// @if NODE_ENV = 'pre'
baseUrl = '//prestatic.tcy365.com/static/xxx/';
// @endif
// @if NODE_ENV = 'production'
baseUrl = '//static.tcy365.com/static/xxx/';
// @endif
// @if NODE_ENV = 'development'
baseUrl = './';
// @endif
// 配置文件
requirejs.config({
    // 基础路径
    baseUrl: baseUrl + 'assets/js/app2/',
    urlArgs: new Date().getTime(),
    // 映射路径
    paths: {}
});

requirejs(['./a'], function (a) {
    a.init();
});

module.exports = {
    baseUrl: '//static.tcy365[webport]', //项目资源根目录 [webport] 后缀标识符 默认不修改
    appUrl: '/static/aa/', //项目路径  如   /mobile/test/
    isHttps: false, //是否使用https域名 https 会使用 innerstatic 代替 org:1505
    //isImageMin:true,                      //是否使用图片压缩 【不建议关闭】
    list: [
        { title: '1505-stable', webPort: '.org:1505', env: 'stable' },
        { title: '1507-test', webPort: '.org:1507', env: 'ctest' },
        { title: '1506-develop', webPort: '.org:1506', env: 'dev' },
        { title: '2505-pre', webPort: '.com:2505', env: 'pre' },
        { title: '80-static', webPort: '.com', env: 'production' }
    ],
    //seajs 打包配置 默认使用 []
    seajs: [
        {
            Entry: 'assets/js/app/', //文件入口文件夹
            Out: 'assets/js/app/', //输出文件夹
            Name: 'app.js' //文件夹名称
        }
    ],
    requirejs: [
        {
            Entry: 'assets/js/app2/', //文件入口文件夹
            Out: 'assets/js/app2/', //输出文件夹
            Name: 'main.js' //文件夹名称
        }
    ],
    //图片合并打包配置 默认使用 []
    sprites: [
        {
            Entry: 'assets/sprite/wht-dialog/', //图片入口
            OutImg: 'assets/img/sprite.png', //保存合并后图片的地址
            OutCss: 'assets/css/sprite.scss', //保存合并后对于css样式的地址
            padding: 5, //合并时两个图片的间距
            algorithm: 'binary-tree', //形状 top-down[|]、left-right[-]、diagonal[\]、alt-diagonal[/]、binary-tree[+]
            cssTemplate: 'assets/sprite/sprite-temp.css' //雪碧图样式模板
        }
    ],
    //接口映射
    proxy: {
        path: '/api', //印射为/api
        opt: {
            target: 'http://yapi.tcy365.org:3000/mock/', // 接口域名
            changeOrigin: true //是否跨域
        }
    },
    port: 8082 // 测试版端口号
};


## 使用说明

js资源打包 

使用build:js 加路径的方式把 build的脚本进行压缩合并

``` html

<!--build:js ./assets/js/test.js -->
    <script src="./assets/js/test.js"></script>
<!-- endbuild -->
```

css资源打包

使用build:css 加路径的方式把 build的脚本进行压缩合并

``` html
<!--build:css ./assets/css/main.css -->
    <link rel="stylesheet" href="./assets/css/a.css">
    <link rel="stylesheet" href="./assets/css/index.css">
    <link rel="stylesheet" href="./assets/css/wht-dialog.css">
    <link rel="stylesheet" href="./assets/css/rule.css">
    <link rel="stylesheet" href="./assets/css/my-reward.css">
    <!-- endbuild -->
```

./assets/ ./static/

页面上的上述文本将会被替换成 build-user config.js 内所配置的路径

## log

|版本|说明|
|-|-|
|2.0.0|删除图片压缩功能<br>修改seajs打包功能 不进行hash压缩|
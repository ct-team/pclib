## 使用说明

js 资源打包

使用 build:js 加路径的方式把 build 的脚本进行压缩合并

```html
<!--build:js ./assets/js/test.js -->
<script src="./assets/js/test.js"></script>
<!-- endbuild -->
```

css 资源打包

使用 build:css 加路径的方式把 build 的脚本进行压缩合并

```html
<!--build:css ./assets/css/main.css -->
<link rel="stylesheet" href="./assets/css/a.css" />
<link rel="stylesheet" href="./assets/css/index.css" />
<link rel="stylesheet" href="./assets/css/wht-dialog.css" />
<link rel="stylesheet" href="./assets/css/rule.css" />
<link rel="stylesheet" href="./assets/css/my-reward.css" />
<!-- endbuild -->
```

./assets/ ./static/

页面上的上述文本将会被替换成 build-user config.js 内所配置的路径

## 静态资源

static 与 src 文件夹 同一级

static 文件夹下的内容会复制到 html 文件夹内

```html
//页面内直接使用
<script src="/test.js"></script>
```

## log

| 版本  | 说明                                                     |
| ----- | -------------------------------------------------------- |
| 2.1.0 | 修复无法 ip 访问的问题                                   |
| 2.0.0 | 删除图片压缩功能<br>修改 seajs 打包功能 不进行 hash 压缩 |

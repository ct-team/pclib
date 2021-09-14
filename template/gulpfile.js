var gulp = require("gulp");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var replace = require("gulp-replace");
var gulpif = require("gulp-if");
var useref = require("gulp-useref");
var assetRev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var gulpSequence = require("gulp-sequence");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var del = require("del");
var wrap = require("gulp-wrap");
var rename = require("gulp-rename");
var seajsCombo = require("gulp-seajs-combo");
var config = require("./build-user/config.js");
var minifycss = require("gulp-minify-css");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var connect = require("gulp-connect");
var proxy = require("http-proxy-middleware");
var spritesmith = require("gulp.spritesmith");
//var imagemin = require("gulp-imagemin");
var babel = require("gulp-babel");
var ejs = require("gulp-ejs")
gulp.task("help", function () {
    console.log("sprite 生成雪碧图");
});

//图片压缩
// gulp.task("imgMin", function () {
//     if (!config.isImageMin) {
//         return gulp;
//     }
//     return gulp
//         .src("dist/assets/img/**/*.{png,jpg,jpeg,gif,ico}")
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/assets/img/"));
// });
//sass
gulp.task("sass", function () {
    return gulp
        .src("src/assets/css/*.scss")
        .pipe(sass({ loadPath: "src/assets/css/" }))
        .pipe(gulp.dest("src/assets/css/"));
});

gulp.task("clean-buildAll", function () {
    return gulp
        .src(["dist/build", "dist/build2", "dist/readme.md"], { read: false })
        .pipe(clean());
});
//清除已有文件夹
gulp.task("clean-distUrl", function () {
    return gulp.src("dist", { read: false }).pipe(clean());
});
gulp.task("build", function () {
    return gulp.src("readme.md").pipe(gulp.dest("dist"));
});
gulp.task("clean-rev", function () {
    return gulp
        .src("dist/assets/rev-manifest.json", { read: false })
        .pipe(clean());
});
gulp.task("seajscombo2", function () {
    config.seajs.forEach(function (item) {
        return gulp
            .src("src/" + item.Entry + item.Name)
            .pipe(babel())
            .pipe(seajsCombo())
            .pipe(uglify())
            .pipe(gulp.dest("dist/" + item.Out));
    });
});
gulp.task("sprite", function () {
    var spriteUrl = "src/";
    config.sprites.forEach(function (item) {
        return gulp
            .src(spriteUrl + item.Entry + "*") //需要合并的图片地址
            .pipe(
                spritesmith({
                    imgName: item.OutImg, //保存合并后图片的地址
                    cssName: item.OutCss, //保存合并后对于css样式的地址
                    padding: item.padding, //合并时两个图片的间距
                    algorithm: item.algorithm, //注释1
                    cssTemplate: spriteUrl + item.cssTemplate, //注释2
                })
            )
            .pipe(gulp.dest("src/"));
    });
});
gulp.task("useref", function () {
    return gulp
        .src("src/*.html")
        .pipe(useref(), function () {
            return vinylPaths(del);
        })
        .pipe(gulpif("*.js", babel()))
        .pipe(gulp.dest("dist/build/"));
});
gulp.task("compress-js", function () {
    return gulp
        .src("dist/build2/assets/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/build2/assets/js/"));
});
gulp.task("babel", function () {
    return gulp
        .src("dist/build/assets/js/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/build/assets/js"));
});
gulp.task("compress-css", function () {
    return gulp
        .src("dist/build2/assets/**/*.css")
        .pipe(
            postcss([
                autoprefixer({
                    browsers: ["last 2 versions"], //主流浏览器的最新两个版本
                    cascade: false, //是否美化属性值
                }),
            ])
        )
        .pipe(minifycss())
        .pipe(gulp.dest("dist/build2/assets/"));
});
gulp.task("copy-img", function () {
    return gulp
        .src("src/assets/img/**")
        .pipe(gulp.dest("dist/build/assets/img/"));
});
gulp.task("copy-stitac", function () {
    return gulp.src("src/static/**").pipe(gulp.dest("dist/assets/"));
});
gulp.task("copy-html", function () {
    return gulp.src("dist/build/*.html").pipe(gulp.dest("dist/build2/"));
});
gulp.task("copy-assets", function () {
    return gulp.src("dist/build2/assets/**").pipe(gulp.dest("dist/assets/"));
});
gulp.task("replace-html", function () {
    if (config.isHttps) {
        config.list.forEach(function (item) {
            gulp.src("dist/build2/*.html")
                .pipe(
                    replace(
                        "./assets/",
                        config.baseUrl + config.appUrl + "assets/"
                    )
                )
                .pipe(
                    replace(
                        "./static/",
                        config.baseUrl + config.appUrl + "assets/"
                    )
                )
                .pipe(replace("[webport]", item.webPort))
                .pipe(
                    replace("static.tcy365.org:1505", "innerstatic.tcy365.com")
                )
                .pipe(
                    replace("static.tcy365.org:1507", "teststatic.tcy365.com")
                )
                .pipe(replace("static.tcy365.com:2505", "prestatic.tcy365.com"))
                .pipe(gulp.dest("dist/" + item.title));
        });
    } else {
        config.list.forEach(function (item) {
            gulp.src("dist/build2/*.html")
                .pipe(
                    replace(
                        "./assets/",
                        config.baseUrl + config.appUrl + "assets/"
                    )
                )
                .pipe(
                    replace(
                        "./static/",
                        config.baseUrl + config.appUrl + "assets/"
                    )
                )
                .pipe(replace("[webport]", item.webPort))
                .pipe(gulp.dest("dist/" + item.title));
        });
    }

    return gulp;
});

//替换所有css js html里面的资源地址
gulp.task("revAllContent", function () {
    return gulp
        .src([
            "dist/build2/assets/rev-manifest.json",
            "dist/build2/**/*.{html,js,css}",
        ])
        .pipe(revCollector())
        .pipe(gulp.dest("dist/build2/"));
});
//生成所有hash资源
gulp.task("revAll", function () {
    return gulp
        .src("dist/build/assets/**/*.*")
        .pipe(assetRev())
        .pipe(gulp.dest("dist/build2/assets/"))
        .pipe(assetRev.manifest())
        .pipe(gulp.dest("dist/build2/assets/"));
});

//autoprefixer
gulp.task("prefixer", function () {
    gulp.src("src/assets/css/*.css")
        .pipe(
            postcss([
                autoprefixer({
                    browsers: ["last 2 versions"], //主流浏览器的最新两个版本
                    cascade: false, //是否美化属性值
                }),
            ])
        )
        .pipe(gulp.dest("dist/build/assets/css/"));
});

//全部监听
gulp.task("watch", function () {
    gulp.watch("src/**/*.scss", ["sass"]);
    gulp.watch("src/**/*.*", ["reload"]);
});
gulp.task("reload", function () {
    gulp.src("src/**/*.html").pipe(connect.reload());
});

gulp.task("connect", function () {
    connect.server(
        {
            /*根路径*/
            root: "./src",
            /*开启浏览器自动刷新*/
            livereload: true,
            host: "0.0.0.0", //ip可访问
            /*端口号*/
            port: config.port,
            /*使用代理服务*/
            middleware: function (connect, opt) {
                if (!config.proxy) {
                    return;
                }
                return [proxy(config.proxy.path, config.proxy.opt)];
            },
        },
        function () {
            console.log(
                "\x1B[32m%s\x1B[32m",
                "Server started http://localhost:" + config.port
            );
        }
    );
});
gulp.task("dev", ["sass", "connect", "watch"]);
//开发源代码生成
gulp.task(
    "default",
    gulpSequence(
        "clean-distUrl", //清除版本
        "sass", //src内 模板 sass
        "build", //建立build
        "copy-img",
        "seajscombo2",
        "useref",
        "copy-html",
        "revAll",
        "revAllContent",
        "compress-js",
        "compress-css",
        "copy-assets",
        "copy-stitac",
        "replace-html",
        "clean-rev",
        //"imgMin",
        "clean-buildAll"
    )
);

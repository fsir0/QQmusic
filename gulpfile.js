var gulp = require("gulp");
// 下载后引入的插件
// 压缩图片
var imagemin = require("gulp-imagemin");
// 建测文件是否发生变化
var newer = require("gulp-newer");
// 压缩html
var htmlClean = require("gulp-htmlClean");
// 压缩js
var uglify = require("gulp-uglify");
// 去除文件中的debugger 和 console
var stripDebug = require("gulp-strip-debug");
// 拼接js
var concat = require("gulp-concat");
// less解析器
var less = require("gulp-less");
// 压缩css
var postcss = require("gulp-postcss");
// 添加css前缀代码
var autoprefixer = require("autoprefixer");
// 压缩css
var cssnano = require("cssnano");
// gulp启动本地服务器插件
var connect = require("gulp-connect");


// 取环境变量
// 当前为开发环境的时候不需要压缩，并且需要console
// 当前为生产环境的时候需要压缩
// 在控制台设置当前环境export NODE__ENV=development
// console.log(process.env.NODE_ENV == "development") // true,用来做判断
var devMod = process.env.NODE_ENV == "development";

var folder = {
    src: "./src/", //开发目录文件夹
    build: "./build/" //压缩打包后的文件夹
}
// 在这里注册了一个名称为images的gulp方法，可以在终端运行gulp images
// 流读取文件
// gulp.src()读文件 跟文件夹地址
// gulp.dest()写文件 跟文件夹地址
// gulp.task()任务 跟两个或则三个参数
// gulp.watch()监听 跟两个参数 路径和执行的方法


// gulp.task("images", function() {
//     gulp.src(folder.src + "images/*")
//         // 检测是否是需要新刷新的文件插件
//         .pipe(newer(folder.build + "images"))
//         // 图片压缩插件
//         .pipe(imagemin())
//         .pipe(gulp.dest(folder.build + "images"))
// })

// gulp.task("html", function() {
//     gulp.src(folder.src + "html/*")
//         .pipe(htmlClean())
//         .pipe(gulp.dest(folder.build + "html"))
// })

// gulp.task("default", ["images", "html"], function() {
//     console.log("over");
// })

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.build + "html"))
})
gulp.task("images", function () {
    gulp.src(folder.src + "images/*")
    .pipe(connect.reload())
    .pipe(imagemin())
    .pipe(gulp.dest(folder.build + "images"))
})
gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
    if (!devMod) {
        // 用于去除console
        page.pipe(stripDebug())
        // page.pipe(concat("main.js"))
        page.pipe(uglify())
    }
    page.pipe(gulp.dest(folder.build + "js"))
})
gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
    .pipe(less())
    if (!devMod) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.build + "css"))
})
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "images/*", ["images"]);
})
gulp.task("connect", function() {
    connect.server({
        port: "8090",
        livereload: true
    });
})
gulp.task("default", ["html", "images", "js", "css", "watch", "connect"], function() {
    console.log(devMod);
})
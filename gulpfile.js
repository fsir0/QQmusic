var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlClean = require("gulp-htmlClean");

var folder = {
    src: "./src/",
    build: "./build/"
}
// 在这里注册了一个名称为images的gulp方法，可以在终端运行gulp images
// 流读取文件
gulp.task("images", function() {
    gulp.src(folder.src + "images/*")
        // 检测是否是需要新刷新的文件插件
        .pipe(newer(folder.build + "images"))
        // 图片压缩插件
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "images"))
})

gulp.task("html", function() {
    gulp.src(folder.src + "html/*")
        .pipe(htmlClean())
        .pipe(gulp.dest(folder.build + "html"))
})

gulp.task("default", ["images", "html"], function() {
    console.log("over");
})
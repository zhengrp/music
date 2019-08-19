// gulp.task();
// gulp.src();
// gulp.dest();
// gulp.pipe();

var gulp = require('gulp'),
    // 压缩html 
    htmlclean = require('gulp-htmlclean'),
    // 压缩js
    uglify = require('gulp-uglify'),
    // 压缩图片
    imagemin = require('gulp-imagemin'),
    // 去掉dubug及注释
    strip = require('gulp-strip-debug'),
    // 合并js
    concat = require('gulp-concat'),
    // 解析less
    less = require('gulp-less'),
    // css压缩
    postcss = require('gulp-postcss'),
    // css添加兼容前缀
    autoprefixer = require('autoprefixer'),    
    cssnano = require('cssnano'),
    connect = require('gulp-connect');

//判断是否生产环境
var devMode = process.env.NODE_ENV == "development";
var folder = {
    src: "./src/",
    dist: "./dist/"
}

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    //生产环境时压缩
    // if (!devMode) {
    //     page.pipe(htmlclean())
    // }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())

    //生产环境时压缩
    // if (!devMode) {
    //     page.pipe(strip())
    //     page.pipe(concat('main.js'))
    //     page.pipe(uglify())
    // }

    page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("images", function () {
    gulp.src(folder.src + "img/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "img/"))
})

gulp.task('css', function () {
    var options = [autoprefixer(), cssnano()];
    gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss(options))//添加兼容css3前缀并压缩
        .pipe(gulp.dest(folder.dist + 'css/'))

})
// 监听任务
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'img/*', ['images']);
})

// 开启本地服务器
gulp.task('server', function () {
    connect.server({
        // root:'./dist/html',
        port: '8090',//设置端口
        livereload: true //浏览器自动刷新
    });
})
console.log(devMode)

//执行任务
gulp.task("default", ["html", "js", "images", "css", 'watch', 'server']);
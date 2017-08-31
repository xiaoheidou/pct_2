var gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');      //文件名命名

gulp.task('imagemin', function(){
    return gulp.src('./image/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})
gulp.task('ie', function () {
    gulp.src('./js/ie/*.js')
        .pipe(concat("ie.js"))           //合并
        .pipe(gulp.dest("dist/js"))          //输出保存
        .pipe(rename("ie.min.js"))          //重命名
        .pipe(uglify())                        //压缩
        .pipe(gulp.dest("dist/js"));
});
gulp.task('lib', function () {
    gulp.src(['./js/jquery.min.js','./js/bootstrap.min.js'])
        .pipe(concat("lib.js"))           //合并
        .pipe(gulp.dest("dist/js"))          //输出保存
        .pipe(rename("lib.min.js"))          //重命名
        .pipe(uglify())                        //压缩
        .pipe(gulp.dest("dist/js"));
});
gulp.task('compile-less', function () {
    gulp.src('./less/main.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fileinclude', function () {
    gulp.src('page/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/page'));
});
gulp.task('watch', function () {
    gulp.watch('less/**/*.less', ['compile-less']); //当所有less文件发生改变时，调用testLess任务
    // gulp.watch('./image/*.{png,jpg,gif,ico}', ['imagemin']);
    gulp.watch('page/**/*.html', ['fileinclude']);
});



'use strict';

var gulp  = require('gulp'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create();

gulp.task('serve', [], function() {

    browserSync.init({
        server: './dist'

    });

    gulp.watch('./public/*', ["html"]);
    gulp.watch('./public/*/*', ["html2"]);
    gulp.watch('./public/*/*/*', ["html3"]);


});


gulp.task('html', function() {
    return gulp.src('./public/*')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());

});

gulp.task('html2', function() {
    return gulp.src('./public/*/*')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());

});

gulp.task('html3', function() {
    return gulp.src('./public/*/*/*')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());

});

gulp.task('default', ['serve', 'html', 'html2', 'html3']);
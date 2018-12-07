//Header Files
var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var purgecss = require('gulp-purgecss')
var uglifyjs = require("gulp-babel-minify");


// Stylesheets

// sass
gulp.task('sass', function () {
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// css
gulp.task('css', function () {
    gulp.src('./css/style.css')
        .pipe(uglifycss())
        .pipe(purgecss({
            content:['*.html']
        }))
        .pipe(gulp.dest('./css/min'));
});


// both css and scss
gulp.task('run', ['sass', 'css']);


// js
gulp.task('js', function () {
    gulp.src('./js/script.js')
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('./dist'));
});





// watch sass, css and js 
gulp.task('watch', function () {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./css/style.css', ['css']);
    gulp.watch('./js/script.js', ['js']);
});





// compiles sass, css and js 
gulp.task('default', ['run', 'js']);
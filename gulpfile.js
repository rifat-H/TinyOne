let gulp = require('gulp');
let purgecss = require('gulp-purgecss');
let uglifycss = require('gulp-uglifycss');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let image = require('gulp-image');

// let imagemin = require('gulp-imagemin');  Gives some error: check later
// let handleImage = require('gulp-image-handler'); Does not compile image : have chinese written all ove npm page Delete this



// uses: 
// 1. 'sass' for sass compilation
// 2. 'css_dev' for css compilation without ulgify and purge
// 3. 'css' for css compilation with ugliify and purge
// 4. 'js_dev' for js compilation without ugliify
// 5. 'js'  for js compilation with ugliify
// 6. 'watch' for 'sass' + 'css_dev' + 'js' //add js
// 7. 'default' for 'sass' + 'css_dev' + 'js' compilation
// 8. 'compile' for 'sass' + 'css' + 'js'



// sass


//sass only need/have development build
gulp.task('sass', function () {
    gulp.src('./src/sass/style.scss')
        .pipe(sass())
        .on('error', function (error) {
            console.log(error);

        })
        .pipe(gulp.dest('./src/css'));
});



// css

// css Development build

gulp.task('css_dev', function () {
    gulp.src(['./src/css/style.css', './node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
});

// css production build

gulp.task('css', function () {
    gulp.src(['./src/css/style.css', './node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(purgecss({
            content: ["./*.html"]
        }))
        .pipe(concat('style.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'));
});



// js      

// js development build

gulp.task('js_dev', function () {
    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './src/js/script.js'
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'));
});


// js production build

gulp.task('js', function () {
    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './src/js/script.js'
    ])
    // add uglify for js 
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'));
});


// image optimization
gulp.task('image', function () {
    gulp.src('./src/images/*').pipe(image()).pipe(gulp.dest('./dist/images'));
});


// watch files


gulp.task('watch', function () {
    gulp.watch('./src/sass/style.scss', ['sass']);
    gulp.watch('./src/css/style.css', ['css_dev']);
    gulp.watch('./src/js/*script.js', ['js_dev']);
    gulp.watch('./src/images/*', ['image']);
});



// default
gulp.task('default', ['sass', 'css_dev', 'js_dev', 'image']);


gulp.task('compile', ['sass', 'css', 'js', 'image']);




// test gulp here
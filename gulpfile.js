var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');



var onerror = function(err) {
    if (err) gutil.log(gutil.colors.magenta('!! Error'), ':', gutil.colors.cyan(err.plugin), '-', gutil.colors.red(err.message));
};


//Server Setup
function startExpress() { 
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname + '/public'));
    app.listen(4000);
    console.log('4000');
}


gulp.task('scripts', function() {
    gulp.src(['./scripts/app.js'])        
        .on('error', onerror)
        .pipe(concat('prod.js'))
        .pipe(gulp.dest('./public/dist'))
        .pipe(size())
        .pipe(concat('prod.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/dist'))
        .pipe(size())
        .pipe(livereload());
});

gulp.task('styles', function() {
    gulp.src(['./scss/**/*.scss'])
        .pipe(sass())
        .on('error', onerror)
        .pipe(prefix("last 3 version", "> 1%", "ie 9"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(size())
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src(['./public/**/*.html'])
        .on('error', onerror)
        .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('scss/**', ['styles']);
    gulp.watch('scripts/**', ['scripts']);
    gulp.watch('public/**/*.html', ['html']);
});

gulp.task('default', function() {
    gulp.start('watch');
    startExpress();
});
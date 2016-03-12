var gulp = require('gulp'),
    livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./resources/work_css/*.css', ['css']);
    gulp.watch('./resources/css/*.css', ['reload']);
    gulp.watch('./resources/js/*.js', ['reload']);
})

gulp.task('reload', function () {
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
})

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 3 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./resources/work_css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./resources/css/'));
});
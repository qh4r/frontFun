var gulp = require('gulp'),
    livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var sass = require('gulp-sass');


gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['reload']);
    gulp.watch('./js/*.js', ['reload']);
})

gulp.task('reload', function () {
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
});

gulp.task('sass', function () {
    var processors = [
        //autoprefixer({browsers: ['last 3 version']}),
        //mqpacker,
        //csswring
    ];
    return gulp.src('./sass/*.scss')
        .pipe(sass()).on('error', sass.logError)
        //.pipe(postcss(processors))
        .pipe(gulp.dest('./css/'));
});
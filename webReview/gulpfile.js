var gulp = require('gulp'),
    livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');


gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['reload']);
    gulp.watch('./js/*.js', ['uglify']);
    gulp.watch('./js_min/*.js', ['reload']);
})

gulp.task('uglify', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js_min/'));
});

gulp.task('reload', function () {
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
});

gulp.task('sass', function () {
    var processors = [
        autoprefixer({browsers: ['last 10 version']}),
        //mqpacker,
        //csswring
    ];
    return gulp.src('./sass/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css/'));
});
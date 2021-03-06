var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    minifyCSS = require('gulp-minify-css'),
    compass = require('gulp-compass');
//var sass = require('gulp-sass');


gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./styles/sass/**/*.scss', ['compas']);
    gulp.watch('./styles/css/*.css', ['reload']);
    gulp.watch('./js/*.js', ['reload']);
})

gulp.task('reload', function () {
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
});

gulp.task('compas', function () {
    return gulp.src('./styles/sass/*.scss')
        .pipe(compass({
            css: 'styles/css',
            sass: 'styles/sass',
            image: 'images'
        })).on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        //.pipe(minifyCSS())
        //.pipe(postcss(processors))
        .pipe(gulp.dest('./styles/css/'));
});
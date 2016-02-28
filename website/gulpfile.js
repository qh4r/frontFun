var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('default', function(){
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./resources/css/*.css', ['reload']),
    gulp.watch('./resources/js/*.js', ['reload']);
})

gulp.task('reload',function(){
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
})
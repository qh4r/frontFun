var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('default', function(){
    livereload.listen();
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./*.css', ['reload']);
})

gulp.task('reload',function(){
    gulp.src('./*.html').pipe(livereload());
    //gulp.src('./*.css').pipe(livereload());
})
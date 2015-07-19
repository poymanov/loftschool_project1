var gulp = require("gulp"), 
	browserSync = require("browser-sync"),
	less = require('gulp-less'),
	path = require('path'),
	minifyCss = require('gulp-minify-css');

gulp.task('server', function(){
	browserSync({
		port: 9000, server: {baseDir: 'app'}
	})
});

gulp.task('watch', function(){
	gulp.watch(['app/*html','app/js/**/*.js',
		'app/css/*.css']).on('change',
		browserSync.reload);
	gulp.watch(['app/css/less/*.less']).on('change',
		function () {
  return gulp.src('app/css/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/css/dev'));
});

gulp.watch(['app/css/dev/**/*.css']).on('change',
    	function() {
  return gulp.src('app/css/dev/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css'));
});

});

gulp.task('default', ['server', 'watch']);
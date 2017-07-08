// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
 

// Task
gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'server.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('server.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
}),

gulp.task('scripts', function() {
  return gulp.src(['./public/app/app.js','./public/app/controller/signup.js', './public/app/controller/loginCtrl.js', './public/app/controller/addCollectionCtrl.js', './public/app/controller/mainCtrl.js', './public/app/app.routes.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/dist/'));
});
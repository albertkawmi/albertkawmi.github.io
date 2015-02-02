// Simple Angular App - Gulpfile
// Created 2014-12-11 by Albert Kawmi

// Require modules
var gulp   = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var imageResize = require('gulp-image-resize');   // https://www.npmjs.org/package/gulp-image-resize/;

// Compile Our Sass
gulp.task('sass', function() {

    return gulp.src('style.scss')
      .pipe(sass())
  		.pipe(prefix({
            browsers: ['last 3 versions', '> 1%'],
            cascade: false
      }))
    	.pipe(rename('style.css'))
    	.pipe(gulp.dest(''))
      .pipe(connect.reload());
});

// LiveReload HTML
gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// LiveReload JS
gulp.task('js', function() {
  gulp.src('*.js')
    .pipe(connect.reload());
});

// gulp-connect dev server
gulp.task('webserver', function() {
  connect.server({
    root: '',
    port: 80,
    //host: '127.0.0.2', // not working ??? Using default 'localhost' instead
    livereload: true
  });
});

// NOT IN DEFAULT TASK - run this task separately with: $ gulp images
// Resize images
gulp.task('images', function () {
  gulp.src('original-images/*.{png,jpg}')
    .pipe(imageResize({ 
      width : 1600,
      //height : 100,
      upscale : false, // false = only shrink, don't stretch images
      crop : false,
      gravity : 'Center',
      quality : 0.7,
      //format : '?',
      imageMagick : true
    }))
    .pipe(gulp.dest(''));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('modules/**/*.scss', ['sass']);
    gulp.watch('*.scss', ['sass']);
    gulp.watch('modules/**/*.html', ['html']);
    gulp.watch('*.html', ['html']);
    gulp.watch('modules/**/*.js', ['js']);
    gulp.watch('*.js', ['js']);
});

// Test Task
gulp.task('test', function(){
    console.log("Gulpfile for simple Angular App - by Albert Kawmi");
});

gulp.task('serve', ['webserver', 'watch']);

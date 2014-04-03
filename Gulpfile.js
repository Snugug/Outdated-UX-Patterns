var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var options = require('./.compass-options').compassOptions();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');

//////////////////////////////
// Lint Task
//////////////////////////////
gulp.task('lint', function () {
  return gulp.src(options.html + '/' + options.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

//////////////////////////////
// Compass Task
//////////////////////////////
gulp.task('compass', function () {
  return gulp.src(options.html + '/' + options.sass + '/**/*')
    .pipe(shell([
      'bundle exec compass watch --time'
    ]));
});

//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
  gulp.watch(options.html + '/' + options.js + '/**/*.js', ['lint']);
});

//////////////////////////////
// Server Task
//////////////////////////////
gulp.task('server', function () {
  browserSync.init([
    options.html + '/' + options.css +  '/**/*.css',
    options.html + '/' + options.js + '/**/*.js',
    options.html + '/' + options.img + '/**/*',
    options.html + '/' + options.fonts + '/**/*',
    options.html + '/**/*.html',
  ], {
    server: {
      baseDir: options.html
    }
  });
});

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['watch', 'compass', 'server']);
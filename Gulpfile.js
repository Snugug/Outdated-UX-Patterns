var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var options = require('./.compass-options').compassOptions();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');

var clean = require('gulp-clean');
var deploy = require("gulp-gh-pages");

var plumber = require('gulp-plumber');


//////////////////////////////
// Lint Task
//////////////////////////////
gulp.task('lint', function () {
  return gulp.src([
    options.html + '/' + options.js + '/**/*.js',
    '!' + options.html + '/' + options.js + '/**/*.min.js'
    ])
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
// Usemin Task
//////////////////////////////
gulp.task('usemin', function() {
  gulp.src('index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('imagemin', function () {
  gulp.src([
    options.html + '/' + options.img + '/**/*',
    '!' + options.html + '/' + options.img + '/**/*.svg'
  ])
    .pipe(imagemin())
    .pipe(gulp.dest('build/' + options.img));
});

gulp.task('svgmin', function () {
  gulp.src([
    options.html + '/' + options.img + '/**/*.svg'
  ])
    .pipe(svgmin())
    .pipe(gulp.dest('build/' + options.img));
});

//////////////////////////////
// Clean Task
//////////////////////////////
gulp.task('clean', function () {
  gulp.src(options.html + '/build')
    .pipe(clean());
});

//////////////////////////////
// Build Task
//////////////////////////////
gulp.task('build', ['clean', 'usemin', 'imagemin', 'svgmin']);

//////////////////////////////
// Deploy Task
//////////////////////////////
// gulp.task('deploy', function () {
//   gulp.src(options.html + '/build/**/*')
//     .pipe(shell([
//       'git push origin :gh-pages'
//     ]))
//     .pipe(plumber({
//       errorHandler: error
//     }))
//     .pipe(console.log('Hello World'));
// });

// var error = function (err) {
//   console.log('Oh Noes!');
// }

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['watch', 'compass', 'server']);
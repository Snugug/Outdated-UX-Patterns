var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var options = require('./.compass-options').compassOptions();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var fs = require('fs');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');

var clean = require('gulp-clean');

//////////////////////////////
// Execute Callback Function
//////////////////////////////
var exec = require('child_process').exec;
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

//////////////////////////////
// Recursive Folder Delete
//////////////////////////////
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


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
gulp.task('deploy', function () {
  execute('git add build && git commit -m "Dist Commit"', function () {
    console.log('Temporarily committing build directory');
    execute('git ls-remote origin gh-pages', function (remote) {
      if (remote.length > 0) {
        console.log('Removing upstream gh-pages branch');
        execute('git push origin :gh-pages', function () {
          deployFinish();
        });
      }
      else {
        deployFinish();
      }
    });
  });
});

var deployFinish = function () {
  console.log('Pushing build directory to gh-pages')
  execute('git subtree push --prefix build origin gh-pages', function () {
    execute('git reset HEAD^', function () {
      console.log('Reseting temporary commit');
      console.log('Cleaning build directory');
      deleteFolderRecursive('./build');
    });
  });
}

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['watch', 'compass', 'server']);var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var options = require('./.compass-options').compassOptions();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var fs = require('fs');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');

var clean = require('gulp-clean');

//////////////////////////////
// Execute Callback Function
//////////////////////////////
var exec = require('child_process').exec;
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

//////////////////////////////
// Recursive Folder Delete
//////////////////////////////
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


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
gulp.task('git-deploy', function () {
  execute('git add build && git commit -m "Dist Commit"', function () {
    console.log('Temporarily committing build directory');
    execute('git ls-remote origin gh-pages', function (remote) {
      if (remote.length > 0) {
        console.log('Removing upstream gh-pages branch');
        execute('git push origin :gh-pages', function () {
          deployFinish();
        });
      }
      else {
        deployFinish();
      }
    });
  });
});

var deployFinish = function () {
  console.log('Pushing build directory to gh-pages')
  execute('git subtree push --prefix build origin gh-pages', function () {
    console.log('Reseting temporary commit');
    execute('git reset HEAD^', function () {
      console.log('Cleaning build directory');
      deleteFolderRecursive('./build');
    });
  });
};

gulp.task('deploy', ['build', 'git-deploy']);

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['watch', 'compass', 'server']);
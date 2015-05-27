"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');

function isOnlyChange (event) {
  return event.type === 'changed';
}

var options = {
  path: {
    src: {
      dir: 'src/',
      less: 'src/**/*.less',
      js: 'src/**/*.js',
      tpl: 'src/js/angular.components/**/*.html'
    },
    dist: {
      dir: 'app/assets/dist/',
      css: 'app/assets/dist/css/',
      js: 'app/assets/dist/js/',
      tpl: 'app/assets/dist/tpl/'
    }

  }
};

gulp.task('styles', function () {
  // place code for your default task here
  gulp.src('./src/less/style.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(options.path.dist.css));
});

gulp.task('javascript', function () {
  return gulp.src(options.path.src.js)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(options.path.dist.js));
});

// Move templates files
gulp.task('templates', function () {
  gulp.src(options.path.src.tpl)
    .pipe(gulp.dest(options.path.dist.tpl));
});


gulp.task('watch', ['build'], function () {

  gulp.watch([
    options.path.src.less,
    options.path.src.js,
    options.path.src.tpl
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('javascript');
      gulp.start('styles');
      gulp.start('templates');
    } else {
      gulp.start('inject');
    }
  });
});


gulp.task('build', ['templates', 'styles', 'javascript'], function () {
  // place code for your default task here
  console.log("Build Ok");
});
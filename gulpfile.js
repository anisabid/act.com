"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var vm = require('vm');
var jsonServer = require('json-server')

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

/*
gulp.task('json', function () {
  //vm.runInThisContext('json-server  C:\/Personal_Unsaved\/tools\/wamp\/www\/act.com\/jsonmock\/generator.js');
  setTimeout(function () {
   vm.runInThisContext('json-server jsonmock/generator.js');
   }, 1000);

  var server = jsonServer.create(); // Returns an Express server
  var router = jsonServer.router('jsonmock/generator.js'); // Returns an Express router

  server.use(jsonServer.defaults); // logger, static and cors middlewares
  server.use(router); // Mount router on '/'

  server.listen(3000)
})
*/

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
"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');


gulp.task('less', function() {
    // place code for your default task here
    gulp.src('./src/**/*.less') //path to your main less file
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('assets/css/')); // your output folder
});

gulp.task('build', ['less'], function() {
    // place code for your default task here
    console.log("Build Ok");
});
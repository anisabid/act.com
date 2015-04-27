"use strict";

var gulp = require('gulp');

gulp.task('lessToCss', function() {
    // place code for your default task here

});

gulp.task('build', ['cssMin'], function() {
    // place code for your default task here
    console.log("Build Ok");
});
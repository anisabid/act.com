"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

function isOnlyChange(event) {
    return event.type === 'changed';
}

var options = {
    path: {
        src: {
            dir: "src/",
            less: "src/**/*.less",
            js: "src/**/*.js"
        },
        dist: {
            dir: "app/assets/",
            css: "app/assets/css/",
            js: "app/assets/js/"
        }

    }
};

gulp.task('styles', function () {
    // place code for your default task here
    gulp.src('./src/less/style.less') //path to your main less file
        .pipe(less(
            paths
    :
    [path.join(__dirname, 'less', 'includes')]
    ))
    .
    pipe(gulp.dest(options.path.dist.css)); // your output folder
});

gulp.task('watch', function () {
    gulp.watch([
        options.path.src.less
    ], function (event) {
        if (isOnlyChange(event)) {
            gulp.start('styles');
        } else {
            gulp.start('inject');
        }
    });
});

gulp.task('build', ['styles'], function () {
    // place code for your default task here
    console.log("Build Ok");
});
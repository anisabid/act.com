"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

function isOnlyChange(event) {
    return event.type === 'changed';
}

var options = {
    path : {
        src:{
            dir: "src/",
            less: "src/**/*.less",
            js: "src/**/*.js"
        },
        dist:{
            dir: "app/assets/dist/",
            css: "app/assets/dist/css/",
            js: "app/assets/dist/js/"
        }

    }
};

gulp.task('styles', function() {
    // place code for your default task here
    gulp.src('./src/less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(options.path.dist.css));
});

gulp.task('watch', function () {
    gulp.watch([
        options.path.src.less
    ], function(event) {
        if(isOnlyChange(event)) {
            gulp.start('styles');
        } else {
            gulp.start('inject');
        }
    });
});

gulp.task('build', ['styles'], function() {
    // place code for your default task here
    console.log("Build Ok");
});
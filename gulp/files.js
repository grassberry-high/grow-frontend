'use strict';
var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});
var args = require('yargs').argv;

gulp.task('docker', function () {
  var src = [paths.src + '/Dockerfile', paths.src + '/.dockerignore', paths.src + '/.dockerenv', paths.src + '/nginx.production.conf']
  var dest = paths.dist + '/';

  return gulp.src(src)
    .pipe($.rename({dirname: ''}))
    .pipe($.if(args.development , $.replace("server core:8080", "server docker.for.mac.localhost:8080")))
    .pipe(gulp.dest(dest));
});

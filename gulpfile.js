'use strict';

var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');
gulp.registry(FwdRef());

gulp.paths = {
  src: 'src/',
  dist: 'dist/'
};

require('require-dir')('./gulp');

gulp.task('default', gulp.series('docker'));

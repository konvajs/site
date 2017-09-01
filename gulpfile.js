var gulp = require('gulp'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  jsdoc = require('gulp-jsdoc3'),
  webserver = require('gulp-webserver');

// steps
// 1. clean /public folder
// 2. generate new /public with hexo
// 3. replace /public/downloads with /source/downloads
// 4. generate api docs to /public

// 1
gulp.task('clean-public', function() {
  return gulp.src('public', { read: false }).pipe(clean());
});

// 2
gulp.task(
  'generate-hexo',
  ['clean-public'],
  shell.task(['node ./node_modules/hexo/bin/hexo generate'], { cwd: './' })
);

// 3
gulp.task('clean-public-downloads', ['generate-hexo'], function() {
  return gulp.src('public/downloads', { read: false }).pipe(clean());
});

gulp.task('copy-source-download', ['clean-public-downloads'], function() {
  return gulp.src('source/downloads/**').pipe(gulp.dest('public/downloads'));
});

// 4
gulp.task('docs', function() {
  var config = require('./jsdoc.json');
  return gulp.src(['./konva.js', '../konva/README.md']).pipe(jsdoc(config));
});

gulp.task('server', function() {
  gulp.src('public').pipe(webserver({}));
});

gulp.task('generate', [
  'clean-public',
  'generate-hexo',
  'clean-public-downloads',
  'copy-source-download',
  'docs'
]);

gulp.task('default', ['generate', 'server']);

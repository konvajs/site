var gulp = require('gulp'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  jsdoc = require('gulp-jsdoc3');

// steps
// 2. generate new /public with hexo
// 3. replace /public/downloads with /source/downloads
// 4. generate api docs to /public

// 1 clean /public folder
gulp.task('clean-public', function() {
  return gulp.src('public', { read: false }).pipe(clean());
});

// 2 generate new /public with hexo
gulp.task(
  'generate-hexo',
  ['clean-public'],
  shell.task(['node ./node_modules/hexo/bin/hexo generate'], { cwd: './' })
);

// 3 replace /public/downloads with /source/downloads
gulp.task('clean-public-downloads', ['generate-hexo'], function() {
  return gulp.src('public/downloads', { read: false }).pipe(clean());
});

gulp.task('copy-source-download', ['clean-public-downloads'], function() {
  return gulp.src('source/downloads/**').pipe(gulp.dest('public/downloads'));
});

// 4 generate api docs to /public
gulp.task('docs', ['clean-public'], function() {
  var config = require('./jsdoc.json');
  return gulp.src(['./konva.js', '../konva/README.md']).pipe(jsdoc(config));
});

gulp.task('generate', [
  'clean-public',
  'generate-hexo',
  'copy-source-download',
  'docs'
]);

gulp.task('default', ['generate']);

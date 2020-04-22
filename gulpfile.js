var gulp = require('gulp'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  jsdoc = require('gulp-jsdoc3');

// 1 clean /public folder
gulp.task('clean-public', function () {
  return gulp.src('public', { read: false, allowEmpty: true }).pipe(clean());
});

// 2 generate new /public with hexo
gulp.task(
  'generate-hexo',
  gulp.series(
    'clean-public',
    shell.task(['node ./node_modules/hexo/bin/hexo generate'], { cwd: './' })
  )
);

// 3 replace /public/downloads with /source/downloads
gulp.task('clean-public-downloads', function () {
  return gulp.src('public/downloads', { read: false }).pipe(clean());
});

gulp.task(
  'copy-source-download',
  gulp.series('clean-public-downloads', function () {
    return gulp.src('source/downloads/**').pipe(gulp.dest('public/downloads'));
  })
);

// 4 generate api docs to /public
gulp.task('docs', function () {
  var config = require('./jsdoc.json');
  return gulp.src(['./konva.js', '../konva/README.md']).pipe(jsdoc(config));
});

gulp.task(
  'generate',
  gulp.series('clean-public', 'generate-hexo', 'copy-source-download', 'docs')
);

gulp.task('default', gulp.series('generate'));

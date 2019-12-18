var gulp = require('gulp'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  jsdoc = require('gulp-jsdoc3');

// steps
// 2. generate new /public with hexo
// 3. replace /public/downloads with /source/downloads
// 4. generate api docs to /public

// 1 clean /public folder
function cleanPublic() {
  return gulp.src('public', { read: false, allowEmpty: true }).pipe(clean());
}

// 2 generate new /public with hexo
function generateHexo() {
  return gulp.src('./').pipe(shell(['node ./node_modules/hexo/bin/hexo generate'], { cwd: './' }));
}

// 3 replace /public/downloads with /source/downloads
function cleanPublicDownloads() {
  return gulp.src('public/downloads', { read: false }).pipe(clean());
}

function copySourceDownload() {
  return gulp.src('source/downloads/**').pipe(gulp.dest('public/downloads'));
}

// 4 generate api docs to /public
function generateDocs() {
  var config = require('./jsdoc.json');
  return gulp.src(['./konva.js', '../konva/README.md']).pipe(jsdoc(config));
}

exports.default = gulp.series(
  cleanPublic,
  generateHexo,
  cleanPublicDownloads,
  copySourceDownload,
  generateDocs
);

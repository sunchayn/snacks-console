const
  gulp        = require('gulp'),
  console     = require('better-console'),
  plumber     = require('gulp-plumber'),
  notify      = require('gulp-notify'),
  concat      = require('gulp-concat'),
  rename      = require('gulp-rename'),
  ext_replace = require('gulp-ext-replace'),
  replace     = require('gulp-replace'),
  print       = require('gulp-print').default,
  del         = require('del')
;

const
  log       = require('../helpers/log')
;

const config = require('../config/export.js');

module.exports = function(callback) {
  console.log('copying html files...');
  gulp.src(config.html.src)
    .pipe(replace(/(<link.*href=")(.*)(".*>)/gi, '$1public/$2$3'))
    .pipe(replace(/(<script.*src=")(.*)(".*>)/gi, '$1public/$2$3'))
    .pipe(replace(/(<img.*src=")(.*)(".*>)/gi, '$1public/$2$3'))
    .pipe(ext_replace('.php'))
    .pipe(gulp.dest(config.html.outputDir))
    .pipe(print(log.created))
  ;

  del(config.html.outputDir + '/*.html', {force: true});
}

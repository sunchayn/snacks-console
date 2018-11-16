const
  gulp      = require('gulp'),
  sass      = require('gulp-sass'),
  plumber   = require('gulp-plumber'),
  notify    = require('gulp-notify'),
  console   = require('better-console'),
  rename    = require('gulp-rename'),
  print     = require('gulp-print').default
;

const 
  log       = require('../helpers/log')
;

const destBaseDir = global.destBaseDir;

const
  source = './src/scss/main.scss',
  outputFolder = destBaseDir + '/css/',
  output = 'app.min.css',
  srcForSASSCompiler = ['./src/scss/**/*']
;

module.exports = function(callback) {
  
  console.log('Building CSS file...');

  return gulp.src(source)
  .pipe(plumber({ errorHandler: function(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
    })(err);
  }}))
  .pipe(sass({
      includePaths: srcForSASSCompiler,
      outputStyle: 'compressed'
  }))
  .pipe(rename(output))
  .pipe(gulp.dest(outputFolder))
  .pipe(print(log.created))
}
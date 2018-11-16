const
  gulp      = require('gulp'),
  console   = require('better-console'),
  print     = require('gulp-print').default
;

const 
  log       = require('../helpers/log')
;

const destBaseDir = global.destBaseDir;

const
  src  = './src/html/**/*.html',
  dest = destBaseDir;

module.exports = function(callback) {
  
  console.log('Building HTML files...');

  return gulp.src(src)
  .pipe(gulp.dest(dest))
  .pipe(print(log.created))
  ;
}
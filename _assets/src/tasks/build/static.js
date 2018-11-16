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
  src  = './src/static/**/*',
  dest = destBaseDir + '/static'
  cssSrc  = './src/css/**/*',
  cssDest = destBaseDir + '/css'
;

module.exports = function(callback) {
  
  console.log('Building Static files...');

  gulp.src(cssSrc)
  .pipe(gulp.dest(cssDest))
  // .pipe(print(log.created))
  ;

  return gulp.src(src)
  .pipe(gulp.dest(dest))
  .pipe(print(log.created))
  ;
  
}
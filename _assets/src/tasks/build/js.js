const
  gulp        = require('gulp'),
  console     = require('better-console'),
  plumber     = require('gulp-plumber'),
  notify      = require('gulp-notify'),
  concat      = require('gulp-concat'),
  rename      = require('gulp-rename'),
  print       = require('gulp-print').default,
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  buffer      = require('vinyl-buffer'),
  source      = require('vinyl-source-stream')
;

const
  log       = require('../helpers/log')
;

const destBaseDir = global.destBaseDir;

const config = {
  src: './src/js/main.js',
  outputDir: destBaseDir + '/js/',
  outputFile: 'bundle.js',
  vendor: {
    src : './src/js/vendor/*.js',
    outputDir: destBaseDir + '/js/',
    outputFile: 'vendor.min.js',
  }
};

function bundle (bundler) {
    return bundler
      .bundle()
      .pipe(plumber({ errorHandler: function(err) {
        notify.onError({
          title: "Gulp error in " + err.plugin,
          message:  err.toString()
        })(err);
      }}))
      .pipe(source( config.src ))
      .pipe(buffer())
      .pipe(rename(config.outputFile))
      .pipe(gulp.dest(config.outputDir))
      .pipe(print(log.created))
    ;
}

module.exports = function(callback) {

  console.log('Building JS files...');

  gulp.src(config.vendor.src)
  .pipe(concat(config.vendor.outputFile))
  .pipe(gulp.dest(config.vendor.outputDir));

  const bundler = browserify(config.src)
                    .transform(babelify, {
                      plugins: ["transform-html-import-to-string", "@babel/plugin-transform-runtime"],
                      presets : [ '@babel/preset-env' ]
                    });

  return bundle(bundler);
}

global.destBaseDir = './dist';

const
	gulp = require('gulp'),
  buildSASS = require('./src/tasks/build/sass'),
  buildJS = require('./src/tasks/build/js'),
  buildHTML = require('./src/tasks/build/html'),
  buildStatic = require('./src/tasks/build/static'),
  browserSync = require('browser-sync').create(),

  exportJS      = require('./src/tasks/export/js'),
  exportHTML = require('./src/tasks/export/html'),
  exportStatic = require('./src/tasks/export/static'),
  exportCSS = require('./src/tasks/export/css')
;

gulp.task('build:sass', buildSASS);
gulp.task('build:js', buildJS);
gulp.task('build:html', buildHTML);
gulp.task('build:static', buildStatic);

gulp.task('export', function() {
  exportJS();
  exportHTML();
  exportCSS();
  exportStatic();
});

gulp.task('export:js', exportJS);
gulp.task('export:html', exportHTML);
gulp.task('export:static', exportStatic);
gulp.task('export:css', exportCSS);

gulp.task('build', function() {
  buildSASS();
  buildJS();
  buildHTML();
  buildStatic();
});

gulp.task('serve', ['build'], function () {
  browserSync.init({
	server: {
	  baseDir: ['./dist/'],
	},
	notify: false,
	ui: false,
	open: false,
	injectChanges: true,
  });

  gulp.watch('./src/scss/**/*', ['reload:sass']);
  gulp.watch('./src/js/**/*', ['reload:js']);
  gulp.watch('./src/html/**/*', ['reload:html']);

});

gulp.task('reload:sass', function () {
  buildSASS().on('end', function() {
	browserSync.reload();
  });
});

gulp.task('reload:js', function () {
  buildJS().on('end', function() {
	browserSync.reload();
  });
});

gulp.task('reload:html', function () {
	buildHTML().on('end', function() {
		browserSync.reload();
	});
});

gulp.task('watch:build:export', ['build', 'export'], function() {
  gulp.watch('./src/scss/**/*', ['re-export:css']);
  gulp.watch('./src/js/**/*', ['re-export:js']);
  gulp.watch('./src/html/**/*', ['re-export:html']);
})

gulp.task('re-export:css', function () {
  buildSASS().on('end', function() {
  	exportCSS();
  });
});

gulp.task('re-export:js', function () {
  buildJS().on('end', function() {
	exportJS();
  });
});

gulp.task('re-export:html', function () {
  buildHTML().on('end', function() {
	exportHTML();
  });
});

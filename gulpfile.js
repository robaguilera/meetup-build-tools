var gulp = require('gulp'),
    args = require('yargs').argv,
    del = require('del'),
    path = require('path'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass/Less ---> CSS');
  return gulp.src('styles/sass/*.scss')
        .pipe($.plumber({
          errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }}))
        .pipe($.sourcemaps.init())
          .pipe($.sass())
          .pipe($.if(args.verbose, $.print()))
          .pipe($.autoprefixer('last 2 version'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./styles/css/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('serve', ['styles'], function(){
  browserSync.init({
    server: './'
  });
  gulp.watch('./styles/sass/**/*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('clean-styles', function() {
  var files = 'dist/*.css';
  clean(files);
});

// Function
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.yellow(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.yellow(msg));
  }
}

function clean(path) {
  log('Cleaning ' + $.util.colors.yellow(path));
  return del(path);
}

gulp.task('watch', ['serve']);

var gulp = require('gulp')
var merge = require('merge2');
var clean = require( 'gulp-clean' );
var tslint = require("gulp-tslint");
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

gulp.task ('clean:typings', function() {
  return gulp.src(['typings'], {read: false})
    .pipe( clean() )
});

gulp.task ('clean:target', function() {
  return gulp.src(['target'], {read: false})
    .pipe( clean() )
});

gulp.task ('clean:all', ['clean:target', 'clean:typings'], function() {
  return gulp.src(['node_modules'], {read: false})
    .pipe( clean() )
});

gulp.task('html', function() {
  return gulp.src('src/main/webapp/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('target/release/'));
});
 
gulp.task('scripts', function() {
    var tsResult = gulp.src("src/main/webapp/js/**/*.ts")
	.pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(sourcemaps.init())
        .pipe(ts({
          declaration: true,
          lib: ["es6", "dom"],
          target: "es5",
          experimentalDecorators: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest('target/release/definitions')),
        tsResult.js
	 .pipe(sourcemaps.write('../maps'))
	 .pipe(minify())
	 .pipe(gulp.dest('target/release/js'))
    ]); 
});

gulp.task('styles', function() {
    return gulp.src("src/main/webapp/css/**/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('target/release/css'));
});

gulp.task( 'clean:scripts', ['scripts'], function() {
  return gulp.src(['target/release/js/**/*.js', '!target/release/js/**/*-min.js'], { read: false })
    .pipe( rm() )
});


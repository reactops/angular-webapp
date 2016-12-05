var gulp = require('gulp')
var merge = require('merge2');
var clean = require( 'gulp-clean' );
var tslint = require("gulp-tslint");
var ts = require('gulp-typescript');
var gnf = require('gulp-npm-files');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var rename = require("gulp-rename");

var srcRoot = 'src';
var destRoot = 'target';

var srcTsRoot = srcRoot + '/main/angular';
var destHtmlRoot = srcRoot + '/main/angular';
var destAssetsRoot = destHtmlRoot + '/assets';
var destAssetsProduct = destAssetsRoot + '/product';
var destAssetsVendor = destAssetsRoot + '/vendor';

gulp.task ('clean:typings', function() {
  return gulp.src(['typings'], {read: false})
    .pipe( clean() )
});

gulp.task ('clean:target', function() {
  return gulp.src([destRoot], {read: false})
    .pipe( clean() )
});

gulp.task ('clean:all', ['clean:target', 'clean:typings'], function() {
  return gulp.src(['node_modules'], {read: false})
    .pipe( clean() )
});

gulp.task('copyNpmDeps', function() {
     return gulp.src(gnf(), {base:'./'})
	.pipe(gulp.dest(destAssetsVendor));
});

gulp.task('connonize-ng', ['copyNpmDeps'], function() {
     return gulp.src(destAssetsVendor + '/node_modules/@angular/**/*.*')
	.pipe(gulp.dest(destAssetsVendor + '/angular2/'));
});

gulp.task('connonize-deps', ['connonize-ng'], function() {
     return gulp.src([destAssetsVendor + '/node_modules/**/*'])
        .pipe(gulp.dest(destAssetsVendor));
});

gulp.task('resolve-deps', ['connonize-deps'], function() {
     gulp.src([destAssetsVendor + '/node_modules', destAssetsVendor + '/@angular'], { read: false})
        .pipe( clean() );
});

gulp.task('html', function() {
  return gulp.src(srcTsRoot + '/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destHtmlRoot));
});
 
gulp.task('scripts', ['resolve-deps'], function() {
    var tsResult = gulp.src(['!node_modules', 'typings/index.d.ts', '!typings/global', srcTsRoot + '/config/typings.d.ts', srcTsRoot + '/**/*.ts'])
	.pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(sourcemaps.init())
        .pipe(ts({
	  module: 'commonjs',
          moduleResolution: 'node',
          noImplicitAny: false,
          sourceMap: true,
          target: "es6",
          declaration: true,
          experimentalDecorators: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(destAssetsProduct + '/definitions')),
        tsResult.js
	 .pipe(sourcemaps.write('./maps'))
	 .pipe(gulp.dest(destAssetsProduct + '/js'))
    ]); 
});

gulp.task('minifyjs', function() {
    return gulp.src(destAssetsProduct + '/js/**/*.js')
	.pipe(minify())
	.pipe(gulp.dest(destAssetsProduct + '/js'));
});

gulp.task('styles', function() {
    return gulp.src(srcTsRoot + "/**/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(destAssetsProduct + '/css'));
});

gulp.task( 'clean:scripts', ['scripts'], function() {
  return gulp.src([destAssetsProduct + '/js/**/*.js', '!' + destAssetsProduct + '/js/**/*-min.js'], { read: false })
    .pipe( rm() )
});


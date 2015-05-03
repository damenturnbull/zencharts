// --------------------------------
// Includes
//
var gulp            = require('gulp'),
    sass            = require('gulp-ruby-sass'),
    browserSync     = require('browser-sync').create()
    reload          = browserSync.reload,
    sourcemaps      = require('gulp-sourcemaps'),
    minifyCss       = require('gulp-minify-css');

// --------------------------------
// Directories
//
var dir_sass        = './sass/',
    dir_css         = './css/',
    dir_js          = './js/',
    dir_sass_maps   = './maps/';

// --------------------------------
// Files
//
var file_sass       = 'style.scss',
    file_css        = 'style.css',
    file_index      = 'index.html';

// --------------------------------
// Sources
//
var src_sass        = dir_sass + file_sass,
    src_css         = dir_css  + file_css;

// --------------------------------
// Default setup
// 
gulp.task('default', ['server']);

// --------------------------------
// SASS - compile and minify
// 
gulp.task('sass', function() {

  return sass(src_sass, {style: 'compressed', sourcemap: true})
          .on('error', function (err) { console.error('Error!', err.message); })  
          .pipe(sourcemaps.write(dir_sass_maps))
          .pipe(gulp.dest(dir_css))
          .pipe(reload({stream: true}));
});

// --------------------------------
// Static Server + watching scss/html files
// 
gulp.task('server', ['sass'], function() {

    browserSync.init({
      server: {
        baseDir: './',
      }
    });

    gulp.watch(dir_sass + "**/*.scss", ['sass']);
    gulp.watch(dir_js   + "**/*.js").on('change', reload);
    gulp.watch("index.html").on('change', reload);
});
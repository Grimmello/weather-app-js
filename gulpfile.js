var browserSync = require('browser-sync').create()
var lib = require('bower-files')()
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')
var utilities = require('gulp-util')
var buildProduction = utilities.env.production
var del = require('del')
var eslint = require('gulp-eslint')
var concat = require('gulp-concat')
var lib = require('bower-files') ({
  "overrides": {
    "bootstrap": {
      "main": [
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
})

gulp.task('eslint', function() {
  return gulp.src(['js/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
})

gulp.task('concatInterface', function() {
  return gulp.src(['js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'))
})

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'))
})

gulp.task('minifyScripts', ['jsBrowserify'], function() {
  return gulp.src('./build/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build.js'))
})

gulp.task('jsBower', function() {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
})

gulp.task('cssBower', function() {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'))
})

gulp.task('bower', ['jsBower', 'cssBower', 'htmlBower'])

gulp.task('clean', function() {
  return del(['build', 'tmp'])
})

gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts')
  } else {
    gulp.start('jsBrowserify')
  }
  gulp.start('bower')
  gulp.start('cssBuild')
})

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })

  gulp.watch(['js/*.js'], ['jsBuild'])
  gulp.watch(['bower.json'], ['bowerBuild'])
  gulp.watch(['*.html'], ['htmlBuild'])
})

gulp.task('jsBuild', ['jsBrowserify', 'eslint'], function() {
  browserSync.reload()
})

gulp.task('bowerBuild', ['bower'], function() {
  browserSync.reload()
})

gulp.task('htmlBuild', function() {
  browserSync.reload()
})

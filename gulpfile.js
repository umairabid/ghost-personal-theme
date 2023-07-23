const {series, watch, src, dest, parallel} = require('gulp');

const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');

function serve(done) {
    livereload.listen();
    done();
}

function css() {
  return src(['./assets/scss/reset.scss', './assets/scss/**/*.scss', './assets/scss/mobile.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('styles.css'))
    .pipe(dest('./assets/build/css/'));
};

function js() {
  return src('./assets/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(dest('./assets/build/js/'));
};

const cssWatcher = () => watch('assets/scss/**', css);
const jsWatcher = () => watch('assets/js/**', js);
const watcher = parallel(cssWatcher, jsWatcher);

const build = series(css, js);

exports.build = build;
exports.default = series(build, serve, watcher);

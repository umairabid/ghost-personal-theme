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
  return src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('styles.css'))
    .pipe(dest('./assets/build/css/'));
};

const cssWatcher = () => watch('assets/scss/**', css);
const watcher = parallel(cssWatcher);

const build = series(css);

exports.build = build;
exports.default = series(build, serve, watcher);

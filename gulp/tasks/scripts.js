const uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    scriptsPATH = {
      "input": "./dev/static/js/",
      "output": "./build/static/js/"
    };

module.exports = function () {
    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src([
            'node_modules/just-validate/dist/just-validate.production.min.js',
            'node_modules/imask/dist/imask.min.js',
            'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
            'node_modules/@splidejs/splide/dist/js/splide.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src([
            'node_modules/just-validate/dist/just-validate.production.min.js',
            'node_modules/imask/dist/imask.min.js',
            'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
            'node_modules/@splidejs/splide/dist/js/splide.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src([scriptsPATH.input + '**/*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe($.gulp.dest(scriptsPATH.output, { base: scriptsPATH.input }))
        .pipe($.browserSync.reload({
            stream: true
        }));
    });

    $.gulp.task('js:build', () => {
        return $.gulp.src([scriptsPATH.input + '**/*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ['@babel/preset-env']
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe($.gulp.dest(scriptsPATH.output))
    });
};
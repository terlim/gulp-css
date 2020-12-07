const config = require('./_config')
const gulp = require('gulp')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const pugLinter = require('gulp-pug-linter')
const htmlValidator = require('gulp-w3c-html-validator')
const notify = require('gulp-notify')


module.exports = function pug2html() {
    return gulp.src(config.src.pug)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "pug->HTML",
                    message: err.message,
                }
            })
        }))
        .pipe(pugLinter({
            reporter: 'default'
        }))
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(htmlValidator())
        .pipe(gulp.dest(config.build.html))
}

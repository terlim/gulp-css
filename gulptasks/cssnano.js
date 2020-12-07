const config = require("./_config")
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const cssNano = require('gulp-cssnano')
const rename = require('gulp-rename')

module.exports = function cssnano() {
    return gulp.src(config.build.css + '*.css')
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "CSS->NANO",
                        message: err.message,
                    };
                }),
            })
        )
        .pipe(cssNano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            basename: "style",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest(config.build.css))
}
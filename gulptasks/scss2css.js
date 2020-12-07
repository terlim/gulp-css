const config = require("./_config")
const gulp = require('gulp')
const notify = require('gulp-notify')
const scss = require('gulp-sass')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const shorthand = require('gulp-shorthand')
const gulpStylelint = require('gulp-stylelint')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const cssbeautify = require('gulp-cssbeautify');

module.exports = function scss2css() {
    return gulp.src(config.src.scss)
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "SCSS->CSS",
                        message: err.message,
                    };
                }),
            })
        )
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .pipe(scss())
        .pipe(gcmq())
        .pipe(autoprefixer(["last 15 versions"]))
        .pipe(shorthand())

        .pipe(
            cleanCSS({
                debug: true,
                level: {
                    2: {},
                },
                compatibility: "ie8",
                removeDuplicateRules: true},
                details => {console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)}
            )
        )

        .pipe(cssbeautify())
        .pipe(rename({ basename: "style",extname: ".css"}))
        .pipe(gulp.dest(config.build.css))

}
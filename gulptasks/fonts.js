const config = require("./_config")
const gulp = require('gulp')

module.exports = function fonts() {
    return gulp.src(config.src.fonts)
        .pipe(gulp.dest(config.build.fonts))
}

const config = require("./_config")
const gulp = require('gulp')
const iconfontCss = require('gulp-iconfont-css')
const iconFont = require('gulp-iconfont')



module.exports = function iconfont() {
    return gulp.src(config.src.icon, { allowEmpty: true })
        .pipe(
            iconfontCss({
                path: config.src.icon_template_path,
                fontName: 'myiconfont',

                targetPath: config.src.icon_font_path,
                fontPath: "../fonts/icons/",
            })
        )
        .pipe(
            iconFont({
                fontName: 'myiconfont',
                prependUnicode: true,
                formats: ["svg", "ttf", "eot", "woff", "woff2"],
                normalize: true,
                fontHeight: 1001,
            })
        )
        .pipe(gulp.dest(config.src.fonts_icons));
}
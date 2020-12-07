let fileswatch = 'html,css,htm,txt,json,md,woff2,ttf,svg' // List of files extensions for watching & hard reload

const { src, dest, parallel, series, watch } = require('gulp')
const config = require('./gulptasks/_config')
const clean  = require('./gulptasks/clean')
const pug2html  = require('./gulptasks/pug2html')
const iconFonts = require('./gulptasks/iconfont')
const fonts = require('./gulptasks/fonts')
const scsscss = require('./gulptasks/scss2css')
const cssnano = require('./gulptasks/cssnano')
const imagemin = require('./gulptasks/imageMinify')
const jsscripts = require('./gulptasks/scripts')

const browserSync = require('browser-sync').create()

function browsersync() {
    browserSync.init({
        server: { baseDir: 'build/' },
        notify: false,
        online: true
    })

}

function setMode(isProduction = true) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development'
        cb()
    }
}
function startwatch() {
    watch(config.watch.html, { usePolling: true }, pug2html)
    watch(config.watch.scss, { usePolling: true }, scsscss)
    watch(config.watch.js, { usePolling: true }, jsscripts)
    watch(config.watch.icon, { usePolling: true }, iconFonts)
    watch(config.watch.fonts, { usePolling: true }, fonts)
    watch(config.watch.img, { usePolling: true }, imagemin)
    watch(`build/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}


exports.default = series(setMode(), clean, iconFonts, fonts, imagemin, scsscss, jsscripts, pug2html, parallel(browsersync, startwatch))
exports.build = series(setMode(), clean, iconFonts, fonts, imagemin, scsscss, cssnano, jsscripts, pug2html, parallel(browsersync, startwatch))
exports.clean = series(clean)
exports.iconFonts = series(iconFonts)
exports.fonts = series(fonts)
exports.scsscss = series(scsscss)
exports.cssnano = series(cssnano)
exports.imagemin = series(imagemin)
exports.jsscripts = series(jsscripts)
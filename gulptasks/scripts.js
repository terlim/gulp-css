const config = require('./_config')
const gulp = require('gulp')
const webpack = require('webpack-stream')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const rename = require('gulp-rename')

module.exports = function scripts() {
    return gulp.src(config.src.js)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return{
                    title: 'JS',
                    message: err.message
                }
            })
        })) // отслеживание ошибок
        .pipe(webpack({
            mode: 'production',
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/env']
                        }
                    }
                ]
            }
        }))
        .pipe(rename('style.min.js'))
        .pipe(gulp.dest(config.build.js))
}
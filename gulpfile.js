"use strict";
const gulp              = require('gulp');
const del               = require('del'); // плагин для удаления файлов и каталогов
const browserSync       = require('browser-sync');
const plumber           = require('gulp-plumber'); // модуль для отслеживания ошибок
const notify            = require('gulp-notify'); // модуль уведомления об ошибках
const newer             = require('gulp-newer'); // модуль
const debug             = require('gulp-debug'); // модуль
const rigger            = require('gulp-rigger'); // модуль для импорта содержимого одного файла в другой
const cssnano           = require('gulp-cssnano');
const rename            = require('gulp-rename');
const uglify            = require('gulp-uglify'); // модуль для минимизации JavaScript
const gcmq              = require('gulp-group-css-media-queries');
const autoprefixer      = require('gulp-autoprefixer'); // модуль автопрефиксов
const scss              = require('gulp-sass'); // модуль для компиляции SASS (SCSS) в CSS
const cached            = require('gulp-cached');
const dependents        = require('gulp-dependents');
const cssbeautify       = require('gulp-cssbeautify');
const postcss           = require('gulp-postcss');
const iconfont          = require('gulp-iconfont');
const iconfontCss       = require('gulp-iconfont-css');
const fontName          = 'myiconfont';


// Vars
var path = {
    build: {
        html:  'build/',
        js:    'build/assets/template-site/js/',
        css:   'build/assets/template-site/css/',
        img:   'build/assets/template-site/i/',
        fonts: 'build/assets/template-site/fonts/'
    },
    src: {
        html:               'src/*.html',
        js:                 'src/js/main.js',
        css:                'src/css/style.css',
        img:                'src/img/**/*.*',
        fonts:              'src/fonts/**/*.*',
        icon:               'src/icons/**/*.svg',
        icon_font_path:     '../../../src/common.blocks/icons/_icons.scss',
        icon_template_path: 'src/fonts/icons/_icons_template.scss'

    },
    watch: {
        html:  'src/**/*.html',
        scss:  'src/**/*.scss',
        css:  'src/**/*.css',
        img:   'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    }
};


var processorArray = [

    require('postcss-focus')(),
    require('css-mqpacker')(),
    require('postcss-combine-duplicated-selectors')()

];


/*Задачи*/
// Clean
gulp.task('clean', function () {
    return del('build');
});

// Сервер
gulp.task('server', function () {
    browserSync.init({
        server: path.build.html
    });
    browserSync.watch(path.build.html+'**/*.*').on('change', browserSync.reload);
});

// перенос картинок
gulp.task('img:build', function() {
    return gulp.src(path.src.img)
        .pipe(debug({title:'images'}))
        .pipe(gulp.dest(path.build.img));
});


// перенос шрифтов
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(debug({title:'fonts'}))
        .pipe(gulp.dest(path.build.fonts));
});

// сбор html
gulp.task('html:build', function () {
    return gulp.src(path.src.html) // выбор всех html файлов по указанному пути

        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return{
                    title: 'HTML',
                    message: err.message
                }
            })
        })) // отслеживание ошибок
        .pipe(rigger()) //Прогоним через rigger
        .pipe(debug({title:'html'}))
        .pipe(gulp.dest(path.build.html));// выкладывание готовых файлов

});

// сбор main.js
gulp.task('js:build', function () {
    return gulp.src(path.src.js) // получим файл main.main.js
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return{
                    title: 'JS',
                    message: err.message
                }
            })
        })) // отслеживание ошибок
        .pipe(rigger()) // импортируем все указанные файлы в main.main.js
        .pipe(uglify()) // минимизируем main.js
        .pipe(debug({title:'js'}))
        .pipe(gulp.dest(path.build.js)) // положим готовый файл

});



// SCSS-> CSS

gulp.task('scss:build', function() {
    return gulp
        .src(path.watch.scss)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return{
                    title: 'SCSS->CSS',
                    message: err.message
                }
            })
        })) // отслеживание ошибок
        .pipe(cached('scss'))
        .pipe(dependents())
        .pipe(scss())
        .pipe(debug({title:'scss->css'}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(debug({title:'auto-prefixer'}))
        .pipe(cssbeautify())
        .pipe(gulp.dest(function(file){
            return file.base;
        }))
});

// сборка CSS
gulp.task('css:build', function () {
    return gulp.src(path.src.css)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return{
                    title: 'CSS',
                    message: err.message
                }
            })
        })) // отслеживание ошибок
        .pipe(postcss(processorArray))
        .pipe(gulp.dest(path.build.css)) // выгружаем в build
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(gulp.dest(path.build.css));

});

// icon fonts
gulp.task('iconfont', function(){
    return gulp.src(path.src.icon)
        .pipe(iconfontCss({
            path: path.src.icon_template_path,
            fontName: fontName,

            targetPath: path.src.icon_font_path,
            fontPath: '../fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001

        }))
        .pipe(gulp.dest('src/fonts/icons'));
});



// Watch
gulp.task('watch', function(){
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.scss, gulp.series('scss:build'));
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    gulp.watch(path.watch.img, gulp.series('img:build'));
   // gulp.watch(path.src.js, gulp.series('js:build'));

});

// Сброка полная
gulp.task('build:all', gulp.parallel('html:build','css:build','fonts:build','img:build'));
//gulp.task('build:all', gulp.parallel('html:build','css:build','js:build','fonts:build','img:build'));


//  default
gulp.task('default', gulp.series('clean','build:all', gulp.parallel('server','watch')));



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
        icon_font_path:     'src/scss/_icons.scss',
        icon_template_path: 'src/common_library/_icons_template.scss'

    },
    watch: {
        html:  'src/**/*.html',
        scss:  'src/**/*.scss',
        img:   'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    }
};

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
        .pipe(newer(path.build.html))

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

gulp.task('css:build', function() {
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






// Watch
gulp.task('watch', function(){
    gulp.watch(path.src.style, gulp.series('css:build'));
    gulp.watch(path.src.css, gulp.series('css:build'));
    gulp.watch('src/**/*.html', gulp.series('html:build'));
    gulp.watch(path.src.fonts, gulp.series('fonts:build'));
    gulp.watch(path.src.img, gulp.series('img:build'));
    gulp.watch(path.src.js, gulp.series('js:build'));

});

// Сброка полная
gulp.task('build:all', gulp.parallel('html:build','css:build','js:build','fonts:build','img:build'));


//  default
gulp.task('default', gulp.series('clean','build:all', gulp.parallel('server','watch')));



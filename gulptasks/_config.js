const path = require('path')
const root = path.join(__dirname, '../')
const src = path.join(root, 'src')

module.exports = {
    root,
    build: {
        html: path.join(root, 'build'),
        css: path.join(root, 'build/assets/template-site/css/'),
        js: path.join(root, 'build/assets/template-site/js/'),
        fonts: path.join(root, 'build/assets/template-site/fonts/'),
        img: path.join(root, 'build/assets/template-site/img/'),
    },
    src: {
        pug: path.join(root, 'src/pages/*.pug'),
        icon_template_path: path.join(root,'src/icons/_icons_template.scss'),
        icon_font_path: path.join(root, 'src/icons/_icons.scss'),
        fonts_icons: path.join(root, 'src/fonts/icons/'),
        icon: path.join(root, 'src/icons/**/*.svg'),
        fonts: path.join(root, 'src/fonts/**/*.*'),
        scss: path.join(root, 'src/scss/style.scss'),
        img: path.join(root, 'src/img/*.{gif,png,jpg,svg,webp}'),
        js: path.join(root, 'src/js/*.js')
    },
    watch: {
        html: path.join(root, 'src/**/*.pug'),
        scss: path.join(root, 'src/**/*.scss'),
        js: path.join(root, 'src/js/*.js'),
        icon: path.join(root, 'src/icons/**/*.svg'),
        fonts: path.join(root, 'src/fonts/**/*.*'),
        img: path.join(root, 'src/img/*.{gif,png,jpg,svg,webp}'),
    }
}

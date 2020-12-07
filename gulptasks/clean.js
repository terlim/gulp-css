const config = require('./_config')
const del = require('del')

module.exports = function clean(cb) {
    return del(config.build.html, {force:true}).then(() => {
        cb()
    })
}

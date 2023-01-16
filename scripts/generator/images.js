const fs = require('hexo-fs')

const avatarDir = 'source/_data/avatar/'
const coverDir = 'source/_data/cover/'
const covers = []

const walkFile = (dir, result, prefix) => {
    covers.splice(0, covers.length)

    if (!fs.existsSync(dir))
        return

    let files = fs.listDirSync(dir)

    files.forEach(file => {
        result.push({
            path: prefix + file,
            data: function () {
                return fs.createReadStream(dir + file)
            }
        })
        if (dir === coverDir) {
            covers.push(prefix + file)
        }
    })
}

hexo.extend.generator.register('images', function (locals) {
    let result = []
    walkFile(avatarDir, result, 'avatar/')
    walkFile(coverDir, result, 'cover/')
    hexo.locals.set('covers', () => covers)
    return result
})

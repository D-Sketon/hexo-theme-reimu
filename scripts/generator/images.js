const fs = require('hexo-fs')
const yaml = require('js-yaml')

const avatarDir = 'source/_data/avatar/'
const coverDir = 'source/_data/covers/'
const coverYaml = 'source/_data/covers.yml'
const covers = []

const walkFile = (dir, result, prefix) => {
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
      covers.push("/" + prefix + file)
    }
  })
}

const loadYaml = () => {
  if (fs.existsSync(coverYaml)) {
    let content = fs.readFileSync(coverYaml)
    if (!content)
      return
    let load = yaml.load(content)
    if (!load)
      return
    load.forEach(url => {
      covers.push(url)
    })
  }
}

hexo.extend.generator.register('images', function (locals) {
  let result = []
  covers.splice(0, covers.length)
  walkFile(avatarDir, result, 'avatar/')
  walkFile(coverDir, result, 'covers/')
  loadYaml()
  hexo.locals.set('covers', () => covers)
  return result
})

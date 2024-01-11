const fs = require('hexo-fs')
let timeVersion = Date.now()

hexo.extend.generator.register('ServiceWoker', (locals) => {
  let filePath = 'themes/reimu/source/js/sw.js'
  let content = fs.readFileSync(filePath)
  content = 'const VERSION = "' + timeVersion + '";\n' + content
  return {
    path: "sw.js",
    data: content,
  }
})

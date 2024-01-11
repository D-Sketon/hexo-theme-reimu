/**
 * - name: D-Sketon
 *   url: https://d-sketon.top/
 *   desc: 东方音mader
 *   image: https://d-sketon.top/img/icon/icon.png
 */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const template = ({ name, url, desc, image }) => {
  return `<div class="friend-item-wrap">
    <a href="${url}"></a>
    <div class="friend-icon-wrap">
      <div class="friend-icon">
          <img data-src="${image}" data-sizes="auto" alt="${name}" class="lazyload">
      </div>
    </div>
    <div class="friend-info-wrap">
      <div class="friend-name">
          ${name} 
      </div>
      <div class="friend-desc">
        ${desc}
      </div>
    </div>
  </div>`
}
const loadFile = arg => {
  if (arg) {
    let filepath = path.join(hexo.source_dir, arg)
    if (fs.existsSync(filepath)) {
      let content = fs.readFileSync(filepath)
      if (!content)
        return
      let load = yaml.load(content)
      if (!load)
        return
      return insertHtml(load)
    }
  }
}

const insertHtml = load => {
  let content = `<div class="friend-wrap wow fadeInUp">`
  load.forEach(item => {
    if (!item.name || !item.url)
      return
    content += template(item)
  })
  content += `</div>`
  return content
}

hexo.extend.tag.register("friendsLink", (args) => {
  return loadFile(args[0])
})

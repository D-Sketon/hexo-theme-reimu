const { htmlTag } = require('hexo-util')
hexo.extend.helper.register('preloadStyle', (content) => {

  if (!Array.isArray(content)) {
    content = [content]
  }

  let link = ''

  content.forEach(item => {
    link += htmlTag('link', {
      rel: 'preload',
      href: item,
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'"
    }
    )
  })
  return link;
})

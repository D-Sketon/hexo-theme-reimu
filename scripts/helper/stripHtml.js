const util = require('hexo-util')
const stripHTML = util.stripHTML

hexo.extend.helper.register('stripHtml', content => stripHTML(content))

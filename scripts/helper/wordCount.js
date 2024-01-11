// 改自 https://github.com/willin/hexo-wordcount
const util = require('hexo-util')
const stripHTML = util.stripHTML

const counter = (content) => {
  content = stripHTML(content)
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length
  return [cn, en]
}

const countFn = (content) => {
  let len = counter(content)
  return len[0] + len[1]
}
const changeHourMinuteStr = (str) => {
  if (str !== "0" && str !== "" && str !== null) {
    return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
      (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString())
  } else {
    return "";
  }
}
const timeFn = (content, { cn = 300, en = 160 } = {}) => {
  let len = counter(content)
  let readingTime = len[0] / cn + len[1] / en
  return readingTime < 1 ? 1 : parseInt(readingTime, 10)
}

hexo.extend.helper.register('min2read', (content, { cn = 300, en = 160 } = {}) => {
  return timeFn(content, { cn, en })
})

hexo.extend.helper.register('wordcount', content => {
  let count = countFn(content)
  return count < 1000 ? count : Math.round(count / 100) / 10 + 'k'
})

hexo.extend.helper.register('totalcount', site => {
  let count = 0
  site.posts.forEach(post => count += countFn(post.content))
  return count < 1000 ? count : Math.round(count / 100) / 10 + 'k'
})

hexo.extend.helper.register('totalmin2read', site => {
  let readingTime = 0
  site.posts.forEach(post => readingTime += timeFn(post.content))
  return changeHourMinuteStr(readingTime.toString())
})

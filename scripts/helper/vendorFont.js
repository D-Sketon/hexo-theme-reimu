const { htmlTag } = require('hexo-util')
hexo.extend.helper.register('vendorFont', () => {
  const fontDisplay = '&display=swap'
  const fontSubset = '&subset=latin,latin-ext'
  const fontStyles = ':400,400italic,700,700italic'
  const fontHost = 'https://fonts.googleapis.com'

  let fontFamilies = ['Mulish', 'Noto Serif SC', 'Ubuntu Mono'].map(item => {
    return item + fontStyles
  })

  fontFamilies = fontFamilies.filter(item => item !== '')
  fontFamilies = [...new Set(fontFamilies)]
  fontFamilies = fontFamilies.join('|')

  // Merge extra parameters to the final processed font string
  return fontFamilies
    ? htmlTag('link', {
      rel: 'preload',
      href: `${fontHost}/css?family=${fontFamilies.concat(fontDisplay, fontSubset)}`,
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'"
    })
    : ''
})

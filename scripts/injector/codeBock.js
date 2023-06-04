const js = hexo.extend.helper.get('js').bind(hexo);

if (!hexo.config._theme_config || hexo.config._theme_config.code_beautify.enable) {
  if (hexo.config.highlight.enable) {
    hexo.extend.injector.register('body_end', () => {
      return js('/js/insertHighlight.js');
    }, 'default');
  }
}


hexo.extend.helper.register('themeConfig', () => {
  const icon_font = hexo.theme.config.icon_font;
  if (!icon_font) {
    return '';
  }
  return `
  <script>
    window.icon_font = '${icon_font}';
  </script>
  `
})

hexo.extend.filter.register('stylus:renderer', (style) => {
  const basicFamilies = (hexo.theme.config.font?.article ?? []).map(i => `'${i}'`).join(',');
  const codeFamilies = (hexo.theme.config.font?.code ?? []).map(i => `'${i}'`).join(',');
  style
    .define('basic-families', basicFamilies.length ? basicFamilies + ',' : '')
    .define('code-families', codeFamilies.length ? codeFamilies + ',' : '')
})
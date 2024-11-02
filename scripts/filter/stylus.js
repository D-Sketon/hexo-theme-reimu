hexo.extend.filter.register("stylus:renderer", (style) => {
  const basicFamilies = (hexo.theme.config.font?.article ?? [])
    .map((i) => `'${i}'`)
    .join(",");
  const codeFamilies = (hexo.theme.config.font?.code ?? [])
    .map((i) => `'${i}'`)
    .join(",");
  let postHasSponsor = false;
  let postHasCopyright = false;
  hexo.locals.get("posts").forEach((post) => {
    if (post.sponsor) {
      postHasSponsor = true;
    }
    if (post.copyright) {
      postHasCopyright = true;
    }
  });
  if (!postHasSponsor || !postHasCopyright) {
    hexo.locals.get("pages").forEach((page) => {
      if (page.sponsor) {
        postHasSponsor = true;
      }
      if (page.copyright) {
        postHasCopyright = true;
      }
    });
  }
  postHasSponsor = postHasSponsor || hexo.theme.config.sponsor.enable;
  postHasCopyright =
    postHasCopyright || hexo.theme.config.article_copyright.enable;

  const widgetConfig = hexo.theme.config.widgets;
  const siteHasWidget = Array.isArray(widgetConfig) && widgetConfig.length > 0;

  style
    .define("basic-families", basicFamilies.length ? basicFamilies + "," : "")
    .define("code-families", codeFamilies.length ? codeFamilies + "," : "")
    .define("post-has-sponsor", postHasSponsor)
    .define("post-has-copyright", postHasCopyright)
    .define("site-has-widget", siteHasWidget);
});

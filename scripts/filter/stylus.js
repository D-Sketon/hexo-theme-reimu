hexo.extend.filter.register("stylus:renderer", (style) => {
  // google font families
  const articleFamilies = (hexo.theme.config.font?.article ?? [])
    .map((i) => `'${i}'`)
    .join(",");
  const codeFamilies = (hexo.theme.config.font?.code ?? [])
    .map((i) => `'${i}'`)
    .join(",");
  // local font families
  const localArticleFamilies = (hexo.theme.config.local_font?.article ?? [])
    .map((i) => `'${i}'`)
    .join(",");
  const localCodeFamilies = (hexo.theme.config.local_font?.code ?? [])
    .map((i) => `'${i}'`)
    .join(",");

  // sponsor and article_copyright
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

  // widgets
  const widgetConfig = hexo.theme.config.widgets;
  const siteHasWidget = Array.isArray(widgetConfig) && widgetConfig.length > 0;

  // social keys
  const socialKeys = Object.keys(hexo.theme.config.social || {});

  // custom icons
  const footerIcon =
    hexo.theme.config.footer.icon.url || "../images/taichi.png";
  const sponsorIcon =
    hexo.theme.config.sponsor.icon.url || "../images/taichi.png";
  const topIcon = hexo.theme.config.top.icon.url || "../images/taichi.png";

  style
    .define(
      "article-families",
      articleFamilies.length ? articleFamilies + "," : ""
    )
    .define("code-families", codeFamilies.length ? codeFamilies + "," : "")
    .define(
      "local-article-families",
      localArticleFamilies.length
        ? localArticleFamilies
        : "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    )
    .define(
      "local-code-families",
      localCodeFamilies.length
        ? localCodeFamilies
        : "Menlo, Monaco, Consolas, monospace"
    )
    .define("post-has-sponsor", postHasSponsor)
    .define("post-has-copyright", postHasCopyright)
    .define("site-has-widget", siteHasWidget)
    .define("social-keys", socialKeys)
    .define("footer-icon", footerIcon)
    .define("sponsor-icon", sponsorIcon)
    .define("top-icon", topIcon);
});

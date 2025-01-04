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
  
  // sidebar
  let postHasSidebar = false;
  hexo.locals.get("posts").forEach((post) => {
    if (post.sidebar) {
      postHasSidebar = true;
    }
  });

  // widgets
  const widgetConfig = hexo.theme.config.widgets;
  const siteHasWidget = Array.isArray(widgetConfig) && widgetConfig.length > 0;

  // social keys
  const socialKeys = Object.keys(hexo.theme.config.social || {});
  const shareKeys = hexo.theme.config.share || [];

  // custom icons
  const footerIcon =
    hexo.theme.config.footer.icon.url || "../images/taichi.png";
  const sponsorIcon =
    hexo.theme.config.sponsor.icon.url || "../images/taichi.png";
  const topIcon = hexo.theme.config.top.icon.url || "../images/taichi.png";

  // reimu_cursor
  // just for compatible
  const cursor = hexo.theme.config.reimu_cursor;
  let cursorEnabled = true;
  let cursorDefault = "../images/cursor/reimu-cursor-default.png";
  let cursorPointer = "../images/cursor/reimu-cursor-pointer.png";
  let cursorText = "../images/cursor/reimu-cursor-text.png";
  if (typeof cursor === "boolean") {
    // old config
    cursorEnabled = cursor;
  } else if (typeof cursor === "object") {
    // new config
    cursorEnabled = cursor.enable;
    cursorDefault = cursor.cursor.default || cursorDefault;
    cursorPointer = cursor.cursor.pointer || cursorPointer;
    cursorText = cursor.cursor.text || cursorText;
  }

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
    .define("post-has-sidebar", postHasSidebar)
    .define("site-has-widget", siteHasWidget)
    .define("site-has-share", shareKeys.length > 0)
    .define("social-keys", socialKeys)
    .define("share-keys", shareKeys)
    .define("footer-icon", footerIcon)
    .define("sponsor-icon", sponsorIcon)
    .define("top-icon", topIcon)
    .define("cursor-enabled", cursorEnabled)
    .define("cursor-default", cursorDefault)
    .define("cursor-pointer", cursorPointer)
    .define("cursor-text", cursorText);
});

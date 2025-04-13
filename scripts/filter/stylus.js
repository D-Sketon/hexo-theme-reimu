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
  // Internal theme token
  const internalTheme = hexo.theme.config.internal_theme || {};
  const { light = {}, dark = {} } = internalTheme;

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
    .define("cursor-text", cursorText)

    .define("light-red-0", light["--red-0"] || "#ff0000")
    .define("light-red-1", light["--red-1"] || "#ff5252")
    .define("light-red-2", light["--red-2"] || "#ff7c7c")
    .define("light-red-3", light["--red-3"] || "#ffafaf")
    .define("light-red-4", light["--red-4"] || "#ffd0d0")
    .define("light-red-5", light["--red-5"] || "#ffecec")
    .define("light-red-5-5", light["--red-5-5"] || "#fff3f3")
    .define("light-red-6", light["--red-6"] || "#fff7f7")
    .define("light-color-red-6-shadow", light["--color-red-6-shadow"] || "rgba(255, 78, 78, 0.6)")
    .define("light-color-red-3-shadow", light["--color-red-3-shadow"] || "rgba(255, 78, 78, 0.3)")
    .define("light-highlight-nav", light["--highlight-nav"] || "#e6e6e6")
    .define("light-highlight-scrollbar", light["--highlight-scrollbar"] || "#d6d6d6")
    .define("light-highlight-background", light["--highlight-background"] || "#f7f7f7")
    .define("light-highlight-current-line", light["--highlight-current-line"] || "#dadada")
    .define("light-highlight-selection", light["--highlight-selection"] || "#e9e9e9")
    .define("light-highlight-foreground", light["--highlight-foreground"] || "#4d4d4d")
    .define("light-highlight-comment", light["--highlight-comment"] || "#7d7d7d")
    .define("light-highlight-red", light["--highlight-red"] || "#c8362b")
    .define("light-highlight-orange", light["--highlight-orange"] || "#b66014")
    .define("light-highlight-yellow", light["--highlight-yellow"] || "#cb911d")
    .define("light-highlight-green", light["--highlight-green"] || "#2ea52e")
    .define("light-highlight-aqua", light["--highlight-aqua"] || "#479d9d")
    .define("light-highlight-blue", light["--highlight-blue"] || "#1973b8")
    .define("light-highlight-purple", light["--highlight-purple"] || "#7135ac")
    .define("dark-red-4", dark["--red-4"] || "rgba(255, 208, 208, 0.5)")
    .define("dark-red-5", dark["--red-5"] || "rgba(255,228,228,0.15)")
    .define("dark-red-5-5", dark["--red-5-5"] || "rgba(255,236,236,0.05)")
    .define("dark-red-6", dark["--red-6"] || "rgba(255, 243, 243, 0.2)")
    .define("dark-highlight-nav", dark["--highlight-nav"] || "#2e353f")
    .define("dark-highlight-scrollbar", dark["--highlight-scrollbar"] || "#454d59")
    .define("dark-highlight-background", dark["--highlight-background"] || "#22272e")
    .define("dark-highlight-current-line", dark["--highlight-current-line"] || "#393939")
    .define("dark-highlight-selection", dark["--highlight-selection"] || "#515151")
    .define("dark-highlight-foreground", dark["--highlight-foreground"] || "#cccccc")
    .define("dark-highlight-comment", dark["--highlight-comment"] || "#999999")
    .define("dark-highlight-red", dark["--highlight-red"] || "#f47067")
    .define("dark-highlight-orange", dark["--highlight-orange"] || "#f69d50")
    .define("dark-highlight-yellow", dark["--highlight-yellow"] || "#ffcc66")
    .define("dark-highlight-green", dark["--highlight-green"] || "#99cc99")
    .define("dark-highlight-aqua", dark["--highlight-aqua"] || "#66cccc")
    .define("dark-highlight-blue", dark["--highlight-blue"] || "#54b6ff")
    .define("dark-highlight-purple", dark["--highlight-purple"] || "#dcbdfb");
});

const warnIf = (condition, message) => {
  if (condition) {
    hexo.log.warn(message);
  }
};

const isModuleInstalled = (moduleName) => {
  try {
    require.resolve(moduleName);
    return true;
  } catch {
    return false;
  }
};

hexo.on("generateBefore", () => {
  const themeConfig = hexo.theme.config;
  const config = hexo.config;
  if (!themeConfig.theme_config_check) return;

  warnIf(
    themeConfig.pjax?.enable && config.relative_link,
    "[REIMU] pjax is not compatible with relative_link. Please disable one of them.",
  );

  warnIf(
    !(config.highlight?.enable || config.syntax_highlighter === "highlight.js"),
    "[REIMU] highlight.js is not enabled. Please enable it in your _config.yml.",
  );

  warnIf(
    themeConfig.math?.katex?.enable && themeConfig.math?.mathjax?.enable,
    "[REIMU] katex and mathjax should not be enabled at the same time. Please disable one of them.",
  );

  warnIf(
    themeConfig.algolia_search?.enable && themeConfig.generator_search?.enable,
    "[REIMU] algolia_search and generator_search should not be enabled at the same time. Please disable one of them.",
  );

  if (
    themeConfig.math?.enable &&
    (themeConfig.math?.katex?.enable || themeConfig.math?.mathjax?.enable)
  ) {
    warnIf(
      isModuleInstalled("hexo-renderer-marked"),
      "[REIMU] hexo-renderer-marked is installed. Please uninstall it.",
    );
    warnIf(
      !isModuleInstalled("@reimujs/hexo-renderer-markdown-it-plus"),
      "[REIMU] @reimujs/hexo-renderer-markdown-it-plus is not installed. Please install it to enable math feature.",
    );
  }

  warnIf(
    themeConfig.live2d?.enable && themeConfig.live2d_widgets?.enable,
    "[REIMU] live2d and live2d-widget should not be enabled at the same time. Please disable one of them.",
  );

  warnIf(
    themeConfig.player?.aplayer?.enable && !themeConfig.pjax?.enable,
    "[REIMU] player is enabled but pjax is not enabled. It's recommended to enable pjax.",
  );

  warnIf(
    themeConfig.player?.meting?.enable && !themeConfig.player?.aplayer?.enable,
    "[REIMU] meting is enabled but aplayer is not enabled. Please enable aplayer first.",
  );

  // comment systems: keep in sync with layout/_partial/post/comment.ejs
  const commentSystems = [
    ["valine", ["appId", "appKey"]],
    ["waline", ["serverURL"]],
    ["twikoo", ["envId"]],
    ["gitalk", ["clientID", "clientSecret"]],
    ["giscus", []],
    ["utterances", ["repo"]],
    ["beaudar", ["repo", "branch"]],
    ["disqus", ["shortname"]],
  ];
  const incompleteComments = commentSystems
    .filter(([name]) => themeConfig[name]?.enable)
    .map(([name, fields]) => {
      const missing = fields.filter((field) => !themeConfig[name]?.[field]);
      return missing.length ? `${name} (missing: ${missing.join(", ")})` : null;
    })
    .filter(Boolean);
  warnIf(
    incompleteComments.length > 0,
    `[REIMU] These comment systems are enabled but incomplete, and will be skipped: ${incompleteComments.join("; ")}.`,
  );

  const activeComments = commentSystems
    .filter(
      ([name, fields]) =>
        themeConfig[name]?.enable &&
        fields.every((field) => themeConfig[name]?.[field]),
    )
    .map(([name]) => name);
  const defaultComment = themeConfig.comment?.default;
  warnIf(
    defaultComment &&
      !activeComments.includes(defaultComment) &&
      (activeComments.length > 1 || !!themeConfig[defaultComment]?.enable),
    `[REIMU] comment.default is "${defaultComment}" but that comment system is not active (disabled or incomplete). It will fall back to ${activeComments.length ? `"${activeComments[0]}"` : "no comment system"}.`,
  );

  warnIf(
    themeConfig.math?.enable &&
      !themeConfig.math?.katex?.enable &&
      !themeConfig.math?.mathjax?.enable,
    "[REIMU] math is enabled but neither katex nor mathjax is enabled. Nothing will be rendered.",
  );

  const languages = themeConfig.i18n?.languages;
  if (themeConfig.i18n?.enable && Array.isArray(languages)) {
    if (languages.length === 0) {
      hexo.log.warn(
        "[REIMU] i18n is enabled but no languages are set. Please set at least one language.",
      );
    } else {
      const defaultLang = languages[0];
      if (defaultLang !== config.language) {
        hexo.log.warn(
          `[REIMU] i18n is enabled but the first language (${defaultLang}) is not the same as the default site language(${config.language}).`,
        );
      }
      const posts = hexo.locals.get("posts");
      if (posts && posts.length > 0) {
        const defaultPosts = posts
          .toArray()
          .filter((post) => !post.lang || post.lang === defaultLang);
        if (defaultPosts.length === 0) {
          hexo.log.warn(
            `[REIMU] i18n is enabled but no post belongs to the default language (${defaultLang}). Check the "lang" field of your posts: posts in the default language should not set "lang".`,
          );
        }
      }
    }
  }

  if (!themeConfig.i18n?.enable) {
    const posts = hexo.locals.get("posts");
    if (posts && posts.length > 0) {
      const langPosts = posts.toArray().filter((post) => post.lang);
      if (langPosts.length > 0) {
        hexo.log.warn(
          `[REIMU] i18n is disabled but ${langPosts.length} post(s) set a "lang" field. They will be generated under "/<lang>/..." and excluded from the home page and archive. Remove "lang" or enable i18n.`,
        );
      }
    }
  }
});

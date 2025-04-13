hexo.on("generateBefore", () => {
  const themeConfig = hexo.theme.config;
  const config = hexo.config;
  if (!themeConfig.theme_config_check) return;

  if (themeConfig.pjax?.enable && config.relative_link) {
    hexo.log.warn(
      "[REIMU] pjax is not compatible with relative_link. Please disable one of them."
    );
  }

  if (
    !(config.highlight?.enable || config.syntax_highlighter === "highlight.js")
  ) {
    hexo.log.warn(
      "[REIMU] highlight.js is not enabled. Please enable it in your _config.yml."
    );
  }

  if (themeConfig.math?.katex?.enable && themeConfig.math?.mathjax?.enable) {
    hexo.log.warn(
      "[REIMU] katex and mathjax should not be enabled at the same time. Please disable one of them."
    );
  }

  if (
    themeConfig.algolia_search?.enable &&
    themeConfig.generator_search?.enable
  ) {
    hexo.log.warn(
      "[REIMU] algolia_search and generator_search should not be enabled at the same time. Please disable one of them."
    );
  }

  if (
    themeConfig.math?.enable &&
    (themeConfig.math?.katex?.enable || themeConfig.math?.mathjax?.enable)
  ) {
    try {
      require.resolve("hexo-renderer-marked");
      hexo.log.warn(
        "[REIMU] hexo-renderer-marked is installed. Please uninstall it."
      );
    } catch (err) {}
    try {
      require.resolve("@reimujs/hexo-renderer-markdown-it-plus");
    } catch (err) {
      hexo.log.warn(
        "[REIMU] @reimujs/hexo-renderer-markdown-it-plus is not installed. Please install it to enable math feature."
      );
    }
  }

  if (themeConfig.live2d?.enable && themeConfig.live2d_widgets?.enable) {
    hexo.log.warn(
      "[REIMU] live2d and live2d-widget should not be enabled at the same time. Please disable one of them."
    );
  }

  if (themeConfig.player?.aplayer?.enable && !themeConfig.pjax?.enable) {
    hexo.log.warn(
      "[REIMU] player is enabled but pjax is not enabled. It's recommended to enable pjax."
    );
  }

  if (
    themeConfig.player?.meting?.enable &&
    !themeConfig.player?.aplayer?.enable
  ) {
    hexo.log.warn(
      "[REIMU] meting is enabled but aplayer is not enabled. Please enable aplayer first."
    );
  }

  if (themeConfig.i18n?.enable && Array.isArray(themeConfig.i18n?.languages)) {
    if (themeConfig.i18n?.languages.length === 0) {
      hexo.log.warn(
        "[REIMU] i18n is enabled but no languages are set. Please set at least one language."
      );
    } else {
      const defaultLang = themeConfig.i18n?.languages[0];
      if (defaultLang !== config.language) {
        hexo.log.warn(
          `[REIMU] i18n is enabled but the first language (${defaultLang}) is not the same as the default site language(${config.language}).`
        );
      }
    }
  }
});

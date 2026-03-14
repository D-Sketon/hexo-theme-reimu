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
    }
  }
});

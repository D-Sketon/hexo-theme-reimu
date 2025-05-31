const { url_for } = require("hexo-util");

hexo.extend.helper.register("themeConfig", function () {
  const { config } = hexo.theme;
  const siteConfig = hexo.config;
  const _global = ["window.REIMU_CONFIG = {};"];

  const addConfig = (key, value) => {
    if (value) {
      _global.push(
        `window.REIMU_CONFIG.${key} = ${
          typeof value === "string" ? `'${value}'` : JSON.stringify(value)
        };`
      );
    }
  };

  const licenseType = this._p(
    "article_copyright.license_content",
    (config.article_copyright?.content?.license_type || "").toUpperCase()
  );

  addConfig("icon_font", config.icon_font);
  addConfig("clipboard_tips", config.clipboard);
  addConfig("clipboard_tips.copyright.content", licenseType);
  if (config.service_worker?.enable) {
    addConfig("swPath", url_for.call(hexo, "/sw.js"));
  }
  addConfig("outdate", config.outdate?.enable ? config.outdate : null);
  if (config.anchor_icon || config.anchor_icon === false) {
    _global.push(
      `window.REIMU_CONFIG.anchor_icon = ${
        typeof config.anchor_icon === "string" ? `'${config.anchor_icon}'` : JSON.stringify(config.anchor_icon)
      };`
    );
  }
  addConfig("code_block", config.code_block);
  addConfig("base", siteConfig.url);
  if (config.i18n?.enable) {
    addConfig("i18n_languages", (config.i18n.languages || []).slice(1));
  }

  return `<script>${_global.join("")}</script>`;
});

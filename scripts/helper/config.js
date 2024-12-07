const { url_for } = require("hexo-util");

hexo.extend.helper.register("themeConfig", () => {
  const { config } = hexo.theme;
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

  addConfig("icon_font", config.icon_font);
  addConfig("clipboard_tips", config.clipboard);
  if (config.service_worker?.enable) {
    addConfig("swPath", url_for.call(hexo, "/sw.js"));
  }
  addConfig("outdate", config.outdate?.enable ? config.outdate : null);
  addConfig("anchor_icon", config.anchor_icon);
  addConfig("code_block", config.code_block);

  return `<script>${_global.join("")}</script>`;
});

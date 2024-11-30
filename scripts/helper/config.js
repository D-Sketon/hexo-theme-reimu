const { url_for } = require("hexo-util");

hexo.extend.helper.register("themeConfig", () => {
  const { config } = hexo.theme;
  const icon_font = config.icon_font;
  const clipboard_tips = config.clipboard;
  const outdate = config.outdate;
  const anchor_icon = config.anchor_icon;
  const _global = [];
  _global.push(`window.REIMU_CONFIG = {};`);
  if (icon_font) {
    _global.push(`window.REIMU_CONFIG.icon_font = '${icon_font}';`);
  }
  if (clipboard_tips) {
    _global.push(`window.REIMU_CONFIG.clipboard_tips = ${JSON.stringify(clipboard_tips)};`);
  }
  if (config.service_worker.enable) {
    _global.push(`window.REIMU_CONFIG.swPath = '${url_for.call(hexo, "/sw.js")}';`);
  }
  if (outdate.enable) {
    _global.push(`window.REIMU_CONFIG.outdate = ${JSON.stringify(outdate)};`);
  }
  if (anchor_icon) {
    _global.push(`window.REIMU_CONFIG.anchor_icon = '${anchor_icon}';`);
  }
  return `
  <script>${_global.join("")}</script>
  `;
});

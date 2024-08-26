const { url_for } = require("hexo-util");

hexo.extend.helper.register("themeConfig", () => {
  const { config } = hexo.theme;
  const icon_font = config.icon_font;
  const clipboard_tips = config.clipboard;
  const _global = [];
  if (icon_font) {
    _global.push(`window.icon_font = '${icon_font}';`);
  }
  if (clipboard_tips) {
    _global.push(`window.clipboard_tips = ${JSON.stringify(clipboard_tips)};`);
  }
  if (config.service_worker.enable) {
    _global.push(`window.swPath = '${url_for.call(hexo, "/sw.js")}';`);
  }
  return `
  <script>${_global.join("")}</script>
  `;
});

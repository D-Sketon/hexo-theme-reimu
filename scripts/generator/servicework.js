const fs = require("hexo-fs");
const { url_for } = require("hexo-util");
const path = require("path");
let timeVersion = Date.now();

hexo.extend.generator.register("ServiceWorker", (locals) => {
  let filePath = path.join(hexo.theme_dir, "source/js/sw.js");
  let content = fs.readFileSync(filePath);
  content = 'const VERSION = "' + timeVersion + '";\n' + content;
  content =
    `const preCache = [
  "${url_for.call(hexo, "/images/taichi.png")}",
  "${url_for.call(hexo, hexo.theme.config.banner)}",
  "${url_for.call(hexo, "/images/taichi-fill.png")}",
  "${url_for.call(hexo, "/css/loader.css")}",
  "${url_for.call(hexo, "/css/style.css")}",
  "${url_for.call(hexo, "/js/script.js")}",
];\n` + content;
  content = `const swPath = "${url_for.call(hexo, "/sw.js")}";\n` + content;
  return {
    path: "sw.js",
    data: content,
  };
});

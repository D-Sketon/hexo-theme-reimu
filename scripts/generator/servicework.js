const fs = require("hexo-fs");
const path = require("path");
const { url_for } = require("hexo-util");

const timeVersion = Date.now();

hexo.extend.generator.register("ServiceWorker", (locals) => {
  const filePath = path.join(hexo.theme_dir, "source/js/sw.js");
  let content = fs.readFileSync(filePath);

  const preCache = [
    url_for.call(hexo, "/images/taichi.png"),
    url_for.call(hexo, hexo.theme.config.banner),
    url_for.call(hexo, "/css/loader.css"),
    url_for.call(hexo, "/css/style.css"),
    url_for.call(hexo, "/js/script.js"),
  ];

  const preCacheScript = `const preCache = ${JSON.stringify(preCache)};`;
  const versionScript = `const VERSION = "${timeVersion}";`;

  content = `${versionScript}${preCacheScript}${content}`;

  return {
    path: "sw.js",
    data: content,
  };
});

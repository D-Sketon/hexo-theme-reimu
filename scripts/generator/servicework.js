const fs = require("hexo-fs");
const getPathname = require("../util/getPathname");
let timeVersion = Date.now();

hexo.extend.generator.register("ServiceWorker", (locals) => {
  let filePath = "themes/reimu/source/js/sw.js";
  let content = fs.readFileSync(filePath);
  content = 'const VERSION = "' + timeVersion + '";\n' + content;
  return {
    path: "sw.js",
    data: `const pathname = ${getPathname(hexo)};` + content,
  };
});

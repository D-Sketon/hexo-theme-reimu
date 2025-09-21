const { stripHTML } = require("hexo-util");

hexo.extend.helper.register("stripHtml", (content) => stripHTML(content));

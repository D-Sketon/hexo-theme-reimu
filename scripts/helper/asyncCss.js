const { htmlTag } = require("hexo-util");
const moize = require("moize");

let relative_link = true;
function asyncCssHelper(content) {
  relative_link = this.config.relative_link;
  if (!Array.isArray(content)) {
    content = [content];
  }

  return content
    .map((item) => {
      if (typeof item === "string") {
        let path = item;
        if (!path.endsWith(".css")) {
          path += ".css";
        }
        return `<link rel="preload" href="${item}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
      } else {
        if (!item.href.endsWith(".css")) item.href += ".css";
        return htmlTag("link", {
          rel: "preload",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'",
          ...item,
        });
      }
    })
    .join("\n");
}

const asyncCssMoize = moize(asyncCssHelper, {
  maxSize: 30,
  isDeepEqual: true,
  updateCacheForKey() {
    return relative_link;
  },
});

hexo.extend.helper.register("asyncCss", asyncCssMoize);

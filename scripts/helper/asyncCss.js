const { htmlTag, url_for } = require("hexo-util");
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
        return `<link rel="preload" href="${url_for.call(this, path)}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
      } else {
        if (!item.href.endsWith(".css")) item.href += ".css";
        item.href = url_for.call(this, item.href);
        return `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"` +
          Object.entries(item)
            .map(([key, value]) => {
              if (value === true) {
                return ` ${key}`;
              } else if (value === false) {
                return "";
              } else {
                return ` ${key}="${value}"`;
              }
            })
            .join("") +
          `>`;
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

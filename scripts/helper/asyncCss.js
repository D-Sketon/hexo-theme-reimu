const { htmlTag } = require("hexo-util");
hexo.extend.helper.register("asyncCss", (content) => {
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
});

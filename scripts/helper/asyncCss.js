hexo.extend.helper.register("asyncCss", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }

  return content
    .map((item) => {
      if (!item.endsWith(".css")) {
        item += ".css";
      }
      return `<link rel="preload" href="${item}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
    })
    .join("\n");
});

const util = require("hexo-util");
const url_for = util.url_for.bind(hexo);

hexo.extend.helper.register("vendorCdn", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }
  return content.map((src) => {
    let item;
    if (typeof src === "string") {
      // without integrity
      item = src;
    } else {
      // with integrity
      item = src.src;
    }

    if (item.includes("|")) {
      // :cdn|:path like
      const contentToken = item.split("|");
      if (contentToken.length !== 2) {
        throw new Error("invalid vendor");
      }
      const cdn = contentToken[0];
      if (!hexo.theme.config.vendor[cdn]) {
        throw new Error("invalid cdn");
      }
      return hexo.theme.config.vendor[cdn] + contentToken[1];
    } else {
      // https://cdn.example.com/:path or /:path like
      return url_for(item);
    }
  });
});

hexo.extend.helper.register("vendorCdnIntegrity", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }
  return content.map((src) => {
    if (typeof src === "string") {
      return null;
    }
    return src.integrity;
  });
});

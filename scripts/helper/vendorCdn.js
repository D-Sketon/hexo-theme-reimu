hexo.extend.helper.register("vendorCdn", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }
  return content.map((src) => {
    let item;
    if (typeof src === 'string') {
      // without integrity
      item = src;
    } else {
      // with integrity
      item = src.src;
    }
    const contentToken = item.split("|");
    if (contentToken.length !== 2) {
      throw new Error("invalid vendor");
    }
    const cdn = contentToken[0];
    if (!hexo.theme.config.vendor[cdn]) {
      throw new Error("invalid cdn");
    }
    return hexo.theme.config.vendor[cdn] + contentToken[1];
  });
});

hexo.extend.helper.register("vendorCdnIntegrity", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }
  return content.map((src) => {
    if (typeof src === 'string') {
      return null;
    }
    return src.integrity;
  });
});
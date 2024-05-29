hexo.extend.helper.register("vendorCdn", (content) => {
  if (!Array.isArray(content)) {
    content = [content];
  }
  return content.map((item) => {
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

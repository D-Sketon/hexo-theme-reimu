const getPathname = (hexo) => {
  if (hexo.config.url) {
    const pathname = new URL(hexo.config.url).pathname;
    if (pathname.endsWith("/")) {
      return pathname;
    }
    return pathname + "/";
  }
  return "/";
}

module.exports = getPathname;
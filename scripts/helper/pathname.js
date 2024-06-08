const getPathname = require("../util/getPathname");

hexo.extend.helper.register("pathname", () => {
  return getPathname(hexo);
});

const { Cache } = require("hexo-util");
const cachedSortedPosts = new Cache();

hexo.extend.helper.register("get_cached_sorted_posts", function (order) {
  return cachedSortedPosts.apply(order, () => {
    return hexo.locals
      .get("posts")
      .sort("date", order)
      .filter((item) => !item.lang);
  })
});

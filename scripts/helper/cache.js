const { Cache } = require("hexo-util");
const cachedSortedPosts = new Cache();
const cachedToc = new Cache();
const moize = require("moize");

hexo.extend.helper.register("get_cached_sorted_posts", function (order) {
  return cachedSortedPosts.apply(order, () => {
    return hexo.locals
      .get("posts")
      .sort("date", order)
      .filter((item) => !item.lang);
  });
});

const getCachedArchivesDates = moize(
  function (posts, type, timezone, lang, format) {
    const compareFunc =
      type === "monthly"
        ? (yearA, monthA, yearB, monthB) => yearA === yearB && monthA === monthB
        : (yearA, monthA, yearB, monthB) => yearA === yearB;
    const data = [];
    let length = 0;
    posts.forEach((post) => {
      // Clone the date object to avoid pollution
      let date = post.date.clone();
      if (timezone) date = date.tz(timezone);
      const year = date.year();
      const month = date.month() + 1;
      const lastData = data[length - 1];
      if (
        !lastData ||
        !compareFunc(lastData.year, lastData.month, year, month)
      ) {
        if (lang) date = date.locale(lang);
        const name = date.format(format);
        length = data.push({
          name,
          year,
          month,
          count: 1,
        });
      } else {
        lastData.count++;
      }
    });
    return data;
  },
  {
    maxSize: 4,
  }
);

hexo.extend.helper.register(
  "get_cached_archives_dates",
  function (posts, type, timezone, lang, format) {
    return getCachedArchivesDates(posts, type, timezone, lang, format);
  }
);

hexo.extend.helper.register("get_cached_toc", function (content, slug) {
  if (slug) {
    if (!cachedToc.has(slug)) {
      cachedToc.set(slug, this.toc(content));
      return cachedToc.get(slug);
    } else {
      const toc = cachedToc.get(slug);
      cachedToc.del(slug);
      return toc;
    }
  } else {
    return this.toc(content);
  }
});

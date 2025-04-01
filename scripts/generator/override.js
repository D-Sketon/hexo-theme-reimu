// override the default generator for index, archive, category and tag
// we need to filter out posts with lang attribute

const pagination = require("hexo-pagination");
const fmtNum = (num) => num.toString().padStart(2, "0");

hexo.extend.generator.register("category", function (locals) {
  const config = this.config;
  const perPage = config.category_generator.per_page;
  const paginationDir = config.pagination_dir || "page";
  const orderBy = config.category_generator.order_by || "-date";

  return locals.categories.reduce((result, category) => {
    if (!category.length) return result;

    const posts = category.posts.sort(orderBy).filter((post) => !post.lang);
    const data = pagination(category.path, posts, {
      perPage,
      layout: ["category", "archive", "index"],
      format: paginationDir + "/%d/",
      data: {
        category: category.name,
      },
    });

    return result.concat(data);
  }, []);
});

hexo.extend.generator.register("tag", function (locals) {
  const config = this.config;
  const perPage = config.tag_generator.per_page;
  const paginationDir = config.pagination_dir || "page";
  const orderBy = config.tag_generator.order_by || "-date";
  const tags = locals.tags;
  let tagDir;

  const pages = tags.reduce((result, tag) => {
    if (!tag.length) return result;

    const posts = tag.posts.sort(orderBy).filter((post) => !post.lang);
    const data = pagination(tag.path, posts, {
      perPage: perPage,
      layout: ["tag", "archive", "index"],
      format: paginationDir + "/%d/",
      data: {
        tag: tag.name,
      },
    });

    return result.concat(data);
  }, []);

  // generate tag index page, usually /tags/index.html
  if (config.tag_generator.enable_index_page) {
    tagDir = config.tag_dir;
    if (tagDir[tagDir.length - 1] !== "/") {
      tagDir += "/";
    }

    pages.push({
      path: tagDir,
      layout: ["tag-index", "tag", "archive", "index"],
      posts: locals.posts,
      data: {
        base: tagDir,
        total: 1,
        current: 1,
        current_url: tagDir,
        posts: locals.posts,
        prev: 0,
        prev_link: "",
        next: 0,
        next_link: "",
        tags: tags,
      },
    });
  }

  return pages;
});

hexo.extend.generator.register("index", function (locals) {
  const config = this.config;
  const posts = locals.posts
    .sort(config.index_generator.order_by)
    .filter((post) => !post.lang);

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir =
    config.index_generator.pagination_dir || config.pagination_dir || "page";
  const path = config.index_generator.path || "";

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ["index", "archive"],
    format: paginationDir + "/%d/",
    data: {
      __index: true,
    },
  });
});

hexo.extend.generator.register("archive", function (locals) {
  const { config } = this;

  let archiveDir = config.archive_dir;
  const paginationDir = config.pagination_dir || "page";
  const allPosts = locals.posts
    .sort(config.archive_generator.order_by || "-date")
    .filter((post) => !post.lang);
  const perPage = config.archive_generator.per_page;
  const result = [];

  if (!allPosts.length) return;

  if (archiveDir[archiveDir.length - 1] !== "/") archiveDir += "/";

  function generate(path, posts, options = {}) {
    options.archive = true;

    result.push(
      ...pagination(path, posts, {
        perPage,
        layout: ["archive", "index"],
        format: paginationDir + "/%d/",
        data: options,
      })
    );
  }

  generate(archiveDir, allPosts);

  if (!config.archive_generator.yearly) return result;

  const posts = {};

  // Organize posts by date
  allPosts.forEach((post) => {
    const date = post.date;
    const year = date.year();
    const month = date.month() + 1; // month is started from 0

    if (!Object.prototype.hasOwnProperty.call(posts, year)) {
      // 13 arrays. The first array is for posts in this year
      // and the other arrays is for posts in this month
      posts[year] = [[], [], [], [], [], [], [], [], [], [], [], [], []];
    }

    posts[year][0].push(post);
    posts[year][month].push(post);
    // Daily
    if (config.archive_generator.daily) {
      const day = date.date();
      if (!Object.prototype.hasOwnProperty.call(posts[year][month], "day")) {
        posts[year][month].day = {};
      }

      (posts[year][month].day[day] || (posts[year][month].day[day] = [])).push(
        post
      );
    }
  });

  const { Query } = this.model("Post");
  const years = Object.keys(posts);
  let year, data, month, monthData, url;

  // Yearly
  for (let i = 0, len = years.length; i < len; i++) {
    year = +years[i];
    data = posts[year];
    url = archiveDir + year + "/";
    if (!data[0].length) continue;

    generate(url, new Query(data[0]), { year });

    if (!config.archive_generator.monthly && !config.archive_generator.daily)
      continue;

    // Monthly
    for (month = 1; month <= 12; month++) {
      monthData = data[month];
      if (!monthData.length) continue;
      if (config.archive_generator.monthly) {
        generate(url + fmtNum(month) + "/", new Query(monthData), {
          year,
          month,
        });
      }

      if (!config.archive_generator.daily) continue;

      // Daily
      for (let day = 1; day <= 31; day++) {
        const dayData = monthData.day[day];
        if (!dayData || !dayData.length) continue;
        generate(
          url + fmtNum(month) + "/" + fmtNum(day) + "/",
          new Query(dayData),
          {
            year,
            month,
            day,
          }
        );
      }
    }
  }

  return result;
});

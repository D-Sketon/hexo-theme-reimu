hexo.extend.generator.register("json", function (locals) {
  const hexoConfig = hexo.config;
  const searchConfig = hexo.theme.config.generator_search;
  if (!searchConfig?.enable) return;
  let searchfield = searchConfig.field || "post";
  const content = searchConfig.content || true;

  let posts, pages;

  if (searchfield.trim() !== "") {
    searchfield = searchfield.trim();
    if (searchfield == "post") {
      posts = locals.posts.sort("-date");
    } else if (searchfield == "page") {
      pages = locals.pages;
    } else {
      posts = locals.posts.sort("-date");
      pages = locals.pages;
    }
  } else {
    posts = locals.posts.sort("-date");
  }

  const res = [];
  let index = 0;

  if (posts) {
    posts.each((post) => {
      if (post.indexing != undefined && !post.indexing) return;
      const temp_post = {};
      if (post.title) {
        temp_post.title = post.title;
      }
      if (post.path) {
        if (post.lang) {
          temp_post.url = `${hexoConfig.root}${post.lang}/${post.path}`;
        } else {
          temp_post.url = `${hexoConfig.root}${post.path}`;
        }
      }
      if (content != false && post._content) {
        temp_post.content = post._content;
      }
      if (post.tags && post.tags.length > 0) {
        const tags = [];
        post.tags.forEach((tag) => {
          tags.push(tag.name);
        });
        temp_post.tags = tags;
      }
      if (post.categories && post.categories.length > 0) {
        const categories = [];
        post.categories.forEach((cate) => {
          categories.push(cate.name);
        });
        temp_post.categories = categories;
      }
      res[index] = temp_post;
      index += 1;
    });
  }
  if (pages) {
    pages.each((page) => {
      if (page.indexing != undefined && !page.indexing) return;
      const temp_page = {};
      if (page.title) {
        temp_page.title = page.title;
      }
      if (page.path) {
        temp_page.url = hexoConfig.root + page.path;
      }
      if (content != false && page._content) {
        temp_page.content = page._content;
      }
      res[index] = temp_page;
      index += 1;
    });
  }

  return {
    path: 'search.json',
    data: JSON.stringify(res),
  };
});

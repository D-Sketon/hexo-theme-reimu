// modified from https://github.com/Jamling/hexo-generator-i18n

const langPathCache = [];
let localPostsCache = null;

hexo.extend.generator.register("post", function (locals) {
  if (!localPostsCache && hexo.theme.config.i18n?.enable) {
    localPostsCache = locals.posts.sort("-date").toArray();
  }
  const posts = (
    localPostsCache || locals.posts.sort("-date").toArray()
  ).filter((post) => !post.lang);
  const { length } = posts;
  return posts.map((post, i) => {
    let { path, layout } = post;
    if (!layout || layout === "false") {
      return {
        path,
        data: post.content,
      };
    }
    if (i) {
      post.prev = posts[i - 1];
    } else {
      post.prev = undefined;
    }
    if (i < length - 1) {
      post.next = posts[i + 1];
    } else {
      post.next = undefined;
    }
    const layouts = ["post", "page", "index"];
    if (layout !== "post") layouts.unshift(layout);
    post.__post = true;
    return {
      path,
      layout: layouts,
      data: post,
    };
  });
});

hexo.extend.generator.register("post-with-lang", function (locals) {
  if (!localPostsCache && hexo.theme.config.i18n?.enable) {
    localPostsCache = locals.posts.sort("-date").toArray();
  }
  const posts = (
    localPostsCache || locals.posts.sort("-date").toArray()
  ).filter((post) => post.lang);
  return posts.map((post) => {
    let { path, layout, lang } = post;
    if (lang) {
      langPathCache.push(path);
      path = `${lang}/${path}`;
    }
    if (!layout || layout === "false") {
      return {
        path,
        data: post.content,
      };
    }
    const mappedPost = locals.posts
      .toArray()
      .find((p) => p.permalink === post.permalink && !p.lang);
    if (mappedPost) {
      post.prev = mappedPost.prev;
      post.next = mappedPost.next;
    }
    const layouts = ["post", "page", "index"];
    if (layout !== "post") layouts.unshift(layout);
    post.__post = true;
    return {
      path,
      layout: layouts,
      data: post,
    };
  });
});

function getLanguages(hexo) {
  const i18n = hexo.theme.config.i18n;
  if (!i18n || !i18n.languages) {
    return [];
  }
  const languages = Array.isArray(i18n.languages)
    ? i18n.languages
    : [i18n.languages];

  return languages.filter((lang) => lang !== "default");
}

function checkConfig(hexo, type) {
  const i18nConfig = hexo.theme.config.i18n;
  if (!i18nConfig || !i18nConfig.enable) {
    return false;
  }
  if (type) {
    const types = Array.isArray(i18nConfig.type)
      ? i18nConfig.type
      : [i18nConfig.type];
    if (!types.includes(type)) {
      return false;
    }
  }
  return true;
}

hexo.extend.generator.register("page-i18n", function (locals) {
  if (!checkConfig(hexo, "page")) {
    return [];
  }

  const languages = getLanguages(hexo);
  const langPath = [];
  const i18n = [];
  locals.pages.forEach((page) => {
    const lang = page.path.split("/")[0];
    if (languages.includes(lang)) {
      langPath.push(page.path);
      page.lang = lang;
    } else {
      i18n.push(page);
    }
  });

  const result = [];
  i18n.forEach((page) => {
    const layouts = ["page", "post", "index"];
    const layout = page.layout;
    for (let i = 1; i < languages.length; i++) {
      const language = languages[i];
      const path = `${language}/${page.path}`;
      if (langPath.includes(path)) {
        continue;
      }
      if (!layout || layout === "false" || layout === "off") {
        result.push({
          path,
          data: page.content,
        });
      } else {
        if (layout !== "page") {
          layouts.unshift(layout);
        }
        const copy = Object.assign({}, page);
        copy.lang = language;
        copy.path = path;
        copy.__page = true;

        result.push({
          path: copy.path,
          layout: layouts,
          data: copy,
        });
      }
    }
  });

  return result;
});

hexo.extend.generator.register("post-i18n", function (locals) {
  if (!checkConfig(hexo, "post")) {
    return [];
  }
  const languages = getLanguages(hexo);
  const langPath = [];
  const i18n = [];
  if (!localPostsCache && hexo.theme.config.i18n?.enable) {
    localPostsCache = locals.posts.sort("-date").toArray();
  }
  const posts = localPostsCache || locals.posts.sort("-date").toArray();
  posts.forEach((page) => {
    if (page.lang || langPathCache.includes(page.path)) {
      return;
    }
    const lang = page.path.split("/")[0];
    if (languages.includes(lang)) {
      langPath.push(page.path);
      page.lang = lang;
    } else {
      i18n.push(page);
    }
  });

  const result = [];
  i18n.forEach((page) => {
    const layouts = ["page", "post", "index"];
    const layout = page.layout;
    for (let i = 1; i < languages.length; i++) {
      const language = languages[i];
      const path = `${language}/${page.path}`;
      if (langPath.includes(path)) {
        continue;
      }
      if (!layout || layout === "false" || layout === "off") {
        result.push({
          path,
          data: page.content,
        });
      } else {
        if (layout !== "post") {
          layouts.unshift(layout);
        }
        const copy = Object.assign({}, page);
        copy.lang = language;
        copy.path = path;
        copy.__post = true;

        result.push({
          path: copy.path,
          layout: layouts,
          data: copy,
        });
      }
    }
  });

  return result;
});

hexo.extend.generator.register("archive-i18n", function (locals) {
  if (!checkConfig(hexo)) {
    return [];
  }
  const languages = getLanguages(hexo);
  const result = [];
  const generators = hexo.extend.generator.list();
  const siteLocals = hexo.locals.toObject();

  const i18nConfig = hexo.theme.config.i18n;
  let generatorConfig = !i18nConfig.generator
    ? []
    : Array.isArray(i18nConfig.generator)
    ? i18nConfig.generator
    : [i18nConfig.generator];

  generatorConfig = generatorConfig.filter((item) => {
    const g = generators[item];
    if (!g && !item.endsWith("-i18n")) {
      return false;
    }
    return true;
  });

  generatorConfig.forEach((g) => {
    generators[g]
      .call(hexo, siteLocals)
      .then((data) => {
        return data;
      })
      .reduce((result, data) => {
        return data ? result.concat(data) : result;
      }, [])
      .map((item) => {
        for (let i = 1; i < languages.length; i++) {
          const language = languages[i];
          const copy = Object.assign({}, item);
          copy.path = `${language}/${item.path}`;
          copy.data.base = `${language}/${item.data.base}`;
          copy.data.prev_link = `${language}/${item.data.prev_link}`;
          copy.data.current_url = `${language}/${item.data.current_url}`;
          copy.data.next_link = `${language}/${item.data.next_link}`;
          result.push(copy);
        }
      });
  });

  return result;
});

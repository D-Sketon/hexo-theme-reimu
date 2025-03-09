const { join, dirname } = require("path");
const { Cache } = require("hexo-util");

const partialLang = (ctx) =>
  function partial(name, locals, options = {}) {
    if (typeof name !== "string") throw new TypeError("name must be a string!");
    const { cache } = options;
    const viewDir = this.view_dir;
    const currentView = this.filename.substring(viewDir.length);
    const path = join(dirname(currentView), name);
    const view = ctx.theme.getView(path) || ctx.theme.getView(name);
    const viewLocals = { layout: false };
    if (!view) {
      throw new Error(`Partial ${name} does not exist. (in ${currentView})`);
    }
    if (options.only) {
      Object.assign(viewLocals, locals);
    } else {
      Object.assign(viewLocals, this, locals);
    }
    // Partial don't need layout
    viewLocals.layout = false;
    if (cache) {
      const cacheId = typeof cache === "string" ? cache : view.path;
      return this.fragment_lang_cache(cacheId, () => view.renderSync(viewLocals), options.lang);
    }
    return view.renderSync(viewLocals);
  };

const fragmentLangCache = (ctx) => {
  const cacheLList = {}

  // reset cache for watch mode
  ctx.on("generateBefore", () => {
    Object.keys(cacheLList).forEach((lang) => {
      cacheLList[lang].flush();
    });
  });

  return function fragmentCache(id, fn, lang) {
    if (lang) {
      if (!cacheLList[lang]) {
        cacheLList[lang] = new Cache();
      }
    }
    if (this.cache && lang) {
      return cacheLList[lang].apply(id, fn);
    }

    const result = fn();

    if (lang) {
      cacheLList[lang].set(id, result);
    }
    return result;
  };
};


hexo.extend.helper.register("fragment_lang_cache", fragmentLangCache(hexo));
hexo.extend.helper.register("partial_lang", partialLang(hexo));

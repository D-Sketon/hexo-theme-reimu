const util = require("hexo-util");
const slugize = util.slugize;

hexo.extend.helper.register("parseHomeCategories", (categories) => {
  let catDir = hexo.config.category_dir;
  if (catDir === "/") catDir = "";
  if (!catDir.endsWith("/")) catDir += "/";
  const map = hexo.config.category_map || {};
  if (Array.isArray(categories)) {
    const sluization = categories
      .map((category) => {
        category = map[category] || category;
        return slugize(category, { transform: hexo.config.filename_case });
      })
      .join("/");
    return {
      url: `/${catDir}${sluization}`,
      name: categories[categories.length - 1],
      count:
        hexo.locals
          .get("categories")
          .find({ name: categories[categories.length - 1] })
          ?.first()?.length || 0,
    };
  } else {
    categories = map[categories] || categories;
    return {
      url: `/${catDir}${slugize(categories, {
        transform: hexo.config.filename_case,
      })}`,
      name: categories,
      count:
        hexo.locals.get("categories").find({ name: categories })?.first()
          ?.length || 0,
    };
  }
});

const util = require("hexo-util");
const slugize = util.slugize;

hexo.extend.helper.register("parseHomeCategories", (categories) => {
  let catDir = hexo.config.category_dir;
  if (catDir === "/") catDir = "";
  if (!catDir.endsWith("/")) catDir += "/";

  const map = hexo.config.category_map || {};
  const resolveCategory = (category) => map[category] || category;
  const getCategoryCount = (category) =>
    hexo.locals.get("categories").find({ name: category })?.first()?.length ||
    0;

  if (Array.isArray(categories)) {
    const slugizedCategories = categories
      .map(resolveCategory)
      .map((category) =>
        slugize(category, { transform: hexo.config.filename_case })
      )
      .join("/");
    const lastCategoryName = categories[categories.length - 1];

    return {
      url: `/${catDir}${slugizedCategories}`,
      name: lastCategoryName,
      count: getCategoryCount(lastCategoryName),
    };
  } else {
    const resolvedCategory = resolveCategory(categories);

    return {
      url: `/${catDir}${slugize(resolvedCategory, {
        transform: hexo.config.filename_case,
      })}`,
      name: resolvedCategory,
      count: getCategoryCount(resolvedCategory),
    };
  }
});

hexo.extend.helper.register("listCategories", (...args) => {
  const result = hexo.extend.helper.store.list_categories.apply(hexo, args);
  return result.replace(/<a class="([^"]+)" href="([^"]+)">/g, `<a class="$1" href="$2" data-aos="${args[2]}">`);
});
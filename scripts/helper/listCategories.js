hexo.extend.helper.register("listCategories", function (...args) {
  const result = hexo.extend.helper.store.list_categories.apply(this, args);
  return result.replace(/<a class="([^"]+)" href="([^"]+)">/g, `<a class="$1" href="$2" data-aos="${args[2]}">`);
});
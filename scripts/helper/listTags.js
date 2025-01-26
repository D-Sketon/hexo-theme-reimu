hexo.extend.helper.register('listTags', function (...args) {
  const result = hexo.extend.helper.store.list_tags.apply(this, args);
  return result.replace(/<li class="([^"]+)">/g, `<li class="$1" data-aos="${args[2]}">`);
});
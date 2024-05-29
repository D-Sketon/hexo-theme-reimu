hexo.extend.helper.register("randomCover", () => {
  let covers = hexo.locals.get("covers");
  if (!covers) {
    return null;
  }
  return covers[Math.floor(Math.random() * covers.length)];
});

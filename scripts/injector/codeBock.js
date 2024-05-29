const js = hexo.extend.helper.get("js").bind(hexo);

if (
  hexo.config.highlight.enable ||
  hexo.config.syntax_highlighter === "highlight.js"
) {
  hexo.extend.injector.register(
    "body_end",
    () => {
      return js({ src: "/js/insert_highlight.js", "data-pjax": true });
    },
    "default"
  );
}

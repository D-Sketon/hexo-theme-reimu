/**
 * {% heatMapCard "levelStandard" %}
 */
hexo.extend.tag.register("heatMapCard", function (args) {
  let levelStandard = args.shift();
  if (!levelStandard) {
    levelStandard = "1000,5000,10000";
  }
  const articlesData = [];
  const wordCountFn = hexo.extend.helper.get("raw_wordcount");
  const css = hexo.extend.helper.get("css").bind(hexo);
  const js = hexo.extend.helper.get("js").bind(hexo);
  hexo.locals.invalidate();
  hexo.locals.get("posts").each((post) => {
    articlesData.push({
      title: post.title,
      date: post.date,
      updated: post.updated,
      wordcount: wordCountFn(post._content),
    });
  });

  return `<script>var REIMU_HEATMAP_CONFIG = {articleStats: ${JSON.stringify(
    articlesData
  )}, levelStandard: "${levelStandard}"};</script>${css("css/heat-map")}<div id="heatmap"></div>${js("js/heat_map")}`;
});

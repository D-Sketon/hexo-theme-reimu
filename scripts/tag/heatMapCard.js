const { url_for } = require("hexo-util");

const i18n = {
  en: {
    no_articles: "No articles",
    words: "word(s)",
    total_articles: "$1 article(s), $2 word(s)"
  },
  ja: {
    no_articles: "記事がありません",
    words: "文字",
    total_articles: "$1 記事, $2 文字"
  },
  "zh-CN": {
    no_articles: "没有文章",
    words: "字",
    total_articles: "共 $1 篇文章, $2 字"
  },
  "zh-TW": {
    no_articles: "没有文章",
    words: "字",
    total_articles: "共 $1 篇文章, $2 字"
  }
}

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
      url: url_for.call(hexo, post.path)
    });
  });

  return `<script>var REIMU_HEATMAP_CONFIG = {articleStats: ${JSON.stringify(
    articlesData
  )}, i18n: ${JSON.stringify(i18n)}, levelStandard: "${levelStandard}"};</script>${css("css/heat-map")}<div id="heatmap"></div>${js("js/heat_map")}`;
});

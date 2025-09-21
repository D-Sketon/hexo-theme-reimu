// 改自 https://github.com/willin/hexo-wordcount
const { stripHTML, Cache } = require("hexo-util");

const cachedWordCount = new Cache();

const CN_REGEXP = /[\u4E00-\u9FA5]/g;
const EN_REGEXP =
  /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g;

const counter = (content) => {
  content = stripHTML(content);
  const cn = (content.match(CN_REGEXP) || []).length;
  const en = (content.replace(CN_REGEXP, "").match(EN_REGEXP) || []).length;
  return [cn, en];
};

const getCountsWithCache = (content, id) => {
  if (!id) return counter(content);
  return cachedWordCount.apply(id, () => counter(content));
};

const countFn = (content, id) => {
  const [cn, en] = getCountsWithCache(content, id);
  return cn + en;
};

const timeFn = (content, { cn = 300, en = 160 } = {}, id) => {
  const [cnCount, enCount] = getCountsWithCache(content, id);
  const reading = cnCount / cn + enCount / en;
  return Math.max(1, Math.ceil(reading));
};

const formatMinutesHHMM = (min) => {
  if (!min) return "";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

hexo.extend.helper.register("min2read", (content, opts = {}, id) => {
  return timeFn(content, opts, id);
});

hexo.extend.helper.register("raw_wordcount", (content, id) => {
  return countFn(content, id);
});

hexo.extend.helper.register("wordcount", (content, id) => {
  const count = countFn(content, id);
  return count < 1000 ? count : Math.round(count / 100) / 10 + "k";
});

let cachedTotalCount;
let cachedTotalMin2Read;

hexo.extend.helper.register("totalcount", function () {
  if (cachedTotalCount === undefined) {
    let count = 0;
    hexo.locals
      .get("posts")
      .each((post) => (count += countFn(post.content, post._id)));
    cachedTotalCount =
      count < 1000 ? count : Math.round(count / 100) / 10 + "k";
  }
  return cachedTotalCount;
});

hexo.extend.helper.register("totalmin2read", function () {
  if (cachedTotalMin2Read === undefined) {
    let readingTime = 0;
    hexo.locals
      .get("posts")
      .each((post) => (readingTime += timeFn(post.content, {}, post._id)));
    cachedTotalMin2Read = formatMinutesHHMM(readingTime);
  }
  return cachedTotalMin2Read;
});

// 改自 https://github.com/willin/hexo-wordcount
const { stripHTML, Cache } = require("hexo-util");

const cachedWordCount = new Cache();

const CN_REGEXP =
  /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\uAC00-\uD7AF\u3130-\u318F]/g;
const EN_REGEXP =
  /[\w\u00C0-\u024F\u1E00-\u1EFF]+|[\u0392-\u03c9\u0400-\u04FF]+/g;

const counter = (content = "") => {
  content = content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, "");
  content = stripHTML(content);
  if (!content) return [0, 0];
  const cn = (content.match(CN_REGEXP) || []).length;
  const en = (content.match(EN_REGEXP) || []).length;

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

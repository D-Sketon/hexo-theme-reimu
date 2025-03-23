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

const countFn = (content, id) => {
  let len;
  if (!id) {
    len = counter(content);
  } else {
    len = cachedWordCount.apply(id, () => counter(content));
  }
  return len[0] + len[1];
};
const changeHourMinuteStr = (str) => {
  if (str !== "0" && str !== "" && str !== null) {
    return (
      (Math.floor(str / 60).toString().length < 2
        ? "0" + Math.floor(str / 60).toString()
        : Math.floor(str / 60).toString()) +
      ":" +
      ((str % 60).toString().length < 2
        ? "0" + (str % 60).toString()
        : (str % 60).toString())
    );
  } else {
    return "";
  }
};
const timeFn = (content, { cn = 300, en = 160 } = {}, id) => {
  let len;
  if (!id) {
    len = counter(content);
  } else {
    len = cachedWordCount.apply(id, () => counter(content));
  }
  let readingTime = len[0] / cn + len[1] / en;
  return readingTime < 1 ? 1 : parseInt(readingTime, 10);
};

hexo.extend.helper.register(
  "min2read",
  (content, { cn = 300, en = 160 } = {}, id) => {
    return timeFn(content, { cn, en }, id);
  }
);

hexo.extend.helper.register("raw_wordcount", (content, id) => {
  return countFn(content, id);
});

hexo.extend.helper.register("wordcount", (content, id) => {
  const count = countFn(content, id);
  return count < 1000 ? count : Math.round(count / 100) / 10 + "k";
});

let cachedTotalCount = undefined;
let cachedTotalMin2Read = undefined;

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
    cachedTotalMin2Read = changeHourMinuteStr(readingTime.toString());
  }
  return cachedTotalMin2Read;
});

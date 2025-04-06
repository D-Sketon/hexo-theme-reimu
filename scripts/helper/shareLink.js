const shareMap = {
  weibo: (url, title) => `https://service.weibo.com/share/share.php?url=${url}&appkey=&title=${title}&pic=&ralateUid=`,
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  twitter: (url, title, desc, source) => `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=${source}`,
  linkedin: (url, title, desc) => `https://www.linkedin.com/shareArticle?url=${url}&title=${title}&summary=${desc}&mini=true&ro=true`,
  reddit: (url, title) => `https://www.reddit.com/submit?url=${url}&title=${title}`,
  qq: (url, title, desc, source) => `https://connect.qq.com/widget/shareqq/index.html?url=${"www.baidu.com"}&title=${title}&desc=${desc}&source=${source}`,
  weixin: () => `javascript:;`,
}

const util = require("hexo-util");
const stripHTML = util.stripHTML;

hexo.extend.helper.register("shareLink", (post, key) => {
  const url = encodeURIComponent(post.permalink);
  const title = encodeURIComponent(post.title);
  const desc = encodeURIComponent(post.excerpt ? stripHTML(post.excerpt) : (post.description || post.title));
  const source = encodeURIComponent(hexo.config.url);

  return shareMap[key](url, title, desc, source);
});

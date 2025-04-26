const { full_url_for } = require("hexo-util");

const CC = (type) =>
  `<a href="https://creativecommons.org/licenses/${type}/4.0/deed.zh" rel="noopener external nofollow noreferrer" target="_blank"><span class="icon-creative-commons"></span>${type.toUpperCase()}</a>`;

hexo.extend.helper.register("articleCopyright", function (post) {
  const siteLang = hexo.config.language;
  const lang = post.lang;
  let permalink;
  if (lang !== siteLang) {
    const path = post.path;
    if (path.startsWith(`${lang}/`)) {
      permalink = full_url_for.call(hexo, path);
    } else {
      permalink = full_url_for.call(hexo, `${lang}/${path}`);
    }
  } else {
    permalink = post.permalink;
  }
  const {
    author,
    link,
    title,
    date,
    updated,
    license,
    license_type = "by-nc-sa",
  } = hexo.theme.config.article_copyright.content;
  const authorDom = `<p><strong><span class="icon-user icon"></span>${this.__(
    "article_copyright.author"
  )}</strong>${hexo.config.author} @ ${hexo.config.title}</p>`;
  const linkDom = `<p><strong><span class="icon-link icon"></span>${this.__(
    "article_copyright.permalink"
  )}</strong><a href="${permalink}">${permalink}</a></p>`;
  const titleDom = `<p><strong><span class="icon-pencil icon"></span>${this.__(
    "article_copyright.title"
  )}</strong>「${post.title}」</p>`;
  const dateDom = `<p><strong><span class="icon-calendar icon"></span>${this.__(
    "article_copyright.date"
  )}</strong>${post.date?.format("YYYY-MM-DD HH:mm:ss") ?? "未知(ﾟ⊿ﾟ)ﾂ"}</p>`;
  const updatedDom = `<p><strong><span class="icon-calendar icon"></span>${this.__(
    "article_copyright.updated"
  )}</strong>${
    post.updated?.format("YYYY-MM-DD HH:mm:ss") ?? "未知(ﾟ⊿ﾟ)ﾂ"
  }</p>`;
  const licenseDom = `<p><strong><span class="icon-copyright icon"></span>${this.__(
    "article_copyright.license"
  )}</strong>${this._p(
    "article_copyright.license_content",
    CC(license_type)
  )}</p>`;
  return `<blockquote class="article-copyright">
    ${author ? authorDom : ""}
    ${link ? linkDom : ""}
    ${title ? titleDom : ""}
    ${date ? dateDom : ""}
    ${updated ? updatedDom : ""}
    ${license ? licenseDom : ""}
    ${
      license
        ? '<span class="icon-creative-commons article-copyright-bg"></span>'
        : ""
    }
  </blockquote>`;
});

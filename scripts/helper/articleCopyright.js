const { full_url_for } = require("hexo-util");

hexo.extend.helper.register("articleCopyright", (post) => {
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
  const authorDom = `<p><strong><span class="icon-user icon"></span>本文作者：</strong>${hexo.config.author} @ ${hexo.config.title}</p>`;
  const linkDom = `<p><strong><span class="icon-link icon"></span>本文链接：</strong><a href="${permalink}">${permalink}</a></p>`;
  const titleDom = `<p><strong><span class="icon-pencil icon"></span>本文标题：</strong>「${post.title}」</p>`;
  const dateDom = `<p><strong><span class="icon-calendar icon"></span>本文发布时间：</strong>${post.date?.format(
    "YYYY-MM-DD HH:mm:ss"
  ) ?? '未知(ﾟ⊿ﾟ)ﾂ'}</p>`;
  const updatedDom = `<p><strong><span class="icon-calendar icon"></span>本文修改时间：</strong>${post.updated?.format(
    "YYYY-MM-DD HH:mm:ss"
  ) ?? '未知(ﾟ⊿ﾟ)ﾂ'}</p>`;
  const licenseDom = `<p><strong><span class="icon-copyright icon"></span>本文版权：</strong>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" rel="noopener external nofollow noreferrer" target="_blank"><span class="icon-creative-commons"></span>BY-NC-SA</a> 许可协议。转载请注明出处！</p>`;
  const { author, link, title, date, updated, license } =
    hexo.theme.config.article_copyright.content;
  return `<blockquote class="article-copyright">
    ${author ? authorDom : ""}
    ${link ? linkDom : ""}
    ${title ? titleDom : ""}
    ${date ? dateDom : ""}
    ${updated ? updatedDom : ""}
    ${license ? licenseDom : ""}
    ${license ? '<span class="icon-creative-commons article-copyright-bg"></span>' : ""}
  </blockquote>`;
});

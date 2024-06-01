hexo.extend.helper.register("articleCopyright", (post) => {
  const authorDom = `<p><strong>本文作者：</strong>${hexo.config.author} @ ${hexo.config.title}</p>`;
  const linkDom = `<p><strong>本文链接：</strong><a href="${post.permalink}">${post.permalink}</a></p>`;
  const titleDom = `<p><strong>本文标题：</strong>${post.title}</p>`;
  const dateDom = `<p><strong>本文发布时间：</strong>${post.date?.format(
    "YYYY-MM-DD HH:mm:ss"
  ) ?? '未知(ﾟ⊿ﾟ)ﾂ'}</p>`;
  const updatedDom = `<p><strong>本文修改时间：</strong>${post.updated?.format(
    "YYYY-MM-DD HH:mm:ss"
  ) ?? '未知(ﾟ⊿ﾟ)ﾂ'}</p>`;
  const licenseDom = `<p><strong>本文版权：</strong>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"><span class="icon-creative-commons"></span>BY-NC-SA</a> 许可协议。转载请注明出处！</p>`;
  if (!hexo.theme.config.article_copyright.enable) return "";
  const { author, link, title, date, updated, license } =
    hexo.theme.config.article_copyright.content;
  return `<blockquote class="article-copyright">
    ${author ? authorDom : ""}
    ${link ? linkDom : ""}
    ${title ? titleDom : ""}
    ${date ? dateDom : ""}
    ${updated ? updatedDom : ""}
    ${license ? licenseDom : ""}
  </blockquote>`;
});

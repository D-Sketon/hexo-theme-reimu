const { url_for, escapeHTML, stripHTML } = require("hexo-util");

/**
 * {% postLinkCard slug [cover]|"auto" [escape] %}
 */
hexo.extend.tag.register("postLinkCard", (args) => {
  let slug = args.shift();
  if (!slug) {
    throw new Error(
      `Post not found: "${slug}" doesn't exist for {% post_link %}`
    );
  }

  let hash = "";
  const parts = slug.split("#");

  if (parts.length === 2) {
    slug = parts[0];
    hash = parts[1];
  }

  let escape = "true";
  let cover = "";
  if (args.length == 2) {
    escape = args.pop();
    cover = args.pop();
  } else {
    const last = args[args.length - 1];
    if (last === "true" || last === "false") {
      escape = args.pop();
    } else {
      cover = last ?? "";
    }
  }

  const post =
    hexo.model("Post").findOne({ slug }) ||
    hexo.model("Post").findOne({ title: slug });
  if (!post) {
    throw new Error(`Post not found: post_link ${slug}.`);
  }

  let title = post.title || post.slug;
  // Let attribute be the true post title so it appears in tooltip.
  const attrTitle = escapeHTML(title);
  if (escape === "true") title = escapeHTML(title);

  const link = url_for.call(hexo, post.path + (hash ? `#${hash}` : ""));
  if(cover === "auto") cover = url_for.call(hexo, hexo.theme.config.banner);
  const coverDom = cover
    ? `<div class="post-link-card-cover-wrap"><img src="${cover}" class="no-lightbox" title="${attrTitle}" alt="${attrTitle}"/></div>`
    : "";
  return `<div class="post-link-card-wrap">
    <div class="post-link-card">
      <a href="${link}" title="${attrTitle}"></a>
      ${coverDom}
      <div class="post-link-card-item-wrap">
        <div class="post-link-card-title">${title}</div>
        <div class="post-link-card-excerpt">${
          post.excerpt ?? stripHTML(post._content).slice(0, 200)
        }</div>
      </div>
    </div>
  </div>`;
});

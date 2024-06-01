/**
 * {% externalLinkCard title link [background]|"auto" %}
 */
hexo.extend.tag.register("externalLinkCard", (args) => {
  let title = args.shift();
  let link = args.shift();
  let background = args.shift();
  if (!title || !link) {
    throw new Error(
      `External link not found: "${title}" doesn't exist for {% externalLinkCard %}`
    );
  }
  const coverDom = background
    ? background === "auto"
      ? `<div class="post-link-card-cover-wrap auto"><div class="icon-globe"></div></div>`
      : `<div class="post-link-card-cover-wrap"><img src=${background} class="no-fancybox" title=${title} /></div>`
    : "";
  return `<div class="post-link-card-wrap">
    <div class="post-link-card">
      <a href="${link}" title="${title}"></a>
      ${coverDom}
      <div class="post-link-card-item-wrap">
        <div class="post-link-card-title">${title}</div>
        <div class="post-link-card-excerpt"><span class="icon-link"></span>${link}</div>
      </div>
    </div>
  </div>`;
});

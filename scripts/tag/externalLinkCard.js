/**
 * {% externalLinkCard title link [cover]|"auto" %}
 */
hexo.extend.tag.register("externalLinkCard", (args) => {
  let title = args.shift();
  let link = args.shift();
  let cover = args.shift();
  if (!title || !link) {
    throw new Error(
      `External link not found: "${title}" doesn't exist for {% externalLinkCard %}`
    );
  }
  const coverDom = cover
    ? cover === "auto"
      ? `<div class="post-link-card-cover-wrap auto"><div class="icon-globe"></div></div>`
      : `<div class="post-link-card-cover-wrap"><img src="${cover}" class="no-lightbox" title="${title}" alt="${title}"/></div>`
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

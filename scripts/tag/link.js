const { url_for, escapeHTML, stripHTML } = require("hexo-util");

const looksLikeCover = (value = "") => {
  if (!value) return false;
  if (value === "auto") return true;
  return (
    /^(https?:)?\/\//i.test(value) ||
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../")
  );
};

const looksLikeExternalLink = (value = "") => {
  if (!value) return false;
  return /^(https?:)?\/\//i.test(value) || /^(mailto|tel):/i.test(value);
};

/**
 * {% link slug|link [title] [cover]|"auto" [escape] %}
 */
hexo.extend.tag.register("link", (args) => {
  if (!args.length) {
    throw new Error("Link target is required for {% link %}");
  }

  const targetRaw = args.shift();
  let slug = "";
  let hash = "";

  if (!looksLikeExternalLink(targetRaw)) {
    slug = targetRaw;
    if (slug.includes("#")) {
      const parts = slug.split("#");
      slug = parts.shift();
      hash = parts.join("#");
    }
  }

  let escape = "true";
  const lastArg = args[args.length - 1];
  if (lastArg === "true" || lastArg === "false") {
    escape = args.pop();
  }

  let title = "";
  let cover = "";

  if (args.length === 2) {
    [title, cover] = args;
  } else if (args.length === 1) {
    if (looksLikeCover(args[0])) {
      cover = args[0];
    } else {
      title = args[0];
    }
  }

  const post = slug
    ? hexo.model("Post").findOne({ slug }) ||
      hexo.model("Post").findOne({ title: slug })
    : null;

  if (slug && !post) {
    throw new Error(`Post not found: "${slug}" for {% link %}`);
  }

  let finalTitle = "";
  let link = "";
  let attrTitle = "";
  let description = "";
  let coverDom = "";

  if (post) {
    const displayTitle = title ? title : post.title || post.slug;
    attrTitle = escapeHTML(displayTitle);
    finalTitle = escape === "false" ? displayTitle : escapeHTML(displayTitle);
    link = url_for.call(
      hexo,
      `/${post.lang ? post.lang + "/" : ""}${post.path}${
        hash ? "#" + hash : ""
      }`,
      { relative: false }
    );

    if (cover === "auto") {
      cover = url_for.call(hexo, hexo.theme.config.banner);
    }

    coverDom = cover
      ? `<div class="post-link-card-cover-wrap"><img src="${cover}" class="no-lightbox" title="${attrTitle}" alt="${attrTitle}"/></div>`
      : "";

    description = post.excerpt
      ? stripHTML(post.excerpt)
      : stripHTML(post._content).slice(0, 100);
  } else {
    link = targetRaw;
    description = `<span class="icon-link"></span>${link}`;
    attrTitle = escapeHTML(title || link);
    finalTitle = escape === "false" ? title || link : escapeHTML(title || link);
    if (cover) {
      if (cover === "auto") {
        coverDom = `<div class="post-link-card-cover-wrap auto"><div class="icon-globe"></div></div>`;
      } else {
        coverDom = `<div class="post-link-card-cover-wrap"><img src="${cover}" class="no-lightbox" title="${attrTitle}" alt="${attrTitle}"/></div>`;
      }
    }
  }

  return `<div class="post-link-card-wrap">
		<div class="post-link-card">
			<a href="${link}" title="${attrTitle}" ${
    post ? "" : 'rel="noopener nofollow noreferrer" target="_blank"'
  }></a>
			${coverDom}
			<div class="post-link-card-item-wrap">
				<div class="post-link-card-title">${finalTitle}</div>
				<div class="post-link-card-excerpt">${description}</div>
			</div>
		</div>
	</div>`;
});

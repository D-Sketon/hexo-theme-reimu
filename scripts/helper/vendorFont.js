const { htmlTag } = require("hexo-util");
hexo.extend.helper.register("vendorGoogleFont", () => {
  const fontDisplay = "&display=swap";
  const fontStyles = ":400,400italic,700,700italic";
  const fontHost = "https://fonts.googleapis.com";

  const basicConfigFontFamilies = [...(hexo.theme.config.font?.article ?? []), ...(hexo.theme.config.font?.code ?? [])]

  const fontFamilies = basicConfigFontFamilies
    .map((item) => item + fontStyles)
    .filter((item) => item !== "")
    .join("|");

  return (
    htmlTag("link", {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    }) +
    htmlTag("link", {
      rel: "preload",
      as: "style",
      href: `${fontHost}/css?family=${fontFamilies.concat(fontDisplay)}`,
    }) +
    htmlTag("link", {
      rel: "stylesheet",
      href: `${fontHost}/css?family=${fontFamilies.concat(fontDisplay)}`,
      media: "print",
      onload: "this.media='all'",
    })
  );
});
hexo.extend.helper.register("vendorFont", () => {
  const fontStyle = [];
  for(const customBasic of hexo.theme.config.custom_font?.article ?? []) {
    const css = customBasic.css;
    if (css) {
      fontStyle.push(htmlTag("link", {
        rel: "preload",
        as: "style",
        href: css,
        onload: "this.rel='stylesheet'",
        crossorigin: true,
      }));
    }
  }

  for(const customCode of hexo.theme.config.custom_font?.code ?? []) {
    const css = customCode.css;
    if (css) {
      fontStyle.push(htmlTag("link", {
        rel: "preload",
        as: "style",
        href: css,
        onload: "this.rel='stylesheet'",
        crossorigin: true,
      }));
    }
  }
  return fontStyle.join("");
});


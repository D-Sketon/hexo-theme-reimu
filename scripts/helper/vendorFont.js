const { htmlTag } = require("hexo-util");
hexo.extend.helper.register("vendorFont", () => {
  const fontDisplay = "&display=swap";
  const fontStyles = ":400,400italic,700,700italic";
  const fontHost = "https://fonts.googleapis.com";

  let fontFamilies = ["Mulish", "Noto Serif SC", "Ubuntu Mono"]
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

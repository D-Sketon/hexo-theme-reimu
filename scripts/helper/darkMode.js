hexo.extend.helper.register("darkMode", function () {
  const dm = hexo.theme.config.dark_mode || {};
  let button = true;
  let mode = "auto";

  if (typeof dm === "object" && dm !== null) {
    if (dm.enable !== undefined) {
      button = true;
      mode = dm.enable;
    } else {
      button = dm.button !== undefined ? dm.button : true;
      mode = dm.type || "auto";
    }
  }
  return { button, mode };
});

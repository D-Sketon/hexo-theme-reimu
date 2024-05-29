hexo.extend.generator.register("pages", (locals) => {
  return [
    {
      path: "404.html",
      data: { type: "404" },
      layout: ["page"],
    },
  ];
});

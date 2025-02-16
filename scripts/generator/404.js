hexo.extend.generator.register("404", (locals) => {
  return [
    {
      path: "404.html",
      data: { type: "404" },
      layout: ["page"],
    },
  ];
});

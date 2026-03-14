let asyncCss;
/**
 * {% grid [width] [col] %}
 * <!-- cell -->
 * content
 * <!-- cell -->
 * content
 * {% endgrid %}
 */
hexo.extend.tag.register(
  "grid",
  function (args, content) {
    if (!asyncCss) {
      asyncCss = hexo.extend.helper.get("asyncCss").bind(hexo);
    }
    const { columnWidth, fixedColumns } = args.reduce(
      (acc, arg) => {
        if (arg.startsWith("col:")) {
          const cols = Number.parseInt(arg.split(":")[1], 10);
          if (!Number.isNaN(cols) && cols > 0) {
            acc.fixedColumns = cols;
          }
          return acc;
        }

        const width = Number.parseInt(arg, 10);
        if (!Number.isNaN(width) && width > 0) {
          acc.columnWidth = width;
        }
        return acc;
      },
      { columnWidth: 240, fixedColumns: null }
    );

    const cellBlocks = content
      .split(/<!--\s*cell\s*-->/g)
      .filter((item) => item.trim().length > 0);

    const renderCell = (text) =>
      `<div class="grid-cell">${hexo.render.renderSync({
        text,
        engine: "markdown",
      })}</div>`;

    const html = (cellBlocks.length ? cellBlocks.map((item) => item.trim()) : [
      content,
    ])
      .map(renderCell)
      .join("");

    const gridClass = fixedColumns
      ? `grid-container-${columnWidth}-col-${fixedColumns}`
      : `grid-container-${columnWidth}`;

    const gridStyle = fixedColumns
      ? `grid-template-columns: repeat(${fixedColumns}, 1fr);`
      : `grid-template-columns: repeat(auto-fit, minmax(${columnWidth}px, 1fr));`;

    return `<div class="reimu-grid ${gridClass}" style="${gridStyle}">${html}</div>
${asyncCss("css/grid")}
`;
  },
  { ends: true }
);

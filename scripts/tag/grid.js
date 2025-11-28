const css = hexo.extend.helper.get("css").bind(hexo);
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
    let columnWidth = 240;
    let fixedColumns = null;

    args.forEach((arg) => {
      if (arg.startsWith("col:")) {
        const cols = parseInt(arg.split(":")[1]);
        if (!isNaN(cols) && cols > 0) {
          fixedColumns = cols;
        }
      } else {
        const width = parseInt(arg);
        if (!isNaN(width) && width > 0) {
          columnWidth = width;
        }
      }
    });

    const cellBlocks = content
      .split(/<!--\s*cell\s*-->/g)
      .filter((item) => item.trim().length > 0);

    let html = "";

    if (cellBlocks.length > 0) {
      cellBlocks.forEach((cellContent) => {
        const renderedContent = hexo.render.renderSync({
          text: cellContent.trim(),
          engine: "markdown",
        });
        html += `<div class="grid-cell">${renderedContent}</div>`;
      });
    } else {
      html = `<div class="grid-cell">${hexo.render.renderSync({
        text: content,
        engine: "markdown",
      })}</div>`;
    }

    const gridClass = fixedColumns
      ? `grid-container-${columnWidth}-col-${fixedColumns}`
      : `grid-container-${columnWidth}`;

    let gridStyle = "";
    if (fixedColumns) {
      gridStyle = `grid-template-columns: repeat(${fixedColumns}, 1fr);`;
    } else {
      gridStyle = `grid-template-columns: repeat(auto-fit, minmax(${columnWidth}px, 1fr));`;
    }

    const gridHtml = `<div class="reimu-grid ${gridClass}" style="${gridStyle}">${html}</div>
${css("css/grid")}
`;

    return gridHtml;
  },
  { ends: true }
);

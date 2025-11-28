/**
 * {% details [summary] %} content {% enddetails %}
 */
hexo.extend.tag.register('details', function(args, content) {
  let summary = args[0];

  if (!summary) {
    summary = 'Details';
  }

  const renderedContent = hexo.render.renderSync({ text: content, engine: 'markdown' });

  return `<details class="details custom-block">
    <summary>${summary}</summary>
    ${renderedContent}
  </details>`;
}, { ends: true });
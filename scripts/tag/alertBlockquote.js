/**
 * {% alertBlockquote type [title] %}
 * content 
 * {% endalertBlockquote %}
 */
hexo.extend.tag.register('alertBlockquote', function(args, content) {
  const type = args[0] || 'info';
  const title = args.slice(1).join(' ');
  
  const validTypes = ['info', 'tip', 'warning', 'danger', 'important'];
  const className = validTypes.includes(type) ? type : 'info';
  const displayTitle = title || className.toUpperCase();

  const renderedContent = hexo.render.renderSync({ text: content, engine: 'markdown' });

  return `<blockquote class="${className} custom-block">
    <p class="custom-block-title">${displayTitle}</p>
    ${renderedContent}
  </blockquote>`;
}, { ends: true });
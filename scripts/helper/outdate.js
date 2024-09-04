hexo.extend.helper.register("outdate", () => {
  const { config } = hexo.theme;
  if (config.outdate?.enable) {
    return `
<script data-pjax>
  var updateTime = _$('#post-update-time')?.innerHTML;

  if (updateTime) {
    const update = new Date(updateTime);
    const now = new Date();
    const diff = now - update;
    const days = diff / 86400000;
    const { daysAgo, message: template } = window.outdate;
    if (days >= daysAgo) {
      const message = template.replace(/{time}/, updateTime);
      const blockquote = _$('#outdate-blockquote');
      if (blockquote) {
        blockquote.querySelector('p').innerText = message;
        blockquote.style.display = 'block';
      }
    }
  }
</script>`;
  }
  return "";
});
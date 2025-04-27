hexo.extend.helper.register("outdate", function () {
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
    const { daysAgo, message: template } = window.REIMU_CONFIG.outdate;
    if (days >= daysAgo) {
      let message = \`This article was last updated on \${updateTime}. Please note that the content may no longer be applicable.\`;
      if (typeof template === 'string') {
        message = template.replace(/{time}/, updateTime);
      } else if (typeof template === 'object') {
        const lang = document.documentElement.lang;
        const messageKey = Object.keys(template).find(key => key.toLowerCase() === lang.toLowerCase());
        if (messageKey && template[messageKey]) {
          message = template[messageKey].replace(/{time}/, updateTime);
        }
      }
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

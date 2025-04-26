hexo.extend.helper.register("outdate", function () {
  const { config } = hexo.theme;
  if (config.outdate?.enable) {
    const message = this.__("outdate.message");
    return `
<script data-pjax>
  var updateTime = _$('#post-update-time')?.innerHTML;

  if (updateTime) {
    const update = new Date(updateTime);
    const now = new Date();
    const diff = now - update;
    const days = diff / 86400000;
    const { daysAgo } = window.REIMU_CONFIG.outdate;
    if (days >= daysAgo) {
      const message = '${message}'.replace(/{time}/, updateTime);
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

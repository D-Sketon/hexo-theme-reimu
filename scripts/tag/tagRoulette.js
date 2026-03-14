// 标签轮盘: 点击游戏手柄emoji（🕹️）触发滚动效果,从预定义的标签数组中随机选择标签显示
// 卡片抄自：5ime作者的博客 https://5ime.cn/hello-2024.html#%E5%85%B3%E4%BA%8E%E6%88%91
// 致谢！！！
let asyncCss;
/**
 * {% tagRoulette [tags] [icon] %}
 */
hexo.extend.tag.register("tagRoulette", (args) => {
  if (!asyncCss) {
    asyncCss = hexo.extend.helper.get("asyncCss").bind(hexo);
  }
  const inputTags =
    args[0] || "点击按钮抽取标签,标签轮盘,带有模糊效果,好想睡觉";
  const tags = String(inputTags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const safeTags = JSON.stringify(tags)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E")
    .replace(/&/g, "\\u0026");
  const icon = args[1] || "🕹️";
  return `
<div class="roll">
    <div class="roll-button" onclick="rollTagRoulette()">${icon}</div>
    <div class="roll-tags"><span class="ready removing"></span></div>
</div>
<script>
var rollTagRoulette = () => {
  const tags = ${safeTags};
  const tag = document.querySelector('.roll-tags');
  if (!tag || !Array.isArray(tags) || tags.length === 0) return;
  tag.innerHTML = '';

  let spans = [];

  const interval = setInterval(() => {
    const span = document.createElement('span');
    span.classList.add('ready');
    span.classList.add('blur');
    const randomIndex = Math.floor(Math.random() * tags.length);
    span.textContent = tags[randomIndex];
    tag.appendChild(span);
    spans = tag.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add('removing');
    }
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    if (!spans.length) return;
    for (let i = 0; i < spans.length - 1; i++) {
      tag.removeChild(spans[i]);
    }
    setTimeout(() => {
      spans[spans.length - 1].classList.remove('blur');
    }, 100);
  }, 1000);
}

rollTagRoulette();
</script>
${asyncCss("css/tag-roulette")}
  `;
});

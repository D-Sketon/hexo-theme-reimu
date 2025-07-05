// 标签轮盘: 点击游戏手柄emoji（🕹️）触发滚动效果,从预定义的标签数组中随机选择标签显示
// 卡片抄自：5ime作者的博客 https://5ime.cn/hello-2024.html#%E5%85%B3%E4%BA%8E%E6%88%91
// 致谢！！！

/**
 * {% tagRoulette "tags" "icon" %}
 */
hexo.extend.tag.register("tagRoulette", (args) => {
  const inputTags = args[0] || "点击按钮抽取标签,标签轮盘,带有模糊效果,好想睡觉";
  const icon = args[1] || "🕹️";
  const css = hexo.extend.helper.get("css").bind(hexo);
  return `
<div class="roll">
    <div class="roll-button" onclick="rollTagRoulette()">${icon}</div>
    <div class="roll-tags"><span class="ready removing"></span></div>
</div>
<script>
var rollTagRoulette = () => {
  var tags = "${inputTags}".split(",");
  var tag = document.querySelector('.roll-tags');
  tag.innerHTML = '';

  var interval = setInterval(function () {
    var span = document.createElement('span');
    span.classList.add('ready');
    span.classList.add('blur');
    span.innerText = tags[Math.floor(Math.random() * tags.length)];
    tag.appendChild(span);
    spans = tag.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.add('removing');
    }
  }, 200);

  setTimeout(function () {
    clearInterval(interval);
    for (var i = 0; i < spans.length-1; i++) {
      tag.removeChild(spans[i]);
    }
    setTimeout(function () {
      spans[spans.length-1].classList.remove('blur');
    }, 100);
  }, 1000);
}

rollTagRoulette(); // 页面加载时自动触发一次滚动
</script>
${css("css/tag-roulette")}
  `
});
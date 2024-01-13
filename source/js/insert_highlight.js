(function ($) {
  // 魔改自 https://github.com/tangyuxian/hexo-theme-tangyuxian
  $('pre').each(function () {
    const parent = $(this).parent('.gutter');
    if (parent.length === 0) {
      $(this).wrap('<div class="code-area"></div>');
    }
  })

  const $codeFigcaption = $('<div class="code-figcaption"><div class="code-left-wrap"><div class="code-decoration"></div><div class="code-lang"></div></div><div class="code-right-wrap"><div class="code-copy icon-copy"></div><div class="icon-chevron-down code-expand"></div></div></div>');
  if($('figure.highlight').children('.code-figcaption').length === 0 ) {
    $('figure.highlight').prepend($codeFigcaption);
  }

  // 代码复制
  new ClipboardJS('.code-copy', {
    target: function (trigger) {
      return $(trigger).parent().parent().siblings().find('td.code')[0]
    }
  });

  // 代码收缩
  $('.code-expand').off('click').on('click', function () {
    if ($(this).parent().parent().parent().hasClass('code-closed')) {
      $(this).siblings('pre').find('code').show();
      $(this).parent().parent().parent().removeClass('code-closed');
      // 处理gutter
      let prev = $(this).parent().parent().parent().parent().prev();
      if (prev.length !== 0 && prev.hasClass('gutter')) {
        $(prev).removeClass('code-closed');
      }
    } else {
      $(this).siblings('pre').find('code').hide();
      $(this).parent().parent().parent().addClass('code-closed');
      // 处理gutter
      let prev = $(this).parent().parent().parent().parent().prev();
      if (prev.length !== 0 && prev.hasClass('gutter')) {
        $(prev).addClass('code-closed');
      }
    }
  });

  // 代码语言
  $('pre').each(function () {
    let codeLanguage = $(this).attr('class') || $(this).parents('figure')?.attr('class')?.split(' ')[1];

    if (!codeLanguage) {
      return true;
    }
    let langName = codeLanguage.replace("line-numbers", "").trim().replace("language-", "").trim();

    // 首字母大写
    langName = langName.slice(0, 1).toUpperCase() + langName.slice(1);
    let children = $(this).parents('figure').children(".code-figcaption");
    if (children.length !== 0) {
      $(children).children('.code-left-wrap').children(".code-lang").text(langName);
    }
  });
})(jQuery);

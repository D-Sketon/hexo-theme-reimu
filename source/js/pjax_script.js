// https://github.com/tangyuxian/hexo-theme-tangyuxian
var getRealPath = (pathname, desc = false) => {
  if (!pathname) {
    pathname = window.location.pathname;
  }
  let names = pathname.split("/");
  if (desc === false) {
    for (let i = names.length - 1; i >= 0; --i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  } else {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  }
  return "/";
};

(function ($) {
  // Share
  $('.article-share-link').off('click').on('click', function (e) {
    e.stopPropagation();

    const $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      title = $this.attr('data-title'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      const html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"></a>',
        '</div>',
        '</div>'
      ].join('');
      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  });
  $('.article-share-box').off('click').on('click', function (e) {
    e.stopPropagation();
  });
  $('.article-share-box-input').off('click').on('click', function () {
    $(this).select();
  });
  $('.article-share-box-link').off('click').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      // ignore friendsLink
      if ($(this).parent().hasClass('friend-icon')) return;

      const alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    });

    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $.fancybox.defaults.hash = false;
    $('.fancybox').fancybox();
  }

  // Mobile nav
  const $container = $('#container');
  let isMobileNavAnim = false;
  const mobileNavAnimDuration = 200;

  const startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  const stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').off('click').on('click', function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });
  $('#mask').off('click').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  });

  $('.sidebar-toc-btn').off('click').on('click', function () {
    if ($(this).hasClass('current')) return;
    $('.sidebar-toc-btn').addClass('current');
    $('.sidebar-common-btn').removeClass('current');
    $('.sidebar-toc-sidebar').removeClass('hidden');
    $('.sidebar-common-sidebar').addClass('hidden');
  });

  $('.sidebar-common-btn').off('click').on('click', function () {
    if ($(this).hasClass('current')) return;
    $('.sidebar-common-btn').addClass('current');
    $('.sidebar-toc-btn').removeClass('current');
    $('.sidebar-common-sidebar').removeClass('hidden');
    $('.sidebar-toc-sidebar').addClass('hidden');
  });

  const rootRealPath = getRealPath(window.location.pathname, true);
  for (let link of $('.sidebar-menu-link-wrap')) {
    let linkPath = $(link).find("a")[0].getAttribute("href");
    if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
      link.className = "sidebar-menu-link-wrap link-active";
    }
  }

  // lazysizes
  const imgs = $('.article-entry img');
  imgs.each(function () {
    const src = $(this).attr('src');
    $(this).addClass('lazyload');
    $(this).removeAttr('src');
    $(this).attr('data-src', src);
    $(this).attr('data-sizes', 'auto');
  })

  // to top
  $('.sidebar-top').off('click').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
  if (document.documentElement.scrollTop < 10) {
    $('.sidebar-top').fadeOut();
  }
  $(window).off('scroll').on('scroll', function () {
    if (document.documentElement.scrollTop < 10) {
      $('.sidebar-top').fadeOut();
    } else {
      $('.sidebar-top').fadeIn();
    }
  });

  // toc
  $('.toc a').off('click').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  });
})(jQuery);

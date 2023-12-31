// https://github.com/tangyuxian/hexo-theme-tangyuxian
const getRealPath = (pathname, desc = false) => {
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
  // dark_mode
  let mode = window.localStorage.getItem('dark_mode')
  if (mode == null) {
    const domMode = document.documentElement.getAttribute('data-theme')
    if (domMode == null) {
      window.localStorage.setItem('dark_mode', 'false')
    } else {
      window.localStorage.setItem('dark_mode', 'true')
    }
  } else {
    if (mode == 'true') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else if (mode == 'false') {
      document.documentElement.removeAttribute('data-theme')
    }
  }
  mode = window.localStorage.getItem('dark_mode')
  if (mode == 'true') {
    $('#sub-nav').append('<a id="nav-sun-btn" class="nav-icon dark-mode-btn"></a>')
  } else if (mode == 'false') {
    $('#sub-nav').append('<a id="nav-moon-btn" class="nav-icon dark-mode-btn"></a>')
  }
  $('.dark-mode-btn').on('click', function () {
    const id = $(this).attr('id')
    if (id == 'nav-sun-btn') {
      window.localStorage.setItem('dark_mode', 'false')
      document.documentElement.removeAttribute('data-theme')
      $(this).attr("id", "nav-moon-btn")
    } else {
      window.localStorage.setItem('dark_mode', 'true')
      document.documentElement.setAttribute('data-theme', 'dark')
      $(this).attr("id", "nav-sun-btn")
    }
  })
  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
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
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
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

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });
  $('#mask').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  });

  $('.sidebar-toc-btn').on('click', function () {
    if ($(this).hasClass('current')) return;
    $('.sidebar-toc-btn').addClass('current');
    $('.sidebar-common-btn').removeClass('current');
    $('.sidebar-toc-sidebar').removeClass('hidden');
    $('.sidebar-common-sidebar').addClass('hidden');
  });

  $('.sidebar-common-btn').on('click', function () {
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
  $('.sidebar-top').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
  if (document.documentElement.scrollTop < 10) {
    $('.sidebar-top').fadeOut();
  }
  $(window).on('scroll', function () {
    if (document.documentElement.scrollTop < 10) {
      $('.sidebar-top').fadeOut();
    } else {
      $('.sidebar-top').fadeIn();
    }
  });

  // toc
  $('.toc a').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  })
})(jQuery);

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

var scrollIntoViewAndWait = (element) => {
  return new Promise(resolve => {
    if ('onscrollend' in window) {
      document.addEventListener('scrollend', resolve, { once: true });
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    } else {
      element.scrollIntoView({ block: 'center', inline: 'center' });
      resolve()
    }
  });
}

(function ($) {
  // anchor
  $('.article-entry h1>a, .article-entry h2>a, .article-entry h3>a, .article-entry h4>a, .article-entry h5>a, .article-entry h6>a').each(function () {
    $(this)[0].innerHTML = "&#xf292;";
  });

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

  $('#main-nav-toggle').off('click').on('click', () => {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $('body').toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });
  $('#mask').off('click').on('click', () => {
    if (isMobileNavAnim || !$('body').hasClass('mobile-nav-on')) return;
    $('body').removeClass('mobile-nav-on');
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
  $('.sidebar-top').off('click').on('click', () => {
    $('html')[0].scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  if (document.documentElement.scrollTop < 10) {
    $('.sidebar-top').fadeOut();
  }
  $(window).off('scroll').on('scroll', () => {
    if (document.documentElement.scrollTop < 10) {
      $('.sidebar-top').fadeOut();
    } else {
      $('.sidebar-top').fadeIn();
    }
  });

  // toc
  $('.toc a').off('click').on('click', () => {
    if (isMobileNavAnim || !$('body').hasClass('mobile-nav-on')) return;
    $('body').removeClass('mobile-nav-on');
  });

  function tocInit() {
    const navItems = getComputedStyle(document.getElementById('sidebar')).display === 'block' ?
      $('#sidebar .sidebar-toc-wrapper li') :
      $('#mobile-nav .sidebar-toc-wrapper li');
    if (!navItems.length) return;

    let activeLock = null;

    const sections = navItems.map(function (index) {
      const link = $(this).children('a.toc-link');
      const anchorScroll = (event) => {
        event.preventDefault();
        const target = $(decodeURI($(event.currentTarget).attr('href')));
        activeLock = index
        scrollIntoViewAndWait(target[0]).then(() => {
          activateNavByIndex(index);
          activeLock = null;
        });
      }
      link.off('click').on('click', (e) => {
        anchorScroll(e);
      });
      const anchor = $(decodeURI(link.attr('href')));
      if (!anchor.length) return null;
      const alink = anchor.children('a');
      alink && alink.on('click', (e) => {
        anchorScroll(e);
      });
      return anchor;
    });

    const activateNavByIndex = (index) => {
      const target = $(navItems[index]);

      if (!target.length) return;
      if (target.hasClass('current')) return;

      $('.sidebar-toc-wrapper .active').removeClass('active current');

      sections.each(function () {
        $(this) && $(this).removeClass('active');
      });

      target.addClass('active current');
      sections[index] && $(sections[index]).addClass('active');

      let parent = navItems[index].parentNode;

      while (!parent.matches('.sidebar-toc')) {
        if (parent.matches('li')) {
          $(parent).addClass('active');
          const t = $(decodeURI($(parent).children('a.toc-link').attr('href')));
          if (t) {
            t.addClass('active');
          }
        }
        parent = parent.parentNode;
      }
      // Scrolling to center active TOC element if TOC content is taller than viewport.
      if (!$('.sidebar-toc-sidebar').hasClass('hidden')) {
        $('.sidebar-toc-wrapper')[0].scrollTo({
          top: $('.sidebar-toc-wrapper').scrollTop() + target[0].offsetTop - $('.sidebar-toc-wrapper')[0].offsetHeight / 2,
          behavior: 'smooth'
        });
      }
    }

    const findIndex = (entries) => {
      let index = 0
      let entry = entries[index]

      const p = sections.toArray().map(i => i[0])
      if (entry.boundingClientRect.top > 0) {
        index = p.indexOf(entry.target)
        return index === 0 ? 0 : index - 1
      }
      for (; index < entries.length; index++) {
        if (entries[index].boundingClientRect.top <= 0) {
          entry = entries[index]
        } else {
          return p.indexOf(entry.target)
        }
      }
      return p.indexOf(entry.target)
    }

    const observer = new IntersectionObserver((entries) => {
      const index = findIndex(entries) + (window.diffY > 0 ? 1 : 0)
      if (activeLock === null) {
        activateNavByIndex(index)
      }
    }, {
      rootMargin: '0px 0px -100% 0px', threshold: 0
    })

    sections.each(function () {
      $(this).length && observer.observe($(this)[0])
    })
  };

  window.addEventListener('hexo-blog-decrypt', tocInit);
  window.addEventListener('hexo-blog-decrypt', () => {
    const script = document.createElement('script');
    script.src = '/js/insert_highlight.js';
    script.setAttribute('data-pjax', true);
    document.body.appendChild(script);
  });
  tocInit();
})(jQuery);

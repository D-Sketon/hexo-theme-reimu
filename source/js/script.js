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
    // Caption
    $('.article-entry').each(function (i) {
        $(this).find('img').each(function () {
            if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

            var alt = this.alt;

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
    var $container = $('#container'),
        isMobileNavAnim = false,
        mobileNavAnimDuration = 200;

    var startMobileNavAnim = function () {
        isMobileNavAnim = true;
    };

    var stopMobileNavAnim = function () {
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

    $('#wrap').on('click', function () {
        if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

        $container.removeClass('mobile-nav-on');
    });


    let rootRealPath = getRealPath(window.location.pathname, true);
    for (let link of $('.sidebar-menu-link-wrap')) {
        let linkPath = $(link).find("a")[0].getAttribute("href");
        if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
            link.className = "sidebar-menu-link-wrap link-active";
        }
    }
})(jQuery);

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

    // codeBlock相关
    // 魔改自 https://github.com/tangyuxian/hexo-theme-tangyuxian
    $('pre').each(function () {
        var parent = $(this).parent('.gutter');
        if (parent.length === 0) {
            $(this).wrap('<div class="code-area"></div>');
        }
    })
    var $codeFigcaption = $('<div class="code-figcaption"><div class="code_lang"></div><div class="code_copy icon-copy"></div><div class="icon-chevron-down code-expand"></div></div>');
    $('.code-area').prepend($codeFigcaption);

    // 代码复制
    new ClipboardJS('.code_copy', {
        target: function (trigger) {
            return trigger.parentElement.nextElementSibling;
        }
    });

    // 代码收缩
    $('.code-expand').on('click', function () {
        if ($(this).parent().parent().hasClass('code-closed')) {
            $(this).siblings('pre').find('code').show();
            $(this).parent().parent().removeClass('code-closed');
            // 处理gutter
            let prev = $(this).parent().parent().parent().prev();
            if (prev.length !== 0 && prev.hasClass('gutter')) {
                $(prev).removeClass('code-closed');
            }
        } else {
            $(this).siblings('pre').find('code').hide();
            $(this).parent().parent().addClass('code-closed');
            // 处理gutter
            let prev = $(this).parent().parent().parent().prev();
            if (prev.length !== 0 && prev.hasClass('gutter')) {
                $(prev).addClass('code-closed');
            }
        }
    });

    // 代码语言
    $('pre').each(function () {
        var code_language = $(this).attr('class') || $(this).parents('figure').attr('class').split(' ')[1];

        if (!code_language) {
            return true;
        }
        var lang_name = code_language.replace("line-numbers", "").trim().replace("language-", "").trim();

        // 首字母大写
        lang_name = lang_name.slice(0, 1).toUpperCase() + lang_name.slice(1);
        var siblings = $(this).siblings(".code-figcaption");
        if (siblings.length !== 0) {
            $(siblings).children(".code_lang").text(lang_name);
        }
    });
})(jQuery);

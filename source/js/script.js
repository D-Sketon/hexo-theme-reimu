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
    document.body.dispatchEvent(new CustomEvent('dark-theme-set'))
  } else if (mode == 'false') {
    $('#sub-nav').append('<a id="nav-moon-btn" class="nav-icon dark-mode-btn"></a>')
    document.body.dispatchEvent(new CustomEvent('light-theme-set'))
  }
  $('.dark-mode-btn').on('click', function () {
    const id = $(this).attr('id')
    if (id == 'nav-sun-btn') {
      window.localStorage.setItem('dark_mode', 'false')
      document.body.dispatchEvent(new CustomEvent('light-theme-set'))
      document.documentElement.removeAttribute('data-theme')
      $(this).attr("id", "nav-moon-btn")
    } else {
      window.localStorage.setItem('dark_mode', 'true')
      document.body.dispatchEvent(new CustomEvent('dark-theme-set'))
      document.documentElement.setAttribute('data-theme', 'dark')
      $(this).attr("id", "nav-sun-btn")
    }
  })
  // Share
  $('body').on('click', () => {
    $('.article-share-box.on').removeClass('on');
  })
  let oldScrollTop = 0
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
      document.body.scrollTop
    let diffY = scrollTop - oldScrollTop;
    window.diffY = diffY;
    oldScrollTop = scrollTop;
    if (diffY < 0) {
      $('#header-nav').removeClass('header-nav-hidden')
    } else {
      $('#header-nav').addClass('header-nav-hidden')
    }
  })
})(jQuery);

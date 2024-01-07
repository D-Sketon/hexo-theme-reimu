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
  })
})(jQuery);

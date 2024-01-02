$(document).ready(function () {
  let searchInput = $('#reimu-search-input');
  let searchResult = $('#reimu-hits');

  searchInput.append('<form id="search-form"><input type="text" id="search-text"></form>');

  $.getJSON('/search.json', function (data) {
    $('#search-form').on('submit', function (event) {
      event.preventDefault();
      let inputText = $('#search-text').val();
      searchResult.empty();
      if (inputText) {
        let hits = data.filter(function (post) {
          return post.title.toLowerCase().includes(inputText.toLowerCase()) ||
                 post.content.toLowerCase().includes(inputText.toLowerCase());
        });

        hits.forEach(function (hit) {
          searchResult.append('<a href="' + hit.url + '" class="reimu-hit-item-link">' + hit.title + '</a>');
        });
      }
    });
  });

  $('.popup-trigger').on('click', function (e) {
    e.stopPropagation();
    $('body').append('<div class="popoverlay">').css('overflow', 'hidden');
    $('.popup').toggle();
    $('#search-text').focus();
  });

  $('.popup-btn-close').click(function () {
    $('.popup').hide();
    $('.popoverlay').remove();
    $('body').css('overflow', '');
  });
});

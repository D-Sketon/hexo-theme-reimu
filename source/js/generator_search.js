$(document).ready(() => {
  let searchInput = $('#reimu-search-input');
  let searchResult = $('#reimu-hits');
  let pagination = $('#reimu-pagination');
  let itemsPerPage = 10;
  let currentPage = 1;

  searchInput.append('<form id="search-form"><input type="text" id="search-text"></form>');

  $.getJSON('/search.json', (data) => {
    $('#search-form').on('submit', (event) => {
      event.preventDefault();
      let inputText = $('#search-text').val();
      searchResult.empty();
      pagination.empty();
      if (inputText) {
        let hits = data.filter((post) => {
          return post.title && post.title.toLowerCase().includes(inputText.toLowerCase()) ||
            post.content && post.content.toLowerCase().includes(inputText.toLowerCase());
        });

        let totalPages = Math.ceil(hits.length / itemsPerPage);
        pagination.append('<ul class="ais-Pagination-list pagination">');
        for (let i = 1; i <= totalPages; i++) {
          let pageItem = $('<li class="ais-Pagination-item pagination-item ais-Pagination-item--page"><a class="ais-Pagination-link page-number" aria-label="Page ' + i + '" href="#">' + i + '</a></li>');
          if (i === currentPage) {
            pageItem.addClass('ais-Pagination-item--selected current');
          }
          pagination.find('ul').append(pageItem);
        }

        $('.page-number').click(function (event) {
          event.preventDefault();
          currentPage = $(this).text();
          $('.ais-Pagination-item').removeClass('ais-Pagination-item--selected current');
          $(this).parent().addClass('ais-Pagination-item--selected current');
          displayHits(hits, currentPage, itemsPerPage);
        });

        displayHits(hits, currentPage, itemsPerPage);
      }
    });
  });

  function displayHits(hits, page, itemsPerPage) {
    searchResult.empty();
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let hitsToDisplay = hits.slice(start, end);
    hitsToDisplay.forEach((hit) => {
      searchResult.append('<a href="' + hit.url + '" class="reimu-hit-item-link">' + hit.title + '</a>');
    });
  }

  $('.popup-trigger').on('click', (e) => {
    e.stopPropagation();
    $('body').append('<div class="popoverlay">').css('overflow', 'hidden');
    $('.popup').toggle();
    $('#search-text').focus();
  });

  $('.popup-btn-close').click(() => {
    $('.popup').hide();
    $('.popoverlay').remove();
    $('body').css('overflow', '');
  });
});

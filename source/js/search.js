// from https://blog.naaln.com/2016/07/hexo-with-algolia/
$(document).ready(function () {
  const algoliaSettings = CONFIG.algolia;
  const isAlgoliaSettingsValid = algoliaSettings.applicationID && algoliaSettings.apiKey && algoliaSettings.indexName;

  if (!isAlgoliaSettingsValid) {
    window.console.error('Algolia Settings are invalid.');
    return;
  }

  const search = instantsearch({
    indexName: algoliaSettings.indexName,
    searchClient: algoliasearch(
      algoliaSettings.applicationID,
      algoliaSettings.apiKey,
    ),
    searchFunction: helper => {
      if ($('#algolia-search-input').find('input').val()) {
          helper.search();
      }
    }
  });

  // Registering Widgets
  [
    instantsearch.widgets.configure({
      hitsPerPage: algoliaSettings.hits.per_page || 10
    }),

    instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      placeholder: algoliaSettings.labels.input_placeholder,
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false
    }),

    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: data => {
          return (
            '<a href="' + data.permalink + '" class="algolia-hit-item-link">' +
            data._highlightResult.title.value +
            '</a>'
          );
        },
        empty: data => {
          return (
            '<div id="algolia-hits-empty">' +
            algoliaSettings.labels.hits_empty.replace(/\$\{query}/, data.query) +
            '</div>'
          );
        }
      },
      cssClasses: {
        item: 'algolia-hit-item'
      }
    }),

    instantsearch.widgets.stats({
      container: '#algolia-stats',
      templates: {
        text: data => {
          const stats = algoliaSettings.labels.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return (
            stats +
            '<span class="algolia-powered">' +
            '  <img src="' + CONFIG.root + 'images/algolia_logo.svg" alt="Algolia" />' +
            '</span>' +
            '<hr />'
          );
        }
      }
    }),

    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo: false,
      showFirst: false,
      showLast : false,
      cssClasses: {
        list: 'pagination',
        item: 'pagination-item',
        link: 'page-number',
        selectedItem: 'current',
        disabledItem: 'disabled-item'
      }
    })
  ].forEach(search.addWidget, search);

  search.start();

  $('.popup-trigger').on('click', function (e) {
    e.stopPropagation();
    $('body').append('<div class="popoverlay">').css('overflow', 'hidden');
    $('.popup').toggle();
    $('#algolia-search-input').find('input').focus();
  });

  $('.popup-btn-close').click(function () {
    $('.popup').hide();
    $('.popoverlay').remove();
    $('body').css('overflow', '');
  });

});

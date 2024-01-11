// from https://blog.naaln.com/2016/07/hexo-with-algolia/
$(document).ready(() => {
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
      if ($('#reimu-search-input').find('input').val()) {
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
      container: '#reimu-search-input',
      placeholder: algoliaSettings.labels.input_placeholder,
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false
    }),

    instantsearch.widgets.hits({
      container: '#reimu-hits',
      templates: {
        item: data => {
          return (
            '<a href="' + data.permalink + '" class="reimu-hit-item-link">' +
            data._highlightResult.title.value +
            '</a>'
          );
        },
        empty: data => {
          return (
            '<div id="reimu-hits-empty">' +
            algoliaSettings.labels.hits_empty.replace(/\$\{query}/, data.query) +
            '</div>'
          );
        }
      },
      cssClasses: {
        item: 'reimu-hit-item'
      }
    }),

    instantsearch.widgets.stats({
      container: '#reimu-stats',
      templates: {
        text: data => {
          const stats = algoliaSettings.labels.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return (
            stats +
            '<span class="reimu-powered">' +
            '  <img src="' + CONFIG.root + 'images/algolia_logo.svg" alt="Algolia" />' +
            '</span>' +
            '<hr />'
          );
        }
      }
    }),

    instantsearch.widgets.pagination({
      container: '#reimu-pagination',
      scrollTo: false,
      showFirst: false,
      showLast: false,
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

  $('.popup-trigger').on('click', (e) => {
    e.stopPropagation();
    $('body').append('<div class="popoverlay">').css('overflow', 'hidden');
    $('.popup').toggle();
    $('#reimu-search-input').find('input').focus();
  });

  $('.popup-btn-close').click(() => {
    $('.popup').hide();
    $('.popoverlay').remove();
    $('body').css('overflow', '');
  });

});

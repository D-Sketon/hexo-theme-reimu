// from https://blog.naaln.com/2016/07/hexo-with-algolia/
$(document).ready(function () {
    var algoliaSettings = CONFIG.algolia;
    var isAlgoliaSettingsValid = algoliaSettings.applicationID && algoliaSettings.apiKey && algoliaSettings.indexName;

    if (!isAlgoliaSettingsValid) {
        window.console.error('Algolia Settings are invalid.');
        return;
    }

    var search = instantsearch({
        appId: algoliaSettings.applicationID,
        apiKey: algoliaSettings.apiKey,
        indexName: algoliaSettings.indexName,
        searchFunction: function (helper) {
            var searchInput = $('#algolia-search-input').find('input');

            if (searchInput.val()) {
                helper.search();
            }
        }
    });

    // Registering Widgets
    [
        instantsearch.widgets.searchBox({
            container: '#algolia-search-input',
            placeholder: algoliaSettings.labels.input_placeholder
        }),

        instantsearch.widgets.hits({
            container: '#algolia-hits',
            hitsPerPage: algoliaSettings.hits.per_page || 10,
            templates: {
                item: function (data) {
                    return (
                        '<a href="' + data.permalink + '" class="algolia-hit-item-link">' +
                        data._highlightResult.title.value +
                        '</a>'
                    );
                },
                empty: function (data) {
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
                body: function (data) {
                    var stats = algoliaSettings.labels.hits_stats
                        .replace(/\$\{hits}/, data.nbHits)
                        .replace(/\$\{time}/, data.processingTimeMS);
                    return (
                        stats +
                        '<span class="algolia-powered">' +
                        '  <img src="' + CONFIG.root + 'css/images/algolia_logo.svg" alt="Algolia" />' +
                        '</span>' +
                        '<hr />'
                    );
                }
            }
        }),

        instantsearch.widgets.pagination({
            container: '#algolia-pagination',
            scrollTo: false,
            showFirstLast: false,
            labels: {
                first: '',
                last: '',
                previous: '',
                next: ''
            },
            cssClasses: {
                root: 'pagination',
                item: 'pagination-item',
                link: 'page-number',
                active: 'current',
                disabled: 'disabled-item'
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
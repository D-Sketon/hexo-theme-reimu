// from https://blog.naaln.com/2016/07/hexo-with-algolia/
const algoliaHandler = () => {
  const algoliaSettings = ALGOLIA_CONFIG.algolia;
  const isAlgoliaSettingsValid =
    algoliaSettings.applicationID &&
    algoliaSettings.apiKey &&
    algoliaSettings.indexName;

  if (!isAlgoliaSettingsValid) {
    console.error("Algolia Settings are invalid.");
    return;
  }

  if (!window.instantsearch) {
    console.error("Algolia InstantSearch is not loaded.");
    return;
  }

  const search = instantsearch({
    indexName: algoliaSettings.indexName,
    searchClient: algoliasearch(
      algoliaSettings.applicationID,
      algoliaSettings.apiKey
    ),
    searchFunction: (helper) => {
      if (_$("#reimu-search-input input")?.value) {
        helper.search();
      }
    },
  });

  // Registering Widgets
  [
    instantsearch.widgets.configure({
      hitsPerPage: algoliaSettings.hits.per_page || 10,
    }),

    instantsearch.widgets.searchBox({
      container: "#reimu-search-input",
      placeholder: algoliaSettings.labels.input_placeholder,
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false,
    }),

    instantsearch.widgets.hits({
      container: "#reimu-hits",
      templates: {
        item: (data) => {
          return (
            '<a href="' +
            data.permalink +
            '" class="reimu-hit-item-link">' +
            data._highlightResult.title.value +
            "</a>"
          );
        },
        empty: (data) => {
          return (
            '<div id="reimu-hits-empty">' +
            algoliaSettings.labels.hits_empty.replace(
              /\$\{query}/,
              data.query
            ) +
            "</div>"
          );
        },
      },
      cssClasses: {
        item: "reimu-hit-item",
      },
    }),

    instantsearch.widgets.stats({
      container: "#reimu-stats",
      templates: {
        text: (data) => {
          const stats = algoliaSettings.labels.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return (
            stats +
            '<span class="reimu-powered">' +
            '  <img src="' +
            ALGOLIA_CONFIG.logo +
            '" alt="Algolia" />' +
            "</span>" +
            "<hr />"
          );
        },
      },
    }),

    instantsearch.widgets.pagination({
      container: "#reimu-pagination",
      scrollTo: false,
      showFirst: false,
      showLast: false,
      cssClasses: {
        list: "pagination",
        item: "pagination-item",
        link: "page-number",
        selectedItem: "current",
        disabledItem: "disabled-item",
      },
    }),
  ].forEach(search.addWidget, search);

  search.start();

  _$(".popup-trigger")
    .off("click")
    .on("click", (event) => {
      event.stopPropagation();
      const scrollWidth =
        window.innerWidth - document.documentElement.offsetWidth;
      _$("#container").style.marginRight = scrollWidth + "px";
      _$("#header-nav").style.marginRight = scrollWidth + "px";
      _$(".popup").classList.add("show");
      _$("#mask").classList.remove("hide");
      document.body.style.overflow = "hidden";
      _$("#reimu-search-input input").focus();
    });

  _$(".popup-btn-close")
    .off("click")
    .on("click", () => {
      _$(".popup").classList.remove("show");
      _$("#mask").classList.add("hide");
      _$("#container").style.marginRight = "";
      _$("#header-nav").style.marginRight = "";
      document.body.style.overflow = "";
    });
};

if (document.readyState !== "loading") {
  algoliaHandler();
} else {
  document.addEventListener("DOMContentLoaded", algoliaHandler);
}

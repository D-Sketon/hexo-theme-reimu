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
          let title = data.title;
          let highlightTitle = data._highlightResult?.title?.value;
          if (!title && data.type) {
            // try DocSearch-compatible fields
            if (data.type === "content" && data.content) {
              title = data.content;
              highlightTitle = data._highlightResult?.content?.value;
            } else if (data.type.startsWith("lvl") && data.hierarchy) {
              title = Object.values(data.hierarchy).join(" > ");
              highlightTitle = Object.values(
                data._highlightResult?.hierarchy || {}
              )
                .map((v) => v?.value)
                .filter(Boolean)
                .join(" > ");
            }
          }
          return (
            '<a href="' +
            (data.permalink ?? data.url) +
            '" class="reimu-hit-item-link" title="' +
            (title || "") +
            '">' +
            highlightTitle +
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
      const popup = _$(".popup");
      popup.classList.add("show");
      _$("#mask").classList.remove("hide");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        _$("#reimu-search-input input")?.focus();
      }, 100);
      const keydownHandler = (e) => {
        const focusables = popup.querySelectorAll("input, [href]");
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];
        if (e.key === "Escape") {
          closePopup();
        } else if (e.key === "Tab" && focusables.length) {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };
      document.addEventListener("keydown", keydownHandler);
      function closePopup() {
        popup.classList.remove("show");
        _$("#mask").classList.add("hide");
        _$("#container").style.marginRight = "";
        _$("#header-nav").style.marginRight = "";
        document.body.style.overflow = "";
        document.removeEventListener("keydown", keydownHandler);
        _$("#nav-search-btn")?.focus();
      }
      popup.__closePopup = closePopup;
    });

  _$(".popup-btn-close")
    .off("click")
    .on("click", () => {
      _$(".popup").__closePopup?.();
    });
};

if (document.readyState !== "loading") {
  algoliaHandler();
} else {
  document.addEventListener("DOMContentLoaded", algoliaHandler);
}

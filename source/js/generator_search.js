(() => {
  const searchInput = _$("#reimu-search-input");
  const searchResult = _$("#reimu-hits");
  const pagination = _$("#reimu-pagination");
  const itemsPerPage = 10;
  let currentPage = 1;

  searchInput.insertAdjacentHTML(
    "beforeend",
    '<form id="search-form"><input type="text" id="search-text"></form>'
  );
  fetch("/search.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      _$("#search-form")
        .off("submit")
        .on("submit", (event) => {
          event.preventDefault();
          const inputText = _$("#search-text").value;
          searchResult.innerHTML = "";
          pagination.innerHTML = "";
          if (inputText) {
            const hits = data.filter((post) => {
              return (
                (post.title &&
                  post.title.toLowerCase().includes(inputText.toLowerCase())) ||
                (post.content &&
                  post.content.toLowerCase().includes(inputText.toLowerCase()))
              );
            });

            const totalPages = Math.ceil(hits.length / itemsPerPage);
            pagination.insertAdjacentHTML(
              "beforeend",
              '<ul class="ais-Pagination-list pagination">'
            );
            for (let i = 1; i <= totalPages; i++) {
              const pageItem = document.createElement("li");
              pageItem.className =
                "ais-Pagination-item pagination-item ais-Pagination-item--page";
              pageItem.innerHTML = `<a class="ais-Pagination-link page-number" aria-label="Page ${i}" href="#">${i}</a>`;
              if (i === currentPage) {
                pageItem.classList.add(
                  "ais-Pagination-item--selected",
                  "current"
                );
              }
              pagination.querySelector("ul").appendChild(pageItem);
            }

            _$$(".page-number").forEach((element) => {
              element.off("click").on("click", (event) => {
                event.preventDefault();
                currentPage = element.innerText;
                _$$(".ais-Pagination-item").forEach((element) => {
                  element.classList.remove(
                    "ais-Pagination-item--selected",
                    "current"
                  );
                });
                element.parentNode.classList.add(
                  "ais-Pagination-item--selected",
                  "current"
                );
                displayHits(hits, currentPage, itemsPerPage);
              });
            });

            displayHits(hits, currentPage, itemsPerPage);
          }
        });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  function displayHits(hits, page, itemsPerPage) {
    searchResult.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    hits.slice(start, end).forEach((hit) => {
      searchResult.insertAdjacentHTML(
        "beforeend",
        `<a href="${hit.url}" class="reimu-hit-item-link" title="${hit.title || ""}">${hit.title}</a>`
      );
    });
  }

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
      _$("#search-text").focus();
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
})();

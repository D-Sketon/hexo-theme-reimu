(function () {
  // A Simple EventListener
  HTMLElement.prototype.on = function (name, listener, options) {
    if (!this.__listeners__) {
      this.__listeners__ = {};
    }
    if (!this.__listeners__[name]) {
      this.__listeners__[name] = [];
    }
    // Check if the listener is already added
    for (let [l, o] of this.__listeners__[name]) {
      if (l === listener && JSON.stringify(o) === JSON.stringify(options)) {
        return this; // Listener is already added, do nothing
      }
    }
    this.__listeners__[name].push([listener, options]);
    this.addEventListener(name, listener, options);
    return this;
  };
  HTMLElement.prototype.off = function (name, listener, options) {
    if (!this.__listeners__ || !this.__listeners__[name]) {
      return this;
    }
    if (!listener) {
      // remove all event listeners
      this.__listeners__[name].forEach(([listener, options]) => {
        this.removeEventListener(name, listener, options);
      });
      delete this.__listeners__[name];
      return this;
    }
    this.removeEventListener(name, listener, options);
    this.__listeners__[name] = this.__listeners__[name].filter(
      ([l, o]) =>
        l !== listener || JSON.stringify(o) !== JSON.stringify(options)
    );
    if (this.__listeners__[name].length === 0) {
      delete this.__listeners__[name];
    }
    return this;
  };
  window.on = HTMLElement.prototype.on.bind(window);
  window.off = HTMLElement.prototype.off.bind(window);
  // Simple Selector
  window._$ = (selector) => {
    if (selector.startsWith("#")) {
      return document.getElementById(selector.slice(1));
    }
    return document.querySelector(selector);
  };
  window._$$ = (selector) => document.querySelectorAll(selector);

  // dark_mode
  let mode = window.localStorage.getItem("dark_mode");
  if (mode == null) {
    const domMode = document.documentElement.getAttribute("data-theme");
    if (domMode == null) {
      window.localStorage.setItem("dark_mode", "false");
    } else {
      window.localStorage.setItem("dark_mode", "true");
    }
  } else {
    if (mode == "true") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (mode == "false") {
      document.documentElement.removeAttribute("data-theme");
    }
  }
  mode = window.localStorage.getItem("dark_mode");
  if (mode == "true") {
    document
      .getElementById("sub-nav")
      .insertAdjacentHTML(
        "beforeend",
        '<a id="nav-sun-btn" class="nav-icon dark-mode-btn"></a>'
      );
    document.body.dispatchEvent(new CustomEvent("dark-theme-set"));
  } else if (mode == "false") {
    document
      .getElementById("sub-nav")
      .insertAdjacentHTML(
        "beforeend",
        '<a id="nav-moon-btn" class="nav-icon dark-mode-btn"></a>'
      );
    document.body.dispatchEvent(new CustomEvent("light-theme-set"));
  }
  document
    .querySelector(".dark-mode-btn")
    .addEventListener("click", function () {
      const id = this.id;
      if (id == "nav-sun-btn") {
        window.localStorage.setItem("dark_mode", "false");
        document.body.dispatchEvent(new CustomEvent("light-theme-set"));
        document.documentElement.removeAttribute("data-theme");
        this.id = "nav-moon-btn";
      } else {
        window.localStorage.setItem("dark_mode", "true");
        document.body.dispatchEvent(new CustomEvent("dark-theme-set"));
        document.documentElement.setAttribute("data-theme", "dark");
        this.id = "nav-sun-btn";
      }
    });

  let oldScrollTop = 0;
  window.addEventListener("scroll", () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    let diffY = scrollTop - oldScrollTop;
    window.diffY = diffY;
    oldScrollTop = scrollTop;
    if (diffY < 0) {
      document
        .getElementById("header-nav")
        .classList.remove("header-nav-hidden");
    } else {
      document.getElementById("header-nav").classList.add("header-nav-hidden");
    }
  });
})();

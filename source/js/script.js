window.throttle = (func, limit) => {
  let lastFunc, lastRan;

  return (...args) => {
    const context = this;
    if (!lastRan || Date.now() - lastRan >= limit) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(context, args);
        lastRan = Date.now();
      }, limit - (Date.now() - lastRan));
    }
  };
};

(function () {
  // A Simple EventListener
  [Element, Document, Window].forEach((target) => {
    target.prototype._addEventListener = target.prototype.addEventListener;
    target.prototype._removeEventListener =
      target.prototype.removeEventListener;
    target.prototype.addEventListener = target.prototype.on = function (
      name,
      listener,
      options
    ) {
      this.__listeners__ = this.__listeners__ || {};
      this.__listeners__[name] = this.__listeners__[name] || [];

      // Check if the listener is already added
      for (let [l, o] of this.__listeners__[name]) {
        if (l === listener && JSON.stringify(o) === JSON.stringify(options)) {
          return this; // Listener is already added, do nothing
        }
      }
      this.__listeners__[name].push([listener, options]);
      this._addEventListener(name, listener, options);
      return this;
    };
    target.prototype.removeEventListener = target.prototype.off = function (
      name,
      listener,
      options
    ) {
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
      this._removeEventListener(name, listener, options);
      this.__listeners__[name] = this.__listeners__[name].filter(
        ([l, o]) =>
          l !== listener || JSON.stringify(o) !== JSON.stringify(options)
      );
      if (this.__listeners__[name].length === 0) {
        delete this.__listeners__[name];
      }
      return this;
    };
  });
  // Simple Selector
  window._$ = (selector) => document.querySelector(selector);
  window._$$ = (selector) => document.querySelectorAll(selector);

  // dark_mode
  const themeButton = document.createElement("a");
  themeButton.className = "nav-icon dark-mode-btn";
  _$("#sub-nav").append(themeButton);

  const osMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  function setTheme(config) {
    const isAuto = config === "auto";
    const isDark = config === "true" || (isAuto && osMode);

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : null);
    localStorage.setItem("dark_mode", config);

    themeButton.id = `nav-${
      config === "true"
        ? "moon"
        : config === "false"
        ? "sun"
        : "circle-half-stroke"
    }-btn`;

    document.body.dispatchEvent(
      new CustomEvent(`${isDark ? "dark" : "light"}-theme-set`)
    );
  }
  const savedMode =
    localStorage.getItem("dark_mode") ||
    document.documentElement.getAttribute("data-theme-mode") ||
    "auto";
  setTheme(savedMode);

  themeButton.addEventListener(
    "click",
    throttle(() => {
      const modes = ["auto", "false", "true"];
      const nextMode =
        modes[(modes.indexOf(localStorage.getItem("dark_mode")) + 1) % 3];
      setTheme(nextMode);
    }, 1000)
  );

  let oldScrollTop = 0;
  document.addEventListener("scroll", () => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const diffY = scrollTop - oldScrollTop;
    window.diffY = diffY;
    oldScrollTop = scrollTop;
    if (diffY < 0) {
      _$("#header-nav").classList.remove("header-nav-hidden");
    } else {
      _$("#header-nav").classList.add("header-nav-hidden");
    }
  });

  if (window.Pace) {
    Pace.on("done", () => {
      Pace.sources[0].elements = [];
    });
  }

  // generateScheme
  if (window.materialTheme) {
    const extractor = new materialTheme.ColorThemeExtractor({
      needTransition: false,
    });
    function appendStylesheet() {
      const existingStyle = _$("#reimu-generated-theme-style");
      if (existingStyle) {
        return;
      }
      const css = `
    :root {
      --red-0: var(--md-sys-color-primary-light);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-light) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-light) 75%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-light) 55%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-light) 40%, white);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-light) 15%, white);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-light) 10%, white);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-light) 5%, white);
    
      --color-border: var(--red-3);
      --color-link: var(--red-1);
      --color-meta-shadow: var(--red-6);
      --color-h2-after: var(--red-1);
      --color-red-6-shadow: var(--red-2);
      --color-red-3-shadow: var(--red-3);
    }
    
    [data-theme="dark"]:root {
      --red-0: var(--red-1);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-dark) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-dark) 80%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-dark) 75%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-dark) 30%, transparent);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 20%, transparent);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 10%, transparent);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-dark) 5%, transparent);
      
      --color-border: var(--red-5);
    }
    `;

      const style = document.createElement("style");
      style.id = "reimu-generated-theme-style";
      style.textContent = css;
      document.body.appendChild(style);
    }
    async function generateScheme(imageFile) {
      const scheme = await extractor.generateThemeSchemeFromImage(imageFile);
      document.documentElement.style.setProperty(
        "--md-sys-color-primary-light",
        extractor.hexFromArgb(scheme.schemes.light.props.primary),
      );
      document.documentElement.style.setProperty(
        "--md-sys-color-primary-dark",
        extractor.hexFromArgb(scheme.schemes.dark.props.primary),
      );

      const existingStyle = _$("#reimu-generated-theme-style");
      if (existingStyle) {
        return;
      }
      appendStylesheet();
    }

    window.generateSchemeHandler = () => {
      if (window.bannerElement?.src) {
        if (window.bannerElement.complete) {
          generateScheme(bannerElement);
        } else {
          window.bannerElement.addEventListener(
            "load",
            () => {
              generateScheme(bannerElement);
            },
            { once: true },
          );
        }
      } else if (window.bannerElement?.style.background) {
        const rgba = window.bannerElement.style.background.match(/\d+/g);
        const scheme = extractor.generateThemeScheme({
          r: parseInt(rgba[0]),
          g: parseInt(rgba[1]),
          b: parseInt(rgba[2]),
        });
        document.documentElement.style.setProperty(
          "--md-sys-color-primary-light",
          extractor.hexFromArgb(scheme.schemes.light.props.primary),
        );
        document.documentElement.style.setProperty(
          "--md-sys-color-primary-dark",
          extractor.hexFromArgb(scheme.schemes.dark.props.primary),
        );
        appendStylesheet();
      }
    };
  }
})();

var safeImport = async (url, integrity) => {
  if (!integrity) {
    return import(url);
  }
  const response = await fetch(url);
  const moduleContent = await response.text();

  const actualHash = await crypto.subtle.digest(
    "SHA-384",
    new TextEncoder().encode(moduleContent)
  );
  const hashBase64 =
    "sha384-" + btoa(String.fromCharCode(...new Uint8Array(actualHash)));

  if (hashBase64 !== integrity) {
    throw new Error(`Integrity check failed for ${url}`);
  }

  const blob = new Blob([moduleContent], { type: "application/javascript" });
  const blobUrl = URL.createObjectURL(blob);
  const module = await import(blobUrl);
  URL.revokeObjectURL(blobUrl);

  return module;
};

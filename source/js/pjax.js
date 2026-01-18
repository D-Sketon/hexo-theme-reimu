function loadScripts(scripts, index) {
  if (index < scripts.length) {
    const script = scripts[index];
    const src = script.getAttribute("src");

    const loadScript = (scriptContent) => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement("script");
        if (script.type) {
          scriptElement.type = script.type;
        }
        if (script.src) {
          scriptElement.src = script.src;
          if (script.integrity) {
            scriptElement.integrity = script.integrity;
          }
          if (script.crossOrigin) {
            scriptElement.crossOrigin = script.crossOrigin;
          }
          scriptElement.onload = resolve;
          scriptElement.onerror = reject;
        }
        if (scriptContent) {
          scriptElement.text = scriptContent;
        }
        document.head.appendChild(scriptElement);
        if (!script.src) {
          resolve();
        }
      });
    };

    (src ? loadScript() : loadScript(script.text))
      .then(() => loadScripts(scripts, index + 1))
      .catch((error) => {
        console.error(
          `Failed to load script: ${src || "inline script"}`,
          error
        );
        loadScripts(scripts, index + 1);
      });
  }
}
if (window.Pjax) {
  Pjax.prototype.getElements = function () {
    const i18nLanguages = window.REIMU_CONFIG.i18n_languages;
    const baseUrl = window.REIMU_CONFIG.base;
    let basePathname = new URL(baseUrl).pathname;
    if (!basePathname.endsWith("/")) {
      basePathname += "/";
    }
    const currentUrl = window.location.href;
    const currentPathname = new URL(currentUrl).pathname.replace(
      basePathname,
      ""
    );
    const aLinks = document.querySelectorAll("a[href]");
    const pjaxLinks = [];
    for (let i = 0; i < aLinks.length; i++) {
      const aLink = aLinks[i];
      const aLinkHref = aLink.getAttribute("href");
      const isExternal =
        aLink.getAttribute("target") === "_blank" ||
        aLink.getAttribute("rel")?.includes("noopener");
      if (
        isExternal ||
        aLinkHref.startsWith("mailto:") ||
        aLinkHref.startsWith("tel:") ||
        aLinkHref.startsWith("javascript:") ||
        aLinkHref.startsWith("data:") ||
        aLinkHref.startsWith("vbscript:")
      ) {
        continue;
      }
      if (!i18nLanguages) {
        // 多语言功能未打开
        pjaxLinks.push(aLink);
        continue;
      }

      const absoluteUrl = new URL(aLinkHref, currentUrl).href;
      const absolutePathname = new URL(absoluteUrl).pathname.replace(
        basePathname,
        ""
      );

      if (!absolutePathname || !currentPathname) {
        pjaxLinks.push(aLink);
        continue;
      }

      const currentLangIndex = i18nLanguages.findIndex((lang) =>
        currentPathname.startsWith(lang)
      );
      if (currentLangIndex > -1) {
        // 当前属于多语言站点
        const absoluteLangIndex = i18nLanguages.findIndex((lang) =>
          absolutePathname.startsWith(lang)
        );
        if (absoluteLangIndex === currentLangIndex) {
          // 同一语言站点，可以使用 pjax
          pjaxLinks.push(aLink);
        }
      } else {
        // 当前属于默认语言站点
        const absoluteLangIndex = i18nLanguages.findIndex((lang) =>
          absolutePathname.startsWith(lang)
        );
        if (absoluteLangIndex === -1) {
          // 同一语言站点，可以使用 pjax
          pjaxLinks.push(aLink);
        }
      }
    }
    return pjaxLinks;
  };
}
window.Pjax &&
  new window.Pjax({
    selectors: [
      "#header>img",
      "#header>picture",
      "head title",
      "#header-title",
      "#subtitle-wrap",
      "#main",
      "#content",
      ".sidebar-widget",
      ".sidebar-wrapper",
      ".sidebar-wrapper-container",
      "#mobile-nav",
      "#lazy-script",
      "#i18n-nav",
    ],
    switches: {
      ".sidebar-wrapper-container": function (oldEl, newEl) {
        oldEl.className = newEl.className;
        this.onSwitch();
      },
      "#content": function (oldEl, newEl) {
        // for sidebar change
        oldEl.className = newEl.className;
        this.onSwitch();
      },
      "#header-title": Pjax.switches.outerHTML,
      "#subtitle-wrap": Pjax.switches.outerHTML,
      "#main": function (oldEl, newEl) {
        const scripts = [...newEl.querySelectorAll("script")];
        loadScripts(scripts, 0);
        oldEl.outerHTML = newEl.outerHTML;
        this.onSwitch();
      },
      "#mobile-nav": Pjax.switches.outerHTML,
      "#lazy-script": function (oldEl, newEl) {
        const scripts = [...newEl.querySelectorAll("script")];
        loadScripts(scripts, 0);
        oldEl.innerHTML = newEl.innerHTML;
        this.onSwitch();
      },
    },
    cacheBust: false,
  });

window.addEventListener("pjax:success", () => {
  _$$("script[data-pjax]").forEach((element) => {
    const {
      textContent,
      parentNode,
      id,
      className,
      type,
      src,
      dataset,
      onload,
      integrity,
      crossOrigin,
    } = element;
    const code = textContent || "";
    const script = document.createElement("script");

    id && (script.id = id);
    className && (script.className = className);
    type && (script.type = type);
    dataset.pjax !== undefined && (script.dataset.pjax = "");
    onload && (script.onload = onload);
    integrity && (script.integrity = integrity);
    crossOrigin && (script.crossOrigin = crossOrigin);

    if (src) {
      script.src = src;
      script.async = false; // Force synchronous loading of peripheral JS
    } else if (code) {
      script.textContent = code;
    }
    parentNode.replaceChild(script, element);
  });
});
window.addEventListener("pjax:complete", () => {
  _$("#header-nav")?.classList.remove("header-nav-hidden");
  const mode = window.localStorage.getItem("dark_mode");
  document.body.dispatchEvent(
    new CustomEvent("reimu:theme-set", {
      detail: {
        isDark:
          mode === "true" ||
          (mode === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
        mode: mode || "auto",
      },
    })
  );
  // destroy waline
  if (window.walineInstance) {
    window.walineInstance.destroy();
    window.walineInstance = null;
  }
});
window.addEventListener("pjax:send", () => {
  // destroy panZoom
  if (window.__panZoomList) {
    window.__panZoomList.forEach((panZoom) => panZoom.destroy());
    window.__panZoomList = [];
  }
});
if (window.startLoading) window.addEventListener("pjax:send", startLoading);
if (window.endLoading) window.addEventListener("pjax:complete", endLoading);
if (window.aosInit) window.addEventListener("pjax:success", aosInit);

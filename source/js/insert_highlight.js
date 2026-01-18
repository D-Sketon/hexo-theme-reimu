(() => {
  _$$("pre").forEach((element) => {
    const parent = element.parentNode;
    if (!parent.classList.contains("gutter")) {
      const div = document.createElement("div");
      div.className = "code-area";
      parent.replaceChild(div, element);
      div.appendChild(element);
    }
  });

  const codeFigcaption = `
  <div class="code-figcaption">
    <div class="code-left-wrap">
      <div class="code-decoration"></div>
      <div class="code-lang"></div>
    </div>
    <div class="code-right-wrap">
      <div class="code-copy icon-copy"></div>
      <div class="icon-chevron-down code-expand"></div>
    </div>
  </div>`;
  const reimuConfig = window.REIMU_CONFIG?.code_block || {};
  const expandThreshold = reimuConfig.expand;

  _$$("figure.highlight").forEach((element) => {
    if (!element.querySelector(".code-figcaption")) {
      element.insertAdjacentHTML("afterbegin", codeFigcaption);
    }
    if (expandThreshold !== undefined) {
      if (
        expandThreshold === false ||
        (typeof expandThreshold === "number" &&
          element.querySelectorAll("td.code .line").length > expandThreshold)
      ) {
        element.classList.add("code-closed");
        // force rerender element to refresh AOS
        element.style.display = "none";
        void element.offsetWidth;
        element.style.display = "";
      }
    }
    // 代码语言
    const codeLanguage = element.className.split(" ")[1];
    if (codeLanguage) {
      const langName = codeLanguage
        .replace("line-numbers", "")
        .replace("language-", "")
        .trim()
        .toUpperCase();

      const langElement = element.querySelector(".code-lang");
      if (langElement) langElement.innerText = langName;
    }
  });

  // 代码收缩
  _$$(".code-expand").forEach((element) => {
    element.off("click").on("click", () => {
      element.closest("figure")?.classList.toggle("code-closed");
    });
  });

  if (!window.ClipboardJS) {
    return;
  }

  const tips = window.REIMU_CONFIG?.clipboard_tips || {};

  // 获取本地化文本
  const getLocalizedText = (config, defaultText) => {
    if (typeof config === "string") return config;
    if (typeof config === "object") {
      const lang = document.documentElement.lang.toLowerCase();
      const key = Object.keys(config).find((k) => k.toLowerCase() === lang);
      if (key && config[key]) return config[key];
    }
    return defaultText;
  };

  // 代码复制
  const clipboard = new ClipboardJS(".code-copy", {
    text: (trigger) => {
      const codeElement =
        trigger.parentNode.parentNode.parentNode.querySelector("td.code");
      let selectedText = codeElement?.innerText || "";

      if (
        tips.copyright?.enable &&
        selectedText.length >= tips.copyright?.count
      ) {
        selectedText += "\n\n" + (tips.copyright?.content ?? "");
      }
      return selectedText;
    },
  });
  clipboard.on("success", (e) => {
    e.trigger.classList.add("icon-check");
    e.trigger.classList.remove("icon-copy");
    const successText = getLocalizedText(
      tips.success,
      "Copy successfully (*^▽^*)",
    );
    _$("#copy-tooltip").innerText = successText;
    _$("#copy-tooltip").style.opacity = 1;
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = 0;
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-check");
    }, 1000);
    e.clearSelection();
  });

  clipboard.on("error", (e) => {
    e.trigger.classList.add("icon-times");
    e.trigger.classList.remove("icon-copy");
    const failText = getLocalizedText(tips.fail, "Copy failed (ﾟ⊿ﾟ)ﾂ");
    _$("#copy-tooltip").innerText = failText;
    _$("#copy-tooltip").style.opacity = 1;
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = 0;
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-times");
    }, 1000);
  });

  // Clean up on PJAX
  if (window.Pjax) {
    window.addEventListener(
      "pjax:send",
      () => {
        clipboard.destroy();
      },
      { once: true },
    );
  }

  // Since we add code-closed class to the figure element, we need to refresh AOS
  window.AOS?.refresh();
})();

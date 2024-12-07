(() => {
  _$$("pre").forEach((element) => {
    const parent = element.parentNode;
    if (!parent.classList.contains("gutter")) {
      const div = document.createElement("div");
      div.className = "code-area";
      parent.insertBefore(div, element);
      parent.removeChild(element);
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
      }
    }
  });
  // 代码收缩
  _$$(".code-expand").forEach((element) => {
    element.off("click").on("click", () => {
      const figure = element.closest("figure");
      figure.classList.toggle("code-closed");
    });
  });

  // 代码语言
  _$$("figure.highlight").forEach((element) => {
    let codeLanguage = element.className.split(" ")[1];
    if (!codeLanguage) {
      return;
    }
    let langName = codeLanguage
      .replace("line-numbers", "")
      .trim()
      .replace("language-", "")
      .trim();

    // 大写
    langName = langName.toUpperCase();
    const children = element.querySelector(".code-lang");
    if (children) {
      children.innerText = langName;
    }
  });

  if (!window.ClipboardJS) {
    return;
  }

  const tips = window.REIMU_CONFIG?.clipboard_tips || {};

  // 代码复制
  const clipboard = new ClipboardJS(".code-copy", {
    text: (trigger) => {
      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(
        trigger.parentNode.parentNode.nextElementSibling.querySelector(
          "td.code"
        )
      );
      selection.removeAllRanges();
      selection.addRange(range);

      let selectedText = selection.toString();
      if (
        tips.copyright?.enable &&
        selectedText.length >= tips.copyright?.count
      ) {
        selectedText = selectedText + "\n\n" + tips.copyright?.content ?? "";
      }
      return selectedText;
    },
  });
  clipboard.on("success", (e) => {
    e.trigger.classList.add("icon-check");
    e.trigger.classList.remove("icon-copy");
    _$("#copy-tooltip").innerText = tips.success;
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
    _$("#copy-tooltip").innerText = tips.fail;
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
      { once: true }
    );
  }
})();

(() => {
  _$$("pre").forEach((element) => {
    const parent = element.parentNode;
    if (!parent.classList.contains("gutter")) {
      const div = document.createElement("div");
      div.classList.add("code-area");
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
  _$$("figure.highlight").forEach((element) => {
    if (!element.querySelector(".code-figcaption")) {
      element.insertAdjacentHTML("afterbegin", codeFigcaption);
    }
  });

  // 代码复制
  const clipboard = new ClipboardJS(".code-copy", {
    text: (trigger) => {
      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(trigger.parentNode.parentNode.nextElementSibling.querySelector("td.code"));
      selection.removeAllRanges();
      selection.addRange(range);

      let selectedText = selection.toString();
      if (window.clipboard_tips.copyright?.enable) {
        if (selectedText.length >= window.clipboard_tips.copyright?.count) {
          selectedText = selectedText + "\n\n" + window.clipboard_tips.copyright?.content ?? '';
        }
      }
      return selectedText;
    },
  });
  clipboard.on("success", function (e) {
    e.trigger.classList.add("icon-check");
    e.trigger.classList.remove("icon-copy");
    _$("#copy-tooltip").innerText = window.clipboard_tips.success;
    _$("#copy-tooltip").style.opacity = 1;
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = 0;
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-check");
    }, 1000);
    e.clearSelection();
  });

  clipboard.on("error", function (e) {
    e.trigger.classList.add("icon-times");
    e.trigger.classList.remove("icon-copy");
    _$("#copy-tooltip").innerText = window.clipboard_tips.fail;
    _$("#copy-tooltip").style.opacity = 1;
    setTimeout(() => {
      _$("#copy-tooltip").style.opacity = 0;
      e.trigger.classList.add("icon-copy");
      e.trigger.classList.remove("icon-times");
    }, 1000);
  });

  // clear clipboard when pjax:send
  if (window.Pjax) {
    window.addEventListener("pjax:send", () => {
      clipboard.destroy();
    }, { once: true });
  }

  // 代码收缩
  _$$(".code-expand").forEach((element) => {
    element.off("click").on("click", function () {
      const figure = element.closest("figure");
      if (figure.classList.contains("code-closed")) {
        figure.classList.remove("code-closed");
      } else {
        figure.classList.add("code-closed");
      }
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
})();
